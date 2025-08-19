import { supabase } from '@/lib/supabase';
import {
  ReferralCode,
  Referral,
  ReferralReward,
  ReferralStats,
  ReferralTier,
  ReferralValidationResult,
  CreateReferralCodeParams,
  ApplyReferralCodeParams,
  ReferralDashboardData,
  ReferralRewardCalculation
} from '@/types/referral';

class ReferralService {
  /**
   * Generate a new referral code for a user
   */
  async generateReferralCode(params: CreateReferralCodeParams): Promise<ReferralCode | null> {
    try {
      // Call the database function to generate a unique code
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_referral_code', { user_id: params.owner_id });

      if (codeError) throw codeError;

      // Create the referral code record
      const { data, error } = await supabase
        .from('referral_codes')
        .insert({
          code: codeData,
          owner_id: params.owner_id,
          reward_type: params.reward_type || 'percentage',
          reward_value: params.reward_value || 10,
          referrer_reward_value: params.referrer_reward_value || 10,
          max_uses: params.max_uses || null,
          valid_until: params.valid_until || null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error generating referral code:', error);
      return null;
    }
  }

  /**
   * Validate a referral code
   */
  async validateReferralCode(code: string): Promise<ReferralValidationResult> {
    try {
      const { data, error } = await supabase
        .rpc('check_referral_code_validity', { p_code: code });

      if (error) throw error;

      return data[0] || {
        is_valid: false,
        message: 'Invalid referral code'
      };
    } catch (error) {
      console.error('Error validating referral code:', error);
      return {
        is_valid: false,
        message: 'Error validating referral code'
      };
    }
  }

  /**
   * Apply a referral code when a new user registers
   */
  async applyReferralCode(params: ApplyReferralCodeParams): Promise<boolean> {
    try {
      // Validate the code first
      const validation = await this.validateReferralCode(params.code);
      
      if (!validation.is_valid) {
        console.error('Invalid referral code:', validation.message);
        return false;
      }

      // Create the referral record
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .insert({
          referral_code_id: validation.code_id,
          referrer_id: validation.owner_id,
          referred_id: params.referred_user_id,
          status: 'pending'
        })
        .select()
        .single();

      if (referralError) throw referralError;

      // Update the referral code usage count
      const { data: codeData, error: fetchError } = await supabase
        .from('referral_codes')
        .select('current_uses')
        .eq('id', validation.code_id)
        .single();
      
      if (fetchError) throw fetchError;
      
      const { error: updateError } = await supabase
        .from('referral_codes')
        .update({ current_uses: (codeData?.current_uses || 0) + 1 })
        .eq('id', validation.code_id);

      if (updateError) throw updateError;

      // Initialize referral stats for the new user
      await this.initializeUserStats(params.referred_user_id);

      // Update referrer's stats
      await this.updateUserStats(validation.owner_id!, {
        total_referrals: 1,
        pending_referrals: 1
      });

      return true;
    } catch (error) {
      console.error('Error applying referral code:', error);
      return false;
    }
  }

  /**
   * Process a referral completion (e.g., after first booking)
   */
  async completeReferral(referralId: string, bookingAmount: number): Promise<boolean> {
    try {
      // Get the referral details
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select(`
          *,
          referral_codes (
            reward_type,
            reward_value,
            referrer_reward_value
          )
        `)
        .eq('id', referralId)
        .single();

      if (referralError || !referral) throw referralError;

      // Calculate rewards
      const rewards = this.calculateRewards(
        bookingAmount,
        referral.referral_codes.reward_type,
        referral.referral_codes.reward_value,
        referral.referral_codes.referrer_reward_value
      );

      // Create reward records
      const rewardRecords = [
        {
          referral_id: referralId,
          recipient_id: referral.referrer_id,
          recipient_type: 'referrer' as const,
          reward_type: 'credit' as const,
          reward_amount: rewards.referrer_reward,
          status: 'approved' as const
        },
        {
          referral_id: referralId,
          recipient_id: referral.referred_id,
          recipient_type: 'referred' as const,
          reward_type: 'discount' as const,
          reward_amount: rewards.referred_reward,
          status: 'approved' as const
        }
      ];

      const { error: rewardError } = await supabase
        .from('referral_rewards')
        .insert(rewardRecords);

      if (rewardError) throw rewardError;

      // Update referral status
      const { error: updateError } = await supabase
        .from('referrals')
        .update({
          status: 'completed',
          first_booking_date: new Date().toISOString()
        })
        .eq('id', referralId);

      if (updateError) throw updateError;

      // Update stats for both users
      await this.updateUserStats(referral.referrer_id, {
        successful_referrals: 1,
        pending_referrals: -1,
        total_rewards_earned: rewards.referrer_reward,
        total_rewards_pending: rewards.referrer_reward,
        lifetime_value_generated: bookingAmount
      });

      return true;
    } catch (error) {
      console.error('Error completing referral:', error);
      return false;
    }
  }

  /**
   * Calculate rewards based on booking amount and reward type
   */
  private calculateRewards(
    bookingAmount: number,
    rewardType: string,
    rewardValue: number,
    referrerRewardValue: number
  ): ReferralRewardCalculation {
    let referrerReward = 0;
    let referredReward = 0;

    switch (rewardType) {
      case 'percentage':
        referrerReward = (bookingAmount * referrerRewardValue) / 100;
        referredReward = (bookingAmount * rewardValue) / 100;
        break;
      case 'fixed':
        referrerReward = referrerRewardValue;
        referredReward = rewardValue;
        break;
      case 'points':
        referrerReward = referrerRewardValue;
        referredReward = rewardValue;
        break;
    }

    // Apply tier bonuses (simplified for now)
    const tierBonus = 0;

    return {
      referrer_reward: referrerReward,
      referred_reward: referredReward,
      tier_bonus: tierBonus,
      total_reward: referrerReward + referredReward + tierBonus,
      reward_type: rewardType
    };
  }

  /**
   * Get user's referral dashboard data
   */
  async getUserDashboard(userId: string): Promise<ReferralDashboardData | null> {
    try {
      // Get user stats
      const { data: stats, error: statsError } = await supabase
        .from('referral_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (statsError && statsError.code !== 'PGRST116') throw statsError;

      // Initialize stats if they don't exist
      const userStats = stats || await this.initializeUserStats(userId);

      // Get active referral codes
      const { data: codes, error: codesError } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('owner_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (codesError) throw codesError;

      // Get recent referrals
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (referralsError) throw referralsError;

      // Get pending rewards
      const { data: rewards, error: rewardsError } = await supabase
        .from('referral_rewards')
        .select('*')
        .eq('recipient_id', userId)
        .in('status', ['pending', 'approved'])
        .order('created_at', { ascending: false });

      if (rewardsError) throw rewardsError;

      // Get current tier
      const currentTier = await this.getUserTier(userStats.successful_referrals);
      const nextTier = await this.getNextTier(userStats.successful_referrals);

      return {
        user_stats: userStats,
        active_codes: codes || [],
        recent_referrals: referrals || [],
        pending_rewards: rewards || [],
        current_tier: currentTier!,
        next_tier: nextTier
      };
    } catch (error) {
      console.error('Error getting user dashboard:', error);
      return null;
    }
  }

  /**
   * Initialize referral stats for a new user
   */
  private async initializeUserStats(userId: string): Promise<ReferralStats> {
    const { data, error } = await supabase
      .from('referral_stats')
      .insert({
        user_id: userId,
        total_referrals: 0,
        successful_referrals: 0,
        pending_referrals: 0,
        total_rewards_earned: 0,
        total_rewards_pending: 0,
        total_rewards_paid: 0,
        lifetime_value_generated: 0
      })
      .select()
      .single();

    if (error) {
      // If stats already exist, fetch them
      const { data: existingStats } = await supabase
        .from('referral_stats')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      return existingStats;
    }

    return data;
  }

  /**
   * Update user's referral stats
   */
  private async updateUserStats(
    userId: string,
    updates: Partial<ReferralStats>
  ): Promise<void> {
    try {
      const { error } = await supabase.rpc('update_referral_stats', {
        p_user_id: userId,
        p_total_referrals: updates.total_referrals || 0,
        p_successful_referrals: updates.successful_referrals || 0,
        p_pending_referrals: updates.pending_referrals || 0,
        p_total_rewards_earned: updates.total_rewards_earned || 0,
        p_total_rewards_pending: updates.total_rewards_pending || 0,
        p_total_rewards_paid: updates.total_rewards_paid || 0,
        p_lifetime_value_generated: updates.lifetime_value_generated || 0
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  }

  /**
   * Get user's current tier based on successful referrals
   */
  private async getUserTier(successfulReferrals: number): Promise<ReferralTier | null> {
    try {
      const { data, error } = await supabase
        .from('referral_tiers')
        .select('*')
        .lte('min_referrals', successfulReferrals)
        .order('min_referrals', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user tier:', error);
      return null;
    }
  }

  /**
   * Get the next tier for a user
   */
  private async getNextTier(successfulReferrals: number): Promise<ReferralTier | null> {
    try {
      const { data, error } = await supabase
        .from('referral_tiers')
        .select('*')
        .gt('min_referrals', successfulReferrals)
        .order('min_referrals', { ascending: true })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error getting next tier:', error);
      return null;
    }
  }

  /**
   * Get all referral codes for a user
   */
  async getUserReferralCodes(userId: string): Promise<ReferralCode[]> {
    try {
      const { data, error } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user referral codes:', error);
      return [];
    }
  }

  /**
   * Deactivate a referral code
   */
  async deactivateReferralCode(codeId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('referral_codes')
        .update({ status: 'inactive' })
        .eq('id', codeId)
        .eq('owner_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deactivating referral code:', error);
      return false;
    }
  }

  /**
   * Redeem a reward
   */
  async redeemReward(rewardId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('referral_rewards')
        .update({
          status: 'paid',
          redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardId)
        .eq('recipient_id', userId)
        .eq('status', 'approved');

      if (error) throw error;

      // Update user stats
      const { data: reward } = await supabase
        .from('referral_rewards')
        .select('reward_amount')
        .eq('id', rewardId)
        .single();

      if (reward) {
        await this.updateUserStats(userId, {
          total_rewards_pending: -reward.reward_amount,
          total_rewards_paid: reward.reward_amount
        });
      }

      return true;
    } catch (error) {
      console.error('Error redeeming reward:', error);
      return false;
    }
  }
}

export const referralService = new ReferralService();