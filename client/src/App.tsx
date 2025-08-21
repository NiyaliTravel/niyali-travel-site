import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Destinations from "@/pages/destinations";
import GuestHouses from "@/pages/guest-houses";
import FerrySchedule from "@/pages/ferry-schedule";
import DomesticAirlines from "@/pages/domestic-airlines";
import AgentPortal from "@/pages/agent-portal";
import AgentLogin from "@/pages/agent-login";
import TravelerPortal from "@/pages/traveler-portal";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminLogin from "@/pages/admin-login";
import AdminAvailability from "@/pages/admin-availability";
import BookingEngine from "@/pages/booking-engine";
import IslandExplorer from "@/pages/island-explorer";
import Islands from "@/pages/islands";
import Packages from "@/pages/packages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/experiences" element={<Packages />} />
      <Route path="/guest-houses" element={<GuestHouses />} />
      <Route path="/islands" element={<Islands />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/ferry-schedule" element={<FerrySchedule />} />
      <Route path="/domestic-airlines" element={<DomesticAirlines />} />
      <Route path="/agent-portal" element={<AgentPortal />} />
      <Route path="/agent-login" element={<AgentLogin />} />
      <Route path="/traveler-portal" element={<TravelerPortal />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/availability" element={<AdminAvailability />} />
      <Route path="/booking" element={<BookingEngine />} />
      <Route path="/island-explorer" element={<IslandExplorer />} />
      {/* Fallback to 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter basename="/niyali-travel-site">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/experiences" element={<Packages />} />
            <Route path="/guest-houses" element={<GuestHouses />} />
            <Route path="/islands" element={<Islands />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/ferry-schedule" element={<FerrySchedule />} />
            <Route path="/domestic-airlines" element={<DomesticAirlines />} />
            <Route path="/agent-portal" element={<AgentPortal />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/traveler-portal" element={<TravelerPortal />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/availability" element={<AdminAvailability />} />
            <Route path="/booking" element={<BookingEngine />} />
            <Route path="/island-explorer" element={<IslandExplorer />} />
            {/* Fallback to 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
