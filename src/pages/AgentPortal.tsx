import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, TrendingUp, Briefcase, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AgentPortal = () => {
  // Mock data for demonstration
  const agent = {
    name: 'Jane Agent',
    email: 'jane.agent@example.com',
    company: 'Global Travel Agency',
    contactNumber: '+1234567890',
    whatsappNumber: '+1234567890',
    profilePhoto: 'https://public-frontend-cos.metadl.com/mgx/img/portrait.jpg',
    commissionRate: 10, // in percentage
    tierBadge: 'Elite Agent'
  };

  const recentBookings = [
    {
      id: 1,
      clientName: 'Alice Smith',
      destination: 'Malé Atoll',
      package: 'Luxury Honeymoon Package',
      commission: 120,
      status: 'Confirmed',
      date: '2025-08-10',
      totalPrice: 1200
    },
    {
      id: 2,
      clientName: 'Bob Johnson',
      destination: 'Ari Atoll',
      package: 'Diving Adventure',
      commission: 45,
      status: 'Pending',
      date: '2025-08-15',
      totalPrice: 450
    }
  ];

  const clientList = [
    { id: 1, name: 'Alice Smith', email: 'alice.s@example.com', lastBooking: '2025-08-10' },
    { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', lastBooking: '2025-08-15' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', lastBooking: '2025-07-20' }
  ];

  const totalCommissionEarned = recentBookings.reduce((sum, booking) => sum + booking.commission, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agent Portal</h1>
          <p className="text-xl opacity-90">Manage your clients and commissions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Agent Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6 text-center">
              <img
                src={agent.profilePhoto}
                alt={agent.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{agent.name}</h2>
              <p className="text-gray-600">{agent.company}</p>
              <Badge variant="secondary" className="mt-2">{agent.tierBadge}</Badge>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                <Mail className="h-4 w-4" /> {agent.email}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" /> {agent.contactNumber}
              </div>
              <Button variant="outline" className="mt-4 w-full">Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalCommissionEarned.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {agent.commissionRate}% commission rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientList.length}</div>
                <p className="text-xs text-muted-foreground">
                  Managing your network
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings This Month</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentBookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  Recent client activities
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${recentBookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Total value of bookings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="clients">My Clients</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Recent Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            {recentBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No recent bookings. Start assisting your clients!</p>
                  <Button className="mt-4">Find Packages</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recentBookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.clientName}</CardTitle>
                        <CardDescription>{booking.package}</CardDescription>
                        <p className="text-sm text-gray-600 mt-1">
                          {booking.destination} - {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>{booking.status}</Badge>
                        <p className="text-xl font-bold mt-2">${booking.commission.toFixed(2)}</p>
                        <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            {clientList.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No clients yet. Start building your client base!</p>
                  <Button className="mt-4">Add New Client</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {clientList.map(client => (
                  <Card key={client.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.email}</CardDescription>
                        <p className="text-sm text-gray-600 mt-1">
                          Last Booking: {client.lastBooking ? new Date(client.lastBooking).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View Client</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardContent className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Detailed reports coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentPortal;