import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

(async () => {
  const { error: userError } = await supabase
    .from('users')
    .insert([{ name: 'Test User' }]);

  const { error: packageError } = await supabase
    .from('packages')
    .insert([{ name: 'Test Package', price: 1200 }]);

  if (userError || packageError) {
    console.error('❌ Insert failed:', userError?.message || packageError?.message);
  } else {
    console.log('✅ Test data inserted');
  }
})();