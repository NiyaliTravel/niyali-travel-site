import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

(async () => {
  const { error } = await supabase
    .from('users')
    .insert([{ email: 'test@niyali.mv' }]); // ✅ Use only known column like 'email'

  if (error) {
    console.error('❌ Insert user failed:', error.message);
  } else {
    console.log('✅ Test user inserted');
  }
})();