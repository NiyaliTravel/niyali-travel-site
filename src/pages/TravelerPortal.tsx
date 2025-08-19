import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Calendar, Heart, User, DollarSign, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelerPortal = () => {
  // Mock data for demonstration
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePhoto: 'https://public-frontend-cos.metadl.com/mgx/img/Avatar.jpg',
    tierBadge: 'Gold Explorer'
  };

  const upcomingBookings = [
    {
      id: 1,
      destination: 'Maafushi Island',
      resort: 'Maafushi Beach Resort',
      checkIn: '2025-09-10',
      checkOut: '2025-09-15',
      status: 'Confirmed',
      totalPrice: 1200
    },
    {
      id: 2,
      destination: 'Ari Atoll',
      experience: 'Manta Ray Snorkeling',
      date: '2025-09-12',
      status: 'Confirmed',
      totalPrice: 150
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      type: 'Resort',
      name: 'The St. Regis Maldives Vommuli Resort',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      price: 800
    },
    {
      id: 2,
      type: 'Experience',
      name: 'Private Island Picnic',
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800',
      price: 250
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-xl opacity-90">Your personalized travel dashboard</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6 text-center">
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <Badge variant="secondary" className="mt-2">{user.tierBadge}</Badge>
              <Button variant="outline" className="mt-4 w-full">Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  Your next adventure awaits!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wishlistItems.length}</div>
                <p className="text-xs text-muted-foreground">
                  Dream trips saved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referral Rewards</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Link to="/referral-dashboard" className="text-primary hover:underline">View Dashboard</Link>
                </div>
                <p className="text-xs text-muted-foreground">
                  Earn by inviting friends
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,350.00</div>
                <p className="text-xs text-muted-foreground">
                  Across all bookings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="wishlist">My Wishlist</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming bookings. Start planning your next trip!</p>
                  <Button className="mt-4">Explore Destinations</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingBookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.destination}</CardTitle>
                        <CardDescription>
                          {booking.resort || booking.experience}
                        </CardDescription>
                        <p className="text-sm text-gray-600 mt-1">
                          {booking.checkIn ? `Check-in: ${booking.checkIn}` : `Date: ${booking.date}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{booking.status}</Badge>
                        <p className="text-xl font-bold mt-2">${booking.totalPrice.toFixed(2)}</p>
                        <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-4">
            {wishlistItems.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your wishlist is empty. Start adding your dream trips!</p>
                  <Button className="mt-4">Add to Wishlist</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {wishlistItems.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.type}</CardDescription>
                        <p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
                        <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Booking History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No past bookings found.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelerPortal;