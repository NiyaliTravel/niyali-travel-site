import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function Booking() {
  const [location] = useLocation();
  const [packageId, setPackageId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    numAdults: 2,
    numChildren: 0,
    numInfants: 0,
    specialRequests: "",
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPackageId(searchParams.get("package"));
  }, []);

  const { data: packageData, isLoading: isLoadingPackage } = useQuery({
    queryKey: ['/api/packages', packageId],
    queryFn: () => fetch(`/api/packages/${packageId}`).then(res => res.json()),
    enabled: !!packageId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (field: "numAdults" | "numChildren" | "numInfants", value: number) => {
    setBookingDetails(prev => ({ ...prev, [field]: Math.max(0, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    // Here you would typically send the booking details to your backend
    // For now, we'll just simulate a successful booking
    setTimeout(() => {
      setBookingStatus("success");
    }, 2000);
  };

  if (isLoadingPackage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-niyali-teal" />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 text-center py-20">
          <h1 className="text-2xl font-bold text-niyali-navy">Package not found</h1>
          <p className="text-gray-600">The requested package could not be found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-niyali-navy mb-6">Finalize Your Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{packageData.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{packageData.description}</p>
                <div className="space-y-2">
                  <p><strong>Duration:</strong> {packageData.duration} days</p>
                  <p><strong>Price:</strong> ${packageData.price}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={bookingDetails.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={bookingDetails.email} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={bookingDetails.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <Label htmlFor="numAdults">Adults</Label>
                      <Input id="numAdults" name="numAdults" type="number" value={bookingDetails.numAdults} onChange={(e) => handleGuestChange("numAdults", parseInt(e.target.value))} min={1} />
                    </div>
                    <div>
                      <Label htmlFor="numChildren">Children</Label>
                      <Input id="numChildren" name="numChildren" type="number" value={bookingDetails.numChildren} onChange={(e) => handleGuestChange("numChildren", parseInt(e.target.value))} min={0} />
                    </div>
                    <div>
                      <Label htmlFor="numInfants">Infants</Label>
                      <Input id="numInfants" name="numInfants" type="number" value={bookingDetails.numInfants} onChange={(e) => handleGuestChange("numInfants", parseInt(e.target.value))} min={0} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <textarea id="specialRequests" name="specialRequests" value={bookingDetails.specialRequests} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Let us know if you have any special requests" />
                  </div>
                  <Button type="submit" className="w-full niyali-gradient text-white" disabled={bookingStatus === "loading"}>
                    {bookingStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Booking"}
                  </Button>
                </CardContent>
              </Card>
            </form>
            {bookingStatus === "success" && (
              <Alert className="mt-4">
                <AlertTitle>Booking Confirmed!</AlertTitle>
                <AlertDescription>
                  Thank you for your booking. We have sent a confirmation to your email.
                </AlertDescription>
              </Alert>
            )}
            {bookingStatus === "error" && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Booking Failed</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}