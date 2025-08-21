create or replace function login(p_email text, p_password text)
returns table (id uuid, email text, role text)
language plpgsql
as $$
begin
    return query
    select u.id, u.email, u.role
    from auth.users u
    where u.email = p_email
    and u.encrypted_password = crypt(p_password, u.encrypted_password);
end;
$$;