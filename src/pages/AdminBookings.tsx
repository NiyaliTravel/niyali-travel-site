import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Search, Filter, Calendar, DollarSign, Users, Eye, CheckCircle, XCircle } from 'lucide-react';

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  package_id: string;
  travel_date: string;
  number_of_guests: number;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings.');
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    }
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && bookings.length === 0 && (
        <p className="text-gray-600">No bookings found.</p>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Package</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Guests</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-2">{b.customer_name}</td>
                  <td className="px-4 py-2">{b.customer_email}</td>
                  <td className="px-4 py-2">{b.package_id}</td>
                  <td className="px-4 py-2">{b.travel_date}</td>
                  <td className="px-4 py-2">{b.number_of_guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}