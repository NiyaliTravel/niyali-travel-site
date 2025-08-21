import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleLogin = async (email, password) => {
  const { data: { session }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return;
  }

  const user = session.user;

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (userError) {
    console.error('Error checking admin status:', userError.message);
    return;
  }

  if (userData?.is_admin) {
    navigate('/admin/dashboard');
  } else {
    navigate('/client/home');
  }
};