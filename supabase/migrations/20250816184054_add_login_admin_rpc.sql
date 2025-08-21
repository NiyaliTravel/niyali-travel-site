-- Add login_admin RPC (fixed)
CREATE OR REPLACE FUNCTION login_admin(email TEXT, password TEXT)
RETURNS TABLE (
  admin_id UUID,
  admin_email TEXT,
  admin_name TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, name
  FROM admins
  WHERE admins.email = login_admin.email
    AND admins.password = login_admin.password;
END;
$$;