import supabase from '../supabaseClient.ts'

async function insertPackage() {
  const { data, error } = await supabase
    .from('packages')
    .insert([
      {
        title: 'Sunset Cruise in Hulhumalé',
        price: 120.00,
        description: 'Experience the golden hour on a luxury boat with refreshments and local music.'
      }
    ])
    .select() // ← This tells Supabase to return the inserted row

  if (error) {
    console.error('❌ Error inserting package:', error)
  } else {
    console.log('✅ Package inserted:', data)
  }
}

insertPackage()