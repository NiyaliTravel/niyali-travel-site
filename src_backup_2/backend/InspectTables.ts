import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

(async () => {
  const { data: users, error: userErr } = await supabase.from('users').select('*').limit(1);
  const { data: packages, error: pkgErr } = await supabase.from('packages').select('*').limit(1);

  console.log('👤 Users:', users ?? userErr?.message);
  console.log('📦 Packages:', packages ?? pkgErr?.message);
})();