import supabase from '../supabaseClient.ts'

async function updatePackage() {
  const { data, error } = await supabase
    .from('packages')
    .update({
      title: 'Sunset Cruise Deluxe',
      price: 150.00
    })
    .eq('id', 'a47d3f4e-6174-4f13-8f8f-6fe4f2e03967') // ← your actual package ID
    .select()

  if (error) {
    console.error('❌ Error updating package:', error)
  } else {
    console.log('✅ Package updated:', data)
  }
}

updatePackage()