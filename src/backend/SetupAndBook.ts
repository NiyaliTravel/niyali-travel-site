import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

const bookingDate = new Date().toISOString().split('T')[0];
const totalPrice = 1200;

async function setupAndBook() {
  // ✅ Fetch existing user by email
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', 'test@niyali.mv')
    .limit(1);

  if (userError || !userData?.[0]?.id) {
    console.error('❌ Failed to fetch user:', userError?.message);
    return;
  }

  const userId = userData[0].id;

  // ✅ Insert fresh package with only known columns
  const { data: packageInsert, error: packageError } = await supabase
    .from('packages')
    .insert([{ title: 'Test Package ' + uuidv4().slice(0, 4), price_usd: 1200 }])
    .select();

  if (packageError || !packageInsert?.[0]?.id) {
    console.error('❌ Failed to insert package:', packageError?.message);
    return;
  }

  const packageId = packageInsert[0].id;

  // ✅ Book the package
  const confirmationCode = 'NYL-' + uuidv4().split('-')[0].toUpperCase();

  const { error: bookingError } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: userId,
        service_type: 'package',
        service_id: packageId,
        booking_date: bookingDate,
        status: 'confirmed',
        total_price: totalPrice,
        confirmation_code: confirmationCode,
      },
    ]);

  if (bookingError) {
    console.error('❌ Booking failed:', bookingError.message);
  } else {
    console.log('✅ Booking confirmed:', confirmationCode);
  }
}

setupAndBook();