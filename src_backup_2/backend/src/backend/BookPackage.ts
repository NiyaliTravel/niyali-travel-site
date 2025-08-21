// src/backend/BookPackage.ts
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Supabase setup
const supabase = createClient(
  'https://your-project-url.supabase.co',
  'your-anon-or-service-role-key'
);

// Inputs
const userId = 'user-uuid-here';
const packageId = 'package-uuid-here';
const bookingDate = new Date().toISOString().split('T')[0]; // today
const totalPrice = 1200; // example price

async function bookPackage() {
  const confirmationCode = 'NYL-' + uuidv4().split('-')[0].toUpperCase();

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
}

bookPackage();