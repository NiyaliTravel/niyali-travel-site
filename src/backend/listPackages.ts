import supabase from '../supabaseClient.ts'

async function listPackages() {
  const { data, error } = await supabase.from('packages').select('*')
  if (error) {
    console.error('Error fetching packages:', error)
  } else {
    console.log('Packages:', data)
  }
}

listPackages()