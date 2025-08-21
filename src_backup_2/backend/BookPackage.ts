import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  'https://kcmrwjvwgegmiowzjimt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'
);

const bookingDate = new Date().toISOString().split('T')[0];
const totalPrice = 1200;

async function bookPackage() {
  const confirmationCode = 'NYL-' + uuidv4().split('-')[0].toUpperCase();

  const { data: users } = await supabase.from('users').select('*').limit(1);
  const { data: packages } = await supabase.from('packages').select('*').limit(1);

  const userId = users?.[0]?.id || users?.[0]?.uuid;
  const packageId = packages?.[0]?.id || packages?.[0]?.uuid;

  if (!userId || !packageId) {
    console.error('❌ No valid user or package UUID found');
    return;
  }

  try {
    const { data, error } = await supabase
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

    if (error) {
      console.error('❌ Booking failed:', error.message);
    } else {
      console.log('✅ Booking confirmed:', confirmationCode);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

bookPackage();