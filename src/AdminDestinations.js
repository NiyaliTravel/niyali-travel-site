import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase.from('destinations').select('*');
      if (error) console.error(error);
      else setDestinations(data);
    };
    fetchDestinations();
  }, []);

  return (
    <div>
      <h1>Destinations</h1>
      {destinations.map(dest => (
        <div key={dest.id}>{dest.name}</div>
      ))}
    </div>
  );
};

export default AdminDestinations;