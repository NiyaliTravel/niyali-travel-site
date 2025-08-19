import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Activity, Search, Filter, Navigation } from 'lucide-react';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAtoll, setSelectedAtoll] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Malé',
      atoll: 'Kaafu Atoll',
      description: 'Capital city with vibrant culture and history',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      rating: 4.5,
      activities: 25,
      highlights: ['City Tours', 'Museums', 'Local Markets', 'Restaurants']
    },
    {
      id: 2,
      name: 'Maafushi',
      atoll: 'Kaafu Atoll',
      description: 'Popular local island with beautiful beaches',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      rating: 4.7,
      activities: 30,
      highlights: ['Beach Activities', 'Water Sports', 'Sandbank Trips', 'Snorkeling']
    },
    {
      id: 3,
      name: 'Thulusdhoo',
      atoll: 'Kaafu Atoll',
      description: 'Surfers paradise with world-class waves',
      image: 'https://images.unsplash.com/photo-1583835746434-cf1534674b41?w=800',
      rating: 4.8,
      activities: 20,
      highlights: ['Surfing', 'Coca-Cola Factory', 'Beach BBQ', 'Island Tours']
    },
    {
      id: 4,
      name: 'Dhigurah',
      atoll: 'Alif Dhaal Atoll',
      description: 'Long island famous for whale shark encounters',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800',
      rating: 4.9,
      activities: 18,
      highlights: ['Whale Sharks', 'Long Beach', 'Diving', 'Fishing']
    },
    {
      id: 5,
      name: 'Rasdhoo',
      atoll: 'Alif Alif Atoll',
      description: 'Diving hotspot with hammerhead sharks',
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800',
      rating: 4.6,
      activities: 22,
      highlights: ['Hammerhead Diving', 'Beach Picnics', 'Snorkeling', 'Island Hopping']
    },
    {
      id: 6,
      name: 'Fulidhoo',
      atoll: 'Vaavu Atoll',
      description: 'Peaceful island with pristine beaches',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800',
      rating: 4.7,
      activities: 15,
      highlights: ['Quiet Beaches', 'Traditional Culture', 'Fishing', 'Stargazing']
    }
  ];

  const atolls = ['all', 'Kaafu Atoll', 'Alif Alif Atoll', 'Alif Dhaal Atoll', 'Vaavu Atoll'];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAtoll = selectedAtoll === 'all' || dest.atoll === selectedAtoll;
    return matchesSearch && matchesAtoll;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl opacity-90">Discover the hidden gems of the Maldives</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedAtoll} onValueChange={setSelectedAtoll}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Atoll" />
              </SelectTrigger>
              <SelectContent>
                {atolls.map(atoll => (
                  <SelectItem key={atoll} value={atoll}>
                    {atoll === 'all' ? 'All Atolls' : atoll}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {destination.atoll}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    {destination.rating}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Activity className="h-4 w-4 mr-1" />
                  {destination.activities} activities available
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 3).map(highlight => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                  {destination.highlights.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{destination.highlights.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    Explore
                  </Button>
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No destinations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;