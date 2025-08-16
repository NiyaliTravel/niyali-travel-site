import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  MessageCircle, 
  BookOpen,
  Award,
  BarChart3,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AgentPortal = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  if (!user || user.role !== 'agent') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>This portal is only accessible to registered agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/login">Login as Agent</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    totalBookings: 47,
    totalRevenue: 23450,
    commission: 4690,
    activeClients: 23,
    avgRating: 4.8,
    tierProgress: 68
  };

  const recentBookings = [
    {
      id: 1,
      client: 'Sarah Johnson',
      experience: 'Hanifaru Bay Snorkeling',
      date: '2025-01-15',
      value: 360,
      status: 'confirmed'
    },
    {
      id: 2,
      client: 'Marco Silva',
      experience: 'Freediving with Mantas',
      date: '2025-01-18',
      value: 500,
      status: 'pending'
    },
    {
      id: 3,
      client: 'Emma Wilson',
      experience: 'Sunset Dolphin Cruise',
      date: '2025-01-20',
      value: 190,
      status: 'confirmed'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      country: 'USA',
      totalSpent: 2340,
      lastBooking: '2025-01-15',
      avatar: '/images/portrait.jpg'
    },
    {
      id: 2,
      name: 'Marco Silva',
      email: 'marco@email.com',
      country: 'Brazil',
      totalSpent: 1850,
      lastBooking: '2025-01-10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
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
                  <span>{user.company}</span>
                  <Badge variant="secondary">{user.tierBadge}</Badge>
                </div>
              </div>
            </div>
            <Button>Create New Booking</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.commission.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">20% commission rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeClients}</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tier Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Tier Progress
                </CardTitle>
                <CardDescription>
                  You're {100 - stats.tierProgress}% away from reaching Platinum Explorer status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={stats.tierProgress} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Gold Explorer</span>
                  <span>68% Complete</span>
                  <span>Platinum Explorer</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{booking.client}</p>
                          <p className="text-sm text-gray-600">{booking.experience}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${booking.value}</p>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-bold">{stats.avgRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-bold">2.3 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Booking Success Rate</span>
                    <span className="font-bold">94%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage all your client bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Booking management interface would be here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>View and manage your client relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-600">{client.email}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Globe className="h-3 w-3 mr-1" />
                            {client.country}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${client.totalSpent.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total spent</p>
                        <p className="text-xs text-gray-500">Last: {client.lastBooking}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission & Earnings</CardTitle>
                <CardDescription>Track your earnings and commission structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Commission tracking interface would be here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Profile</CardTitle>
                <CardDescription>Manage your professional profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
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

export default AgentPortal;