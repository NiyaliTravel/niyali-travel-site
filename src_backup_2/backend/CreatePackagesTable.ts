import supabase from '../supabaseClient.ts'

async function createPackagesTable() {
  const { error } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS packages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        price numeric,
        description text,
        created_at timestamp DEFAULT now()
      );
    `
  })

  if (error) {
    console.error('Error creating table:', error)
  } else {
    console.log('✅ Table "packages" created successfully')
  }
}

createPackagesTable()