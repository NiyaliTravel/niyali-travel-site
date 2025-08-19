import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import VRViewer from "@/components/vr-viewer";

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState("");
  const [showVRViewer, setShowVRViewer] = useState(false);

  const atolls = [
    "Dhaalu Atoll",
    "North Malé Atoll", 
    "South Malé Atoll",
    "Ari Atoll",
    "Baa Atoll",
    "Lhaviyani Atoll"
  ];

  const handleSearch = () => {
    // Handle search functionality
    console.log({ destination, checkIn, guests });
  };

  const handleVRTour = () => {
    setShowVRViewer(true);
  };

  const handleConnectAgent = () => {
    // Handle agent connection
    console.log("Connecting with agent...");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Transcend the <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Ordinary</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover authentic Maldivian experiences across 26 pristine atolls with AI-powered personalization and VR previews
        </p>
        
        {/* Search Bar */}
        <div className="glass-morphism rounded-2xl p-6 max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger data-testid="select-destination">
                  <SelectValue placeholder="Choose Atoll" />
                </SelectTrigger>
                <SelectContent>
                  {atolls.map((atoll) => (
                    <SelectItem key={atoll} value={atoll}>{atoll}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <Input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="focus:ring-2 focus:ring-niyali-gold focus:border-transparent"
                data-testid="input-check-in"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger data-testid="select-guests">
                  <SelectValue placeholder="2 Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            className="w-full mt-4 bg-niyali-gradient text-white py-4 px-8 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            onClick={handleSearch}
            data-testid="button-search-experiences"
          >
            Search Experiences
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-opacity-30 transition-all"
            onClick={handleVRTour}
            data-testid="button-start-vr-tour"
          >
            🥽 Start VR Tour
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-niyali-navy transition-all"
            onClick={handleConnectAgent}
            data-testid="button-connect-agent"
          >
            Connect with Agent
          </Button>
        </div>
      </div>

      {/* VR Viewer Modal */}
      {showVRViewer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white"
              onClick={() => setShowVRViewer(false)}
              data-testid="button-close-vr"
            >
              ✕ Close
            </Button>
            <VRViewer 
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
              title="Maldivian Paradise VR Tour"
            />
          </div>
        </div>
      )}
    </section>
  );
}
