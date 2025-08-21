import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

(async () => {
  const { error } = await supabase
    .from('packages')
    .insert([{
      title: 'Test Package A',
      arrival_date: '2025-08-20',
      departure_date: '2025-08-25',
      num_days: 5,
      num_pax: 3,
      adult_count: 2,
      child_count: 1,
      infant_count: 0,
      price_total: 1800
    }]);

  if (error) {
    console.error('❌ Insert failed:', error.message);
  } else {
    console.log('✅ Full test package inserted');
  }
})();