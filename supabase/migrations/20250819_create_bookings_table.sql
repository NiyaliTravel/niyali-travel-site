-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_id uuid REFERENCES travelers(id),
  agent_id uuid REFERENCES agents(id),
  package_id uuid REFERENCES packages(id),
  resort_id uuid, -- For resort bookings
  experience_id uuid, -- For experience bookings
  ferry_id uuid, -- For ferry bookings
  booking_type text NOT NULL, -- 'package', 'resort', 'experience', 'ferry'
  status text DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  checkin_date date,
  checkout_date date,
  adult_count integer DEFAULT 1,
  child_count integer DEFAULT 0,
  infant_count integer DEFAULT 0,
  total_price numeric,
  special_requests text,
  payment_status text DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  payment_method text, -- 'card', 'bank', 'crypto'
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_traveler ON bookings(traveler_id);
CREATE INDEX IF NOT EXISTS idx_bookings_agent ON bookings(agent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(checkin_date, checkout_date);