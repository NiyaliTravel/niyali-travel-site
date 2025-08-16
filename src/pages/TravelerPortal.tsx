import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  MapPin, 
  Star, 
  Bookmark,
  Settings,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';

const TravelerPortal = () => {
  const { user } = useAuth();
  const { bookingItems } = useBooking();

  if (!user || user.role !== 'traveler') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>This portal is only accessible to registered travelers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/login">Login as Traveler</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const upcomingTrips = [
    {
      id: 1,
      title: 'Maldives Adventure',
      destination: 'Baa Atoll',
      dates: 'Mar 15 - Mar 22, 2025',
      experiences: ['Hanifaru Bay Snorkeling', 'Sunset Dolphin Cruise'],
      agent: 'Ahmed Hassan',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Cultural Immersion',
      destination: 'South Malé Atoll',
      dates: 'Apr 10 - Apr 14, 2025',
      experiences: ['Local Island Tour', 'Traditional Crafts Workshop'],
      agent: 'Fatima Ali',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'
    }
  ];

  const pastTrips = [
    {
      id: 3,
      title: 'Honeymoon Escape',
      destination: 'North Malé Atoll',
      dates: 'Dec 20 - Dec 27, 2024',
      experiences: ['Sunset Cruise', 'Spa Treatment'],
      agent: 'Ahmed Hassan',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop'
    }
  ];

  const wishlist = [
    {
      id: 1,
      title: 'Freediving with Whale Sharks',
      location: 'South Ari Atoll',
      price: 250,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Underwater Photography Workshop',
      location: 'Baa Atoll',
      price: 320,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop'
    }
  ];

  const messages = [
    {
      id: 1,
      agent: 'Ahmed Hassan',
      lastMessage: 'Your Baa Atoll trip is confirmed! I\'ve sent you the detailed itinerary.',
      timestamp: '2 hours ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    },
    {
      id: 2,
      agent: 'Fatima Ali',
      lastMessage: 'The cultural workshop has been updated with new activities.',
      timestamp: '1 day ago',
      unread: false,
      avatar: '/images/Avatar.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.profilePhoto} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Badge variant="secondary">{user.tierBadge}</Badge>
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>
            <Button>Plan New Trip</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingTrips.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastTrips.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wishlist.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookingItems.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Trips */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Adventures</CardTitle>
                <CardDescription>Your confirmed and pending trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="flex space-x-4 p-4 border rounded-lg">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{trip.title}</h3>
                          <Badge variant={trip.status === 'confirmed' ? 'default' : 'secondary'}>
                            {trip.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {trip.destination}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {trip.dates}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Agent: {trip.agent} • {trip.experiences.length} experiences
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest updates from your agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.slice(0, 2).map((message) => (
                    <div key={message.id} className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.agent} />
                        <AvatarFallback>{message.agent.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{message.agent}</p>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.lastMessage}</p>
                        {message.unread && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTrips.map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4">
                        <img 
                          src={trip.image} 
                          alt={trip.title}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold">{trip.title}</h3>
                        <p className="text-sm text-gray-600">{trip.destination} • {trip.dates}</p>
                        <Badge className="mt-2" variant={trip.status === 'confirmed' ? 'default' : 'secondary'}>
                          {trip.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastTrips.map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4">
                        <img 
                          src={trip.image} 
                          alt={trip.title}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold">{trip.title}</h3>
                        <p className="text-sm text-gray-600">{trip.destination} • {trip.dates}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(trip.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">Excellent trip!</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Experiences you want to try</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.location}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-lg">${item.price}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-3">Book Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Chat with your travel agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.agent} />
                        <AvatarFallback>{message.agent.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{message.agent}</p>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.lastMessage}</p>
                        {message.unread && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Profile management interface would be here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelerPortal;