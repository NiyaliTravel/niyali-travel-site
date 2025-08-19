import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Hotel, 
  Package, 
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Save
} from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function AdminAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("rooms");
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check admin authentication
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    window.location.href = '/admin-login';
    return null;
  }

  // Fetch guest houses for room availability
  const { data: guestHouses, isLoading: isLoadingGuestHouses } = useQuery({
    queryKey: ['/api/guest-houses'],
  });

  // Fetch room availability
  const { data: roomAvailability, isLoading: isLoadingRooms } = useQuery({
    queryKey: ['/api/room-availability', selectedDate],
  });

  // Fetch packages
  const { data: packages, isLoading: isLoadingPackages } = useQuery({
    queryKey: ['/api/packages'],
  });

  // Create room availability mutation
  const createRoomMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/room-availability', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/room-availability'] });
      toast({ title: "Success", description: "Room availability added" });
      setEditingRoom(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add availability", variant: "destructive" });
    }
  });

  // Create package mutation
  const createPackageMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/packages', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
      toast({ title: "Success", description: "Package created" });
      setEditingPackage(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create package", variant: "destructive" });
    }
  });

  const handleSaveRoomAvailability = () => {
    if (!editingRoom.guestHouseId || !editingRoom.roomType || !editingRoom.totalRooms || !editingRoom.pricePerNight) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    createRoomMutation.mutate({
      ...editingRoom,
      date: selectedDate,
      availableRooms: editingRoom.totalRooms
    });
  };

  const handleSavePackage = () => {
    if (!editingPackage.name || !editingPackage.duration || !editingPackage.price || !editingPackage.maxGuests) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    createPackageMutation.mutate({
      ...editingPackage,
      inclusions: editingPackage.inclusions?.split(',').map((s: string) => s.trim()) || [],
      exclusions: editingPackage.exclusions?.split(',').map((s: string) => s.trim()) || [],
      images: editingPackage.images?.split(',').map((s: string) => s.trim()) || []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-niyali-navy">Availability Management</h1>
              <p className="text-gray-600">Manage room and package availability</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/admin'}
              variant="outline"
              data-testid="button-back-to-admin"
            >
              Back to Admin Dashboard
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="rooms">Room Availability</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="w-5 h-5" />
                    Room Availability Calendar
                  </CardTitle>
                  <Button 
                    onClick={() => setEditingRoom({ totalRooms: 1, pricePerNight: 100 })}
                    data-testid="button-add-room-availability"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Availability
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">
                        Availability for {format(selectedDate, "PPP")}
                      </h3>
                      {isLoadingRooms ? (
                        <p>Loading...</p>
                      ) : (
                        <div className="space-y-3">
                          {Array.isArray(roomAvailability) && roomAvailability.length > 0 ? (
                            roomAvailability.map((room: any) => (
                              <div key={room.id} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{room.roomType}</p>
                                    <p className="text-sm text-gray-600">
                                      {room.availableRooms}/{room.totalRooms} rooms available
                                    </p>
                                    <p className="text-sm font-bold">${room.pricePerNight}/night</p>
                                  </div>
                                  <Badge variant={room.availableRooms > 0 ? "default" : "destructive"}>
                                    {room.availableRooms > 0 ? "Available" : "Sold Out"}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">No availability set for this date</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {editingRoom && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-4">Add Room Availability</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Guest House</Label>
                          <Select 
                            value={editingRoom.guestHouseId}
                            onValueChange={(value) => setEditingRoom({...editingRoom, guestHouseId: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select guest house" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.isArray(guestHouses) && guestHouses.map((gh: any) => (
                                <SelectItem key={gh.id} value={gh.id}>
                                  {gh.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Room Type</Label>
                          <Input
                            value={editingRoom.roomType || ''}
                            onChange={(e) => setEditingRoom({...editingRoom, roomType: e.target.value})}
                            placeholder="e.g., Standard, Deluxe, Suite"
                            data-testid="input-room-type"
                          />
                        </div>
                        <div>
                          <Label>Total Rooms</Label>
                          <Input
                            type="number"
                            value={editingRoom.totalRooms || ''}
                            onChange={(e) => setEditingRoom({...editingRoom, totalRooms: parseInt(e.target.value)})}
                            data-testid="input-total-rooms"
                          />
                        </div>
                        <div>
                          <Label>Price Per Night ($)</Label>
                          <Input
                            type="number"
                            value={editingRoom.pricePerNight || ''}
                            onChange={(e) => setEditingRoom({...editingRoom, pricePerNight: parseFloat(e.target.value)})}
                            data-testid="input-price-per-night"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleSaveRoomAvailability} data-testid="button-save-room-availability">
                          <Save className="w-4 h-4 mr-2" />
                          Save Availability
                        </Button>
                        <Button variant="outline" onClick={() => setEditingRoom(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Travel Packages
                  </CardTitle>
                  <Button 
                    onClick={() => setEditingPackage({ isActive: true, featured: false })}
                    data-testid="button-add-package"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Package
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingPackages ? (
                    <p>Loading packages...</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.isArray(packages) && packages.map((pkg: any) => (
                        <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{pkg.name}</h3>
                              <Badge variant={pkg.isActive ? "default" : "secondary"}>
                                {pkg.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                            <div className="space-y-1 text-sm">
                              <p><strong>Duration:</strong> {pkg.duration} days</p>
                              <p><strong>Price:</strong> ${pkg.price}</p>
                              <p><strong>Max Guests:</strong> {pkg.maxGuests}</p>
                            </div>
                            {pkg.featured && (
                              <Badge variant="outline" className="mt-2">Featured</Badge>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {editingPackage && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-4">Create New Package</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Package Name</Label>
                          <Input
                            value={editingPackage.name || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                            placeholder="e.g., Maldivian Culture Experience"
                            data-testid="input-package-name"
                          />
                        </div>
                        <div>
                          <Label>Duration (days)</Label>
                          <Input
                            type="number"
                            value={editingPackage.duration || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, duration: parseInt(e.target.value)})}
                            data-testid="input-package-duration"
                          />
                        </div>
                        <div>
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            value={editingPackage.price || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, price: parseFloat(e.target.value)})}
                            data-testid="input-package-price"
                          />
                        </div>
                        <div>
                          <Label>Max Guests</Label>
                          <Input
                            type="number"
                            value={editingPackage.maxGuests || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, maxGuests: parseInt(e.target.value)})}
                            data-testid="input-package-max-guests"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={editingPackage.description || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                            placeholder="Describe the package experience"
                            data-testid="textarea-package-description"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Inclusions (comma-separated)</Label>
                          <Input
                            value={editingPackage.inclusions || ''}
                            onChange={(e) => setEditingPackage({...editingPackage, inclusions: e.target.value})}
                            placeholder="e.g., Accommodation, Meals, Tours"
                            data-testid="input-package-inclusions"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingPackage.featured}
                            onCheckedChange={(checked) => setEditingPackage({...editingPackage, featured: checked})}
                          />
                          <Label>Featured Package</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingPackage.isActive}
                            onCheckedChange={(checked) => setEditingPackage({...editingPackage, isActive: checked})}
                          />
                          <Label>Active</Label>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleSavePackage} data-testid="button-save-package">
                          <Save className="w-4 h-4 mr-2" />
                          Save Package
                        </Button>
                        <Button variant="outline" onClick={() => setEditingPackage(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}