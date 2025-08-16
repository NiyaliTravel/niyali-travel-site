import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin, Users, Anchor, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

const FerrySchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const routes = [
    { value: 'male', label: 'Malé' },
    { value: 'hulhumale', label: 'Hulhumalé' },
    { value: 'airport', label: 'Velana Airport' },
    { value: 'maafushi', label: 'Maafushi' },
    { value: 'gulhi', label: 'Gulhi' },
    { value: 'thulusdhoo', label: 'Thulusdhoo' },
    { value: 'himmafushi', label: 'Himmafushi' },
    { value: 'huraa', label: 'Huraa' }
  ];

  const ferrySchedules = [
    {
      id: 1,
      route: 'Malé - Maafushi',
      departure: '09:00',
      arrival: '10:30',
      duration: '1h 30m',
      price: 25,
      operator: 'MTCC',
      ferry: 'Raajje Express',
      capacity: 150,
      available: 45,
      type: 'Regular',
      amenities: ['AC', 'WiFi', 'Refreshments']
    },
    {
      id: 2,
      route: 'Maafushi - Malé',
      departure: '15:30',
      arrival: '17:00',
      duration: '1h 30m',
      price: 25,
      operator: 'MTCC',
      ferry: 'Raajje Express',
      capacity: 150,
      available: 32,
      type: 'Regular',
      amenities: ['AC', 'WiFi', 'Refreshments']
    },
    {
      id: 3,
      route: 'Malé - Thulusdhoo',
      departure: '11:00',
      arrival: '12:00',
      duration: '1h 00m',
      price: 20,
      operator: 'Island Transport',
      ferry: 'Blue Wave',
      capacity: 100,
      available: 78,
      type: 'Express',
      amenities: ['AC', 'Snacks']
    },
    {
      id: 4,
      route: 'Hulhumalé - Maafushi',
      departure: '08:30',
      arrival: '10:15',
      duration: '1h 45m',
      price: 30,
      operator: 'MTCC',
      ferry: 'Sea Star',
      capacity: 120,
      available: 89,
      type: 'Regular',
      amenities: ['AC', 'WiFi', 'Refreshments', 'Sundeck']
    },
    {
      id: 5,
      route: 'Malé - Gulhi',
      departure: '13:00',
      arrival: '14:15',
      duration: '1h 15m',
      price: 22,
      operator: 'Local Ferry',
      ferry: 'Ocean Breeze',
      capacity: 80,
      available: 23,
      type: 'Regular',
      amenities: ['Fan', 'Basic Seating']
    },
    {
      id: 6,
      route: 'Airport - Hulhumalé',
      departure: '06:00',
      arrival: '06:15',
      duration: '15m',
      price: 15,
      operator: 'MACL',
      ferry: 'Airport Link',
      capacity: 200,
      available: 156,
      type: 'Shuttle',
      amenities: ['AC', 'Luggage Space']
    }
  ];

  const filteredSchedules = ferrySchedules.filter(schedule => {
    if (fromLocation && fromLocation !== 'all' && !schedule.route.toLowerCase().includes(fromLocation.toLowerCase())) {
      return false;
    }
    if (toLocation && toLocation !== 'all' && !schedule.route.toLowerCase().includes(toLocation.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getAvailabilityColor = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return 'bg-green-100 text-green-800';
    if (percentage > 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Ferry Schedules</h1>
            <p className="text-xl text-blue-100">
              Real-time ferry schedules for inter-island transportation across the Maldives
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6">Find Ferry Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromLocation} onValueChange={setFromLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select departure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {routes.map((route) => (
                      <SelectItem key={route.value} value={route.value}>
                        {route.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toLocation} onValueChange={setToLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {routes.map((route) => (
                      <SelectItem key={route.value} value={route.value}>
                        {route.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ferry Schedules */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Available Ferries</h2>
              <p className="text-gray-600">
                {format(selectedDate, 'EEEE, MMMM dd, yyyy')} • {filteredSchedules.length} routes found
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredSchedules.map((schedule) => (
              <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg flex items-center">
                            <Anchor className="h-5 w-5 mr-2 text-blue-600" />
                            {schedule.route}
                          </h3>
                          <p className="text-sm text-gray-600">{schedule.ferry} • {schedule.operator}</p>
                        </div>
                        <Badge variant="outline" className={schedule.type === 'Express' ? 'border-green-500 text-green-700' : ''}>
                          {schedule.type}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="font-medium">{schedule.departure}</span>
                          <span className="mx-2 text-gray-400">→</span>
                          <span className="font-medium">{schedule.arrival}</span>
                          <span className="ml-2 text-gray-600">({schedule.duration})</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {schedule.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="lg:text-right space-y-3">
                      <div>
                        <div className="text-2xl font-bold">${schedule.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>

                      <div className="space-y-2">
                        <Badge className={getAvailabilityColor(schedule.available, schedule.capacity)}>
                          {schedule.available} seats available
                        </Badge>
                        <div className="text-xs text-gray-600">
                          {schedule.capacity} total capacity
                        </div>
                      </div>

                      <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700">
                        Book Ferry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ferry Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Travel Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about ferry travel in the Maldives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Schedules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Ferry schedules may vary due to weather conditions. We recommend checking real-time updates before travel.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Regular ferry services connect major islands and local communities throughout the Maldives archipelago.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Advance booking recommended during peak season. Group discounts available for 10+ passengers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FerrySchedule;