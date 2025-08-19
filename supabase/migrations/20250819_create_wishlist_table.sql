-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_id uuid REFERENCES travelers(id),
  item_type text NOT NULL, -- 'resort', 'experience', 'ferry'
  item_id uuid NOT NULL, -- ID of the resort, experience, or ferry
  added_at timestamp with time zone DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wishlist_traveler ON wishlist(traveler_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_item ON wishlist(item_type, item_id);