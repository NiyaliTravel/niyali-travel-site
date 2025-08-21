import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get image path and package ID from terminal
const imagePath = process.argv[2];
const packageId = process.argv[3];

if (!imagePath || !packageId) {
  console.error('❌ Usage: npx ts-node src/backend/UploadImage.ts <imagePath> <packageId>');
  process.exit(1);
}

const fileName = `${packageId}-${path.basename(imagePath)}`;

async function uploadImage() {
  const fileBuffer = fs.readFileSync(imagePath);

  const { data, error } = await supabase.storage
    .from('package-images')
    .upload(fileName, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    console.error('❌ Upload failed:', error.message);
  } else {
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/package-images/${fileName}`;
    console.log('✅ Image uploaded:', publicUrl);

    // Optional: update the package with image URL
    const { error: updateError } = await supabase
      .from('packages')
      .update({ image_url: publicUrl })
      .eq('id', packageId);

    if (updateError) {
      console.error('❌ Failed to update package:', updateError.message);
    } else {
      console.log('✅ Package updated with image URL');
    }
  }
}

uploadImage();