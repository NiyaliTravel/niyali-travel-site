-- login_admin.sql
CREATE OR REPLACE FUNCTION login_admin(email TEXT, password TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  name TEXT
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

