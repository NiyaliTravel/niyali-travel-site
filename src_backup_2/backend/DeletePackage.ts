import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Get the package ID from the command line
const packageId = process.argv[2];

if (!packageId) {
  console.error('❌ Please provide a package ID. Example:\nnpx ts-node src/backend/DeletePackage.ts <id>');
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deletePackage() {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', packageId);

  if (error) {
    console.error('❌ Error deleting package:', error.message);
  } else {
    console.log(`✅ Package with ID ${packageId} deleted successfully`);
  }
}

deletePackage();