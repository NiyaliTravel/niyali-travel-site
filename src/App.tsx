import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { Toaster } from '@/components/ui/toaster';

// Layout components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Page components
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import Experiences from '@/pages/Experiences';
import Resorts from '@/pages/Resorts';
import FerrySchedule from '@/pages/FerrySchedule';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import TravelerPortal from '@/pages/TravelerPortal';
import AgentPortal from '@/pages/AgentPortal';
import Admin from '@/pages/Admin';
import AdminBookings from '@/pages/AdminBookings';
import AdminReferrals from '@/pages/AdminReferrals';
import ReferralDashboard from '@/pages/ReferralDashboard';
import NotFound from '@/pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const isAuthenticated = localStorage.getItem('niyali_user');
  const user = isAuthenticated ? JSON.parse(isAuthenticated) : null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/resorts" element={<Resorts />} />
                <Route path="/ferry-schedule" element={<FerrySchedule />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes - Traveler */}
                <Route 
                  path="/traveler-portal" 
                  element={
                    <ProtectedRoute requiredRole="traveler">
                      <TravelerPortal />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/referral-dashboard" 
                  element={
                    <ProtectedRoute>
                      <ReferralDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Routes - Agent */}
                <Route 
                  path="/agent-portal" 
                  element={
                    <ProtectedRoute requiredRole="agent">
                      <AgentPortal />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Routes - Admin */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/bookings" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/referrals" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminReferrals />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;