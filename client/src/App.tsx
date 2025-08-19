import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Destinations from "@/pages/destinations";
import Experiences from "@/pages/experiences";
import GuestHouses from "@/pages/guest-houses";
import FerrySchedule from "@/pages/ferry-schedule";
import DomesticAirlines from "@/pages/domestic-airlines";
import AgentPortal from "@/pages/agent-portal";
import TravelerPortal from "@/pages/traveler-portal";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/experiences" component={Experiences} />
      <Route path="/guest-houses" component={GuestHouses} />
      <Route path="/ferry-schedule" component={FerrySchedule} />
      <Route path="/domestic-airlines" component={DomesticAirlines} />
      <Route path="/agent-portal" component={AgentPortal} />
      <Route path="/traveler-portal" component={TravelerPortal} />
      <Route path="/admin" component={AdminDashboard} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
