import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function TestSupabase() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase.from('packages').select('*')
      if (error) {
        console.error('Supabase error:', error)
        setError(error.message)
      } else {
        setData(data)
      }
    }

    fetchPackages()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧪 Supabase Connection Test</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!data ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}