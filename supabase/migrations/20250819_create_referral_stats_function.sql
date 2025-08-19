-- Create function to update referral stats incrementally
CREATE OR REPLACE FUNCTION update_referral_stats(
    p_user_id UUID,
    p_total_referrals INTEGER DEFAULT 0,
    p_successful_referrals INTEGER DEFAULT 0,
    p_pending_referrals INTEGER DEFAULT 0,
    p_total_rewards_earned DECIMAL(10,2) DEFAULT 0,
    p_total_rewards_pending DECIMAL(10,2) DEFAULT 0,
    p_total_rewards_paid DECIMAL(10,2) DEFAULT 0,
    p_lifetime_value_generated DECIMAL(10,2) DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
    -- Update or insert stats
    INSERT INTO public.referral_stats (
        user_id,
        total_referrals,
        successful_referrals,
        pending_referrals,
        total_rewards_earned,
        total_rewards_pending,
        total_rewards_paid,
        lifetime_value_generated,
        last_referral_date
    )
    VALUES (
        p_user_id,
        GREATEST(0, p_total_referrals),
        GREATEST(0, p_successful_referrals),
        GREATEST(0, p_pending_referrals),
        GREATEST(0, p_total_rewards_earned),
        GREATEST(0, p_total_rewards_pending),
        GREATEST(0, p_total_rewards_paid),
        GREATEST(0, p_lifetime_value_generated),
        CASE WHEN p_total_referrals > 0 THEN NOW() ELSE NULL END
    )
    ON CONFLICT (user_id) DO UPDATE SET
        total_referrals = GREATEST(0, referral_stats.total_referrals + p_total_referrals),
        successful_referrals = GREATEST(0, referral_stats.successful_referrals + p_successful_referrals),
        pending_referrals = GREATEST(0, referral_stats.pending_referrals + p_pending_referrals),
        total_rewards_earned = GREATEST(0, referral_stats.total_rewards_earned + p_total_rewards_earned),
        total_rewards_pending = GREATEST(0, referral_stats.total_rewards_pending + p_total_rewards_pending),
        total_rewards_paid = GREATEST(0, referral_stats.total_rewards_paid + p_total_rewards_paid),
        lifetime_value_generated = GREATEST(0, referral_stats.lifetime_value_generated + p_lifetime_value_generated),
        last_referral_date = CASE 
            WHEN p_total_referrals > 0 THEN NOW() 
            ELSE referral_stats.last_referral_date 
        END,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Create function to get referral link for sharing
CREATE OR REPLACE FUNCTION get_referral_link(p_code VARCHAR(20))
RETURNS TEXT AS $$
BEGIN
    -- This would be configured based on your actual domain
    RETURN 'https://niyalitravel.com/register?ref=' || p_code;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if user can create more referral codes
CREATE OR REPLACE FUNCTION can_create_referral_code(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    active_codes_count INTEGER;
    max_codes_per_user INTEGER := 5; -- Configurable limit
BEGIN
    SELECT COUNT(*)
    INTO active_codes_count
    FROM public.referral_codes
    WHERE owner_id = p_user_id
    AND status = 'active';
    
    RETURN active_codes_count < max_codes_per_user;
END;
$$ LANGUAGE plpgsql;

-- Create function to expire old referral codes
CREATE OR REPLACE FUNCTION expire_old_referral_codes()
RETURNS VOID AS $$
BEGIN
    UPDATE public.referral_codes
    SET status = 'expired'
    WHERE status = 'active'
    AND valid_until IS NOT NULL
    AND valid_until < NOW();
    
    -- Also expire related pending referrals
    UPDATE public.referrals
    SET status = 'expired'
    WHERE status = 'pending'
    AND referral_code_id IN (
        SELECT id FROM public.referral_codes
        WHERE status = 'expired'
    );
    
    -- Expire pending rewards that have passed their expiry date
    UPDATE public.referral_rewards
    SET status = 'expired'
    WHERE status IN ('pending', 'approved')
    AND expires_at IS NOT NULL
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to expire old codes (requires pg_cron extension)
-- This would be run daily
-- SELECT cron.schedule('expire-referral-codes', '0 0 * * *', 'SELECT expire_old_referral_codes();');

-- Create view for referral leaderboard
CREATE OR REPLACE VIEW referral_leaderboard AS
SELECT 
    t.id,
    t.first_name,
    t.last_name,
    t.profile_picture_url,
    rs.successful_referrals,
    rs.total_rewards_earned,
    rs.lifetime_value_generated,
    rt.name as tier_name,
    rt.badge_url,
    RANK() OVER (ORDER BY rs.successful_referrals DESC, rs.lifetime_value_generated DESC) as rank
FROM public.referral_stats rs
JOIN public.travelers t ON t.id = rs.user_id
LEFT JOIN LATERAL (
    SELECT * FROM public.referral_tiers
    WHERE min_referrals <= rs.successful_referrals
    AND (max_referrals IS NULL OR max_referrals >= rs.successful_referrals)
    ORDER BY min_referrals DESC
    LIMIT 1
) rt ON true
WHERE rs.successful_referrals > 0
ORDER BY rank
LIMIT 100;

-- Grant permissions for the leaderboard view
GRANT SELECT ON referral_leaderboard TO authenticated;