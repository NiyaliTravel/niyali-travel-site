import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Ship, Clock, MapPin, Calendar } from 'lucide-react';

const FerrySchedule = () => {
  const schedules = [
    {
      id: 1,
      route: 'Malé → Maafushi',
      departure: '10:00 AM',
      arrival: '11:30 AM',
      duration: '1h 30m',
      days: ['Mon', 'Wed', 'Fri', 'Sun'],
      price: 25,
      status: 'On Time'
    },
    {
      id: 2,
      route: 'Malé → Thulusdhoo',
      departure: '02:30 PM',
      arrival: '04:00 PM',
      duration: '1h 30m',
      days: ['Tue', 'Thu', 'Sat'],
      price: 30,
      status: 'On Time'
    },
    {
      id: 3,
      route: 'Malé → Dhigurah',
      departure: '09:00 AM',
      arrival: '02:00 PM',
      duration: '5h',
      days: ['Mon', 'Thu'],
      price: 50,
      status: 'Delayed'
    },
    {
      id: 4,
      route: 'Maafushi → Malé',
      departure: '07:00 AM',
      arrival: '08:30 AM',
      duration: '1h 30m',
      days: ['Daily'],
      price: 25,
      status: 'On Time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ferry Schedule</h1>
          <p className="text-xl opacity-90">Plan your island hopping with our ferry timetable</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Current Ferry Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map(schedule => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {schedule.route}
                        </div>
                      </TableCell>
                      <TableCell>{schedule.departure}</TableCell>
                      <TableCell>{schedule.arrival}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {schedule.days.map(day => (
                            <Badge key={day} variant="outline" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>${schedule.price}</TableCell>
                      <TableCell>
                        <Badge variant={schedule.status === 'On Time' ? 'default' : 'destructive'}>
                          {schedule.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Booking Tips</h3>
              <p className="text-sm text-gray-600">Book your ferry tickets at least 24 hours in advance during peak season</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Check-in Time</h3>
              <p className="text-sm text-gray-600">Arrive at the ferry terminal 30 minutes before departure</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Ship className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Weather Updates</h3>
              <p className="text-sm text-gray-600">Ferry schedules may change due to weather conditions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FerrySchedule;