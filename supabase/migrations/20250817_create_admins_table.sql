create table admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text default 'editor',
  created_at timestamp with time zone default now()
);