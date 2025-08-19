// Referral System Types

export interface ReferralCode {
  id: string;
  code: string;
  owner_id: string;
  status: 'active' | 'inactive' | 'expired';
  max_uses: number | null;
  current_uses: number;
  reward_type: 'percentage' | 'fixed' | 'points';
  reward_value: number;
  referrer_reward_value: number;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referral_code_id: string;
  referrer_id: string;
  referred_id: string;
  status: 'pending' | 'completed' | 'cancelled' | 'expired';
  registration_date: string;
  first_booking_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralReward {
  id: string;
  referral_id: string;
  recipient_id: string;
  recipient_type: 'referrer' | 'referred';
  reward_type: 'cash' | 'credit' | 'points' | 'discount';
  reward_amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled' | 'expired';
  payment_method?: string;
  payment_reference?: string;
  expires_at: string | null;
  redeemed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralStats {
  id: string;
  user_id: string;
  total_referrals: number;
  successful_referrals: number;
  pending_referrals: number;
  total_rewards_earned: number;
  total_rewards_pending: number;
  total_rewards_paid: number;
  lifetime_value_generated: number;
  last_referral_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralTier {
  id: string;
  name: string;
  min_referrals: number;
  max_referrals: number | null;
  reward_multiplier: number;
  bonus_reward: number;
  perks: string[];
  badge_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ReferralValidationResult {
  is_valid: boolean;
  code_id?: string;
  owner_id?: string;
  message: string;
}

export interface CreateReferralCodeParams {
  owner_id: string;
  reward_type?: 'percentage' | 'fixed' | 'points';
  reward_value?: number;
  referrer_reward_value?: number;
  max_uses?: number;
  valid_until?: string;
}

export interface ApplyReferralCodeParams {
  code: string;
  referred_user_id: string;
}

export interface ReferralDashboardData {
  user_stats: ReferralStats;
  active_codes: ReferralCode[];
  recent_referrals: Referral[];
  pending_rewards: ReferralReward[];
  current_tier: ReferralTier;
  next_tier?: ReferralTier;
}

export interface ReferralRewardCalculation {
  referrer_reward: number;
  referred_reward: number;
  tier_bonus: number;
  total_reward: number;
  reward_type: string;
}