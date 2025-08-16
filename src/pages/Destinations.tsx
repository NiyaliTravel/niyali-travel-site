import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, Clock, Search } from 'lucide-react';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAtoll, setSelectedAtoll] = useState('all');

  const atolls = [
    {
      id: 1,
      name: 'Baa Atoll',
      description: 'UNESCO Biosphere Reserve with manta rays and whale sharks',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      experiences: 12,
      resorts: 8,
      highlights: ['Hanifaru Bay', 'Manta Point', 'UNESCO Site'],
      bestFor: 'Marine Life'
    },
    {
      id: 2,
      name: 'North Malé Atoll',
      description: 'Home to the capital and world-class resorts',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      experiences: 18,
      resorts: 15,
      highlights: ['Malé City', 'Airport Proximity', 'Luxury Resorts'],
      bestFor: 'Convenience'
    },
    {
      id: 3,
      name: 'South Malé Atoll',
      description: 'Perfect for island hopping and cultural experiences',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
      experiences: 15,
      resorts: 12,
      highlights: ['Local Islands', 'Cultural Tours', 'Traditional Crafts'],
      bestFor: 'Culture'
    },
    {
      id: 4,
      name: 'Ari Atoll',
      description: 'Renowned for whale shark encounters and pristine reefs',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      experiences: 14,
      resorts: 10,
      highlights: ['Whale Sharks', 'Diving Sites', 'Marine Protected Areas'],
      bestFor: 'Diving'
    },
    {
      id: 5,
      name: 'Lhaviyani Atoll',
      description: 'Untouched beauty with excellent snorkeling spots',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      experiences: 8,
      resorts: 6,
      highlights: ['Pristine Reefs', 'Kuredu Express', 'Shipwreck Diving'],
      bestFor: 'Adventure'
    },
    {
      id: 6,
      name: 'Addu Atoll',
      description: 'Southern charm with unique geography and history',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
      experiences: 10,
      resorts: 4,
      highlights: ['British History', 'Nature Parks', 'Cycling Tours'],
      bestFor: 'History'
    }
  ];

  const filteredAtolls = atolls.filter(atoll => {
    const matchesSearch = atoll.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atoll.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedAtoll === 'all' || atoll.bestFor.toLowerCase() === selectedAtoll;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Explore 26 Atolls</h1>
            <p className="text-xl text-blue-100">
              Discover the unique character of each atoll, from UNESCO biosphere reserves to cultural heartlands
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search atolls..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedAtoll} onValueChange={setSelectedAtoll}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Atolls</SelectItem>
                <SelectItem value="marine life">Marine Life</SelectItem>
                <SelectItem value="convenience">Convenience</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="diving">Diving</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Atolls Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAtolls.map((atoll) => (
              <Card key={atoll.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={atoll.image} 
                    alt={atoll.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                    {atoll.bestFor}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    {atoll.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {atoll.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {atoll.experiences} Experiences
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {atoll.resorts} Resorts
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Top Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {atoll.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Explore {atoll.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Atoll Map</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the geographical layout of the Maldives and plan your island-hopping adventure
            </p>
          </div>
          
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-8 text-center">
            <div className="w-full h-96 bg-blue-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Interactive Map Coming Soon</h3>
                <p className="text-blue-600">
                  Explore all 26 atolls with our upcoming interactive map feature
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planning Your Atoll Adventure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert tips for choosing the perfect atolls for your Maldivian journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Best Time to Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  November to April offers the best weather conditions. Each atoll has unique seasonal highlights for marine life encounters.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Seaplanes, speedboats, and domestic flights connect the atolls. Distance from Malé affects transfer costs and time.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Local Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with our verified local agents who know each atoll intimately and can craft personalized itineraries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;