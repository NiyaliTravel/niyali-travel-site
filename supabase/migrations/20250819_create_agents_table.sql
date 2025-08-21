-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  company_name text,
  country text,
  contact_number text,
  whatsapp_number text,
  profile_photo text,
  bio text,
  languages_spoken text[],
  preferred_atolls text[],
  tier_badge text DEFAULT 'New Explorer',
  commission_rate numeric DEFAULT 0.20,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_company ON agents(company_name);
CREATE INDEX IF NOT EXISTS idx_agents_tier ON agents(tier_badge);