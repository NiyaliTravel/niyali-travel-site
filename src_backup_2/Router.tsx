import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminBookings from './pages/AdminBookings';
import AdminReferrals from './pages/AdminReferrals';
import ReferralDashboard from './pages/ReferralDashboard';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-bookings" element={<AdminBookings />} />
        <Route path="/admin/referrals" element={<AdminReferrals />} />
        <Route path="/referral-dashboard" element={<ReferralDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;