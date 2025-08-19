-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create referral_codes table
CREATE TABLE IF NOT EXISTS public.referral_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    owner_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    max_uses INTEGER DEFAULT NULL, -- NULL means unlimited
    current_uses INTEGER DEFAULT 0,
    reward_type VARCHAR(20) DEFAULT 'percentage' CHECK (reward_type IN ('percentage', 'fixed', 'points')),
    reward_value DECIMAL(10, 2) DEFAULT 10.00, -- 10% or $10 or 10 points
    referrer_reward_value DECIMAL(10, 2) DEFAULT 10.00, -- Reward for the referrer
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE DEFAULT NULL, -- NULL means no expiry
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table to track who referred whom
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    referral_code_id UUID NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
    referrer_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'expired')),
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_booking_date TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(referred_id) -- Each user can only be referred once
);

-- Create referral_rewards table
CREATE TABLE IF NOT EXISTS public.referral_rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    referral_id UUID NOT NULL REFERENCES public.referrals(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
    recipient_type VARCHAR(20) DEFAULT 'referrer' CHECK (recipient_type IN ('referrer', 'referred')),
    reward_type VARCHAR(20) NOT NULL CHECK (reward_type IN ('cash', 'credit', 'points', 'discount')),
    reward_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled', 'expired')),
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral_stats table for analytics
CREATE TABLE IF NOT EXISTS public.referral_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
    total_referrals INTEGER DEFAULT 0,
    successful_referrals INTEGER DEFAULT 0,
    pending_referrals INTEGER DEFAULT 0,
    total_rewards_earned DECIMAL(10, 2) DEFAULT 0.00,
    total_rewards_pending DECIMAL(10, 2) DEFAULT 0.00,
    total_rewards_paid DECIMAL(10, 2) DEFAULT 0.00,
    lifetime_value_generated DECIMAL(10, 2) DEFAULT 0.00,
    last_referral_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create referral_tiers table for tiered rewards
CREATE TABLE IF NOT EXISTS public.referral_tiers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    min_referrals INTEGER NOT NULL,
    max_referrals INTEGER, -- NULL means no upper limit
    reward_multiplier DECIMAL(5, 2) DEFAULT 1.00,
    bonus_reward DECIMAL(10, 2) DEFAULT 0.00,
    perks JSONB DEFAULT '[]'::jsonb,
    badge_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add referral_code column to travelers table if not exists
ALTER TABLE public.travelers 
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.referrals(id),
ADD COLUMN IF NOT EXISTS referral_source VARCHAR(50);

-- Create indexes for better query performance
CREATE INDEX idx_referral_codes_owner ON public.referral_codes(owner_id);
CREATE INDEX idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX idx_referral_codes_status ON public.referral_codes(status);
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_referred ON public.referrals(referred_id);
CREATE INDEX idx_referrals_status ON public.referrals(status);
CREATE INDEX idx_rewards_recipient ON public.referral_rewards(recipient_id);
CREATE INDEX idx_rewards_status ON public.referral_rewards(status);
CREATE INDEX idx_stats_user ON public.referral_stats(user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all referral tables
CREATE TRIGGER update_referral_codes_updated_at BEFORE UPDATE ON public.referral_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON public.referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referral_rewards_updated_at BEFORE UPDATE ON public.referral_rewards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referral_stats_updated_at BEFORE UPDATE ON public.referral_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default referral tiers
INSERT INTO public.referral_tiers (name, min_referrals, max_referrals, reward_multiplier, bonus_reward, perks, badge_url)
VALUES 
    ('Bronze', 0, 4, 1.00, 0.00, '["Standard rewards"]'::jsonb, '/badges/bronze.svg'),
    ('Silver', 5, 9, 1.25, 25.00, '["25% bonus rewards", "Priority support"]'::jsonb, '/badges/silver.svg'),
    ('Gold', 10, 19, 1.50, 50.00, '["50% bonus rewards", "VIP support", "Early access"]'::jsonb, '/badges/gold.svg'),
    ('Platinum', 20, NULL, 2.00, 100.00, '["Double rewards", "VIP support", "Exclusive perks", "Personal account manager"]'::jsonb, '/badges/platinum.svg');

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code(user_id UUID)
RETURNS VARCHAR AS $$
DECLARE
    new_code VARCHAR(20);
    code_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate a random code (e.g., NT-XXXXX)
        new_code := 'NT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || user_id::TEXT || NOW()::TEXT), 1, 8));
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = new_code) INTO code_exists;
        
        -- Exit loop if code is unique
        EXIT WHEN NOT code_exists;
    END LOOP;
    
    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Create function to check referral code validity
CREATE OR REPLACE FUNCTION check_referral_code_validity(p_code VARCHAR)
RETURNS TABLE(
    is_valid BOOLEAN,
    code_id UUID,
    owner_id UUID,
    message TEXT
) AS $$
DECLARE
    v_code_record RECORD;
BEGIN
    -- Find the referral code
    SELECT * INTO v_code_record
    FROM public.referral_codes
    WHERE code = p_code;
    
    -- Check if code exists
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, 'Invalid referral code';
        RETURN;
    END IF;
    
    -- Check if code is active
    IF v_code_record.status != 'active' THEN
        RETURN QUERY SELECT FALSE, v_code_record.id, v_code_record.owner_id, 'Referral code is ' || v_code_record.status;
        RETURN;
    END IF;
    
    -- Check if code has expired
    IF v_code_record.valid_until IS NOT NULL AND v_code_record.valid_until < NOW() THEN
        RETURN QUERY SELECT FALSE, v_code_record.id, v_code_record.owner_id, 'Referral code has expired';
        RETURN;
    END IF;
    
    -- Check if code has reached max uses
    IF v_code_record.max_uses IS NOT NULL AND v_code_record.current_uses >= v_code_record.max_uses THEN
        RETURN QUERY SELECT FALSE, v_code_record.id, v_code_record.owner_id, 'Referral code has reached maximum uses';
        RETURN;
    END IF;
    
    -- Code is valid
    RETURN QUERY SELECT TRUE, v_code_record.id, v_code_record.owner_id, 'Valid referral code';
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_tiers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for referral_codes
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own referral codes" ON public.referral_codes
    FOR UPDATE USING (auth.uid() = owner_id);

-- Create RLS policies for referrals
CREATE POLICY "Users can view referrals they made or received" ON public.referrals
    FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- Create RLS policies for referral_rewards
CREATE POLICY "Users can view their own rewards" ON public.referral_rewards
    FOR SELECT USING (auth.uid() = recipient_id);

-- Create RLS policies for referral_stats
CREATE POLICY "Users can view their own stats" ON public.referral_stats
    FOR SELECT USING (auth.uid() = user_id);

-- Create RLS policies for referral_tiers (public read)
CREATE POLICY "Anyone can view referral tiers" ON public.referral_tiers
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT ALL ON public.referral_codes TO authenticated;
GRANT ALL ON public.referrals TO authenticated;
GRANT ALL ON public.referral_rewards TO authenticated;
GRANT ALL ON public.referral_stats TO authenticated;
GRANT SELECT ON public.referral_tiers TO authenticated;
GRANT ALL ON public.referral_tiers TO service_role;