import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, Users, Star, Wifi, Coffee, Car, Plane, Search, Filter, Heart, Waves } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const Resorts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAtoll, setSelectedAtoll] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([200, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToBooking } = useBooking();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'boutique', label: 'Boutique' },
    { value: 'family', label: 'Family-Friendly' },
    { value: 'adults-only', label: 'Adults Only' },
    { value: 'eco', label: 'Eco Resort' }
  ];

  const atolls = [
    { value: 'all', label: 'All Atolls' },
    { value: 'baa', label: 'Baa Atoll' },
    { value: 'male', label: 'North Malé Atoll' },
    { value: 'south-male', label: 'South Malé Atoll' },
    { value: 'ari', label: 'Ari Atoll' },
    { value: 'lhaviyani', label: 'Lhaviyani Atoll' }
  ];

  const resorts = [
    {
      id: 1,
      name: 'Soneva Fushi',
      location: 'Baa Atoll',
      category: 'luxury',
      price: 1200,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
      description: 'Barefoot luxury in pristine UNESCO Biosphere Reserve with world-class sustainability.',
      amenities: ['Private Beach', 'Spa', 'Multiple Restaurants', 'Water Sports', 'Kids Club'],
      transferType: 'Seaplane',
      transferTime: '40 min',
      highlights: ['UNESCO Site', 'Eco-Luxury', 'Observatory'],
      roomTypes: ['Beach Villa', 'Water Villa', 'Crusoe Villa']
    },
    {
      id: 2,
      name: 'Conrad Maldives Rangali Island',
      location: 'South Ari Atoll',
      category: 'luxury',
      price: 800,
      rating: 4.8,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      description: 'Iconic underwater restaurant and luxury overwater villas in pristine waters.',
      amenities: ['Underwater Restaurant', 'Spa', 'Twin Islands', 'Water Sports', 'Dolphin Watching'],
      transferType: 'Seaplane',
      transferTime: '30 min',
      highlights: ['Ithaa Restaurant', 'Twin Islands', 'Whale Sharks'],
      roomTypes: ['Beach Villa', 'Water Villa', 'Sunset Villa']
    },
    {
      id: 3,
      name: 'Kurumba Maldives',
      location: 'North Malé Atoll',
      category: 'family',
      price: 400,
      rating: 4.6,
      reviews: 789,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=300&fit=crop',
      description: 'First resort in Maldives offering convenient access with family-friendly facilities.',
      amenities: ['Kids Club', 'Multiple Restaurants', 'Spa', 'Water Sports', 'Cultural Activities'],
      transferType: 'Speedboat',
      transferTime: '10 min',
      highlights: ['First Resort', 'Family Friendly', 'Cultural Shows'],
      roomTypes: ['Beach Villa', 'Superior Room', 'Deluxe Bungalow']
    },
    {
      id: 4,
      name: 'Amilla Fushi',
      location: 'Baa Atoll',
      category: 'boutique',
      price: 900,
      rating: 4.7,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
      description: 'Contemporary design meets Maldivian charm in UNESCO Biosphere Reserve.',
      amenities: ['Multiple Pools', 'Spa', 'Tree House Dining', 'Water Sports', 'Tennis Court'],
      transferType: 'Seaplane',
      transferTime: '35 min',
      highlights: ['Tree House Dining', 'Design-Forward', 'Wellness Focus'],
      roomTypes: ['Beach House', 'Overwater Villa', 'Tree House']
    },
    {
      id: 5,
      name: 'Kandima Maldives',
      location: 'Dhaalu Atoll',
      category: 'family',
      price: 350,
      rating: 4.5,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      description: 'Vibrant lifestyle resort with activities for all ages and colorful design.',
      amenities: ['Kids Club', 'Teens Club', 'Fitness Center', 'Multiple Restaurants', 'Art Studio'],
      transferType: 'Domestic Flight + Speedboat',
      transferTime: '75 min',
      highlights: ['Lifestyle Resort', 'Art Focus', 'All Ages'],
      roomTypes: ['Beach Villa', 'Aqua Villa', 'Sky Suite']
    },
    {
      id: 6,
      name: 'Milaidhoo Island',
      location: 'Baa Atoll',
      category: 'adults-only',
      price: 1100,
      rating: 4.9,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=300&fit=crop',
      description: 'Intimate boutique resort for adults only in UNESCO Biosphere Reserve.',
      amenities: ['Adults Only', 'Spa', 'Fine Dining', 'Butler Service', 'House Reef'],
      transferType: 'Seaplane',
      transferTime: '35 min',
      highlights: ['Adults Only', 'Boutique', 'Authentic Maldivian'],
      roomTypes: ['Beach Pool Villa', 'Ocean Residence', 'Water Pool Villa']
    }
  ];

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resort.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAtoll = selectedAtoll === 'all' || resort.location.toLowerCase().includes(selectedAtoll);
    const matchesCategory = selectedCategory === 'all' || resort.category === selectedCategory;
    const matchesPrice = resort.price >= priceRange[0] && resort.price <= priceRange[1];
    return matchesSearch && matchesAtoll && matchesCategory && matchesPrice;
  });

  const handleBookResort = (resort: typeof resorts[0]) => {
    addToBooking({
      id: resort.id.toString(),
      type: 'resort',
      name: resort.name,
      price: resort.price,
      dates: {
        checkin: new Date(),
        checkout: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      guests: 2,
      image: resort.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Luxury Resorts</h1>
            <p className="text-xl text-blue-100">
              From overwater villas to beachfront suites, discover your perfect Maldivian sanctuary
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resorts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedAtoll} onValueChange={setSelectedAtoll}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Atoll" />
              </SelectTrigger>
              <SelectContent>
                {atolls.map((atoll) => (
                  <SelectItem key={atoll.value} value={atoll.value}>
                    {atoll.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full lg:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range per night: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={200}
                    step={50}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resorts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredResorts.map((resort) => (
              <Card key={resort.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    <img 
                      src={resort.image} 
                      alt={resort.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                      {resort.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="md:w-1/2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{resort.name}</h3>
                        <p className="text-gray-600 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {resort.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl">${resort.price}</div>
                        <div className="text-sm text-gray-600">per night</div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {resort.rating} ({resort.reviews})
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {resort.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Plane className="h-4 w-4 mr-2" />
                        {resort.transferType} • {resort.transferTime}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resort.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        {resort.amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="flex items-center">
                            <Waves className="h-3 w-3 mr-1" />
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleBookResort(resort)}
                        >
                          Book Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resorts;