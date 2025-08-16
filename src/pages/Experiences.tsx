import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, Users, Star, Clock, Search, Filter, Heart } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToBooking } = useBooking();

  const categories = [
    { value: 'all', label: 'All Experiences' },
    { value: 'freediving', label: 'Freediving' },
    { value: 'snorkeling', label: 'Snorkeling' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'photography', label: 'Photography' }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Hanifaru Bay Manta Ray Snorkeling',
      location: 'Baa Atoll',
      category: 'snorkeling',
      price: 180,
      duration: '4 hours',
      groupSize: '8 people max',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      description: 'Swim alongside majestic manta rays in the UNESCO Biosphere Reserve during the peak season.',
      highlights: ['UNESCO Site', 'Manta Rays', 'Marine Biologist Guide'],
      difficulty: 'Beginner',
      includes: ['Equipment', 'Lunch', 'Transportation']
    },
    {
      id: 2,
      title: 'Freediving with Whale Sharks',
      location: 'South Ari Atoll',
      category: 'freediving',
      price: 250,
      duration: '6 hours',
      groupSize: '4 people max',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      description: 'An unforgettable freediving experience with gentle whale sharks in crystal-clear waters.',
      highlights: ['Whale Sharks', 'Professional Instructor', 'Small Group'],
      difficulty: 'Intermediate',
      includes: ['Equipment', 'Instructor', 'Certification']
    },
    {
      id: 3,
      title: 'Local Island Cultural Immersion',
      location: 'South Malé Atoll',
      category: 'cultural',
      price: 120,
      duration: '8 hours',
      groupSize: '12 people max',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      description: 'Experience authentic Maldivian culture, traditional crafts, and local cuisine.',
      highlights: ['Traditional Crafts', 'Local Cuisine', 'Cultural Exchange'],
      difficulty: 'Easy',
      includes: ['Local Guide', 'Lunch', 'Craft Workshop']
    },
    {
      id: 4,
      title: 'Sunset Dolphin Cruise',
      location: 'North Malé Atoll',
      category: 'adventure',
      price: 95,
      duration: '3 hours',
      groupSize: '20 people max',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      description: 'Watch playful dolphins against the backdrop of a stunning Maldivian sunset.',
      highlights: ['Dolphin Watching', 'Sunset Views', 'Photography'],
      difficulty: 'Easy',
      includes: ['Refreshments', 'Photography Guide', 'Boat Transfer']
    },
    {
      id: 5,
      title: 'Underwater Photography Workshop',
      location: 'Baa Atoll',
      category: 'photography',
      price: 320,
      duration: '2 days',
      groupSize: '6 people max',
      rating: 4.9,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      description: 'Master underwater photography with professional guidance in pristine reefs.',
      highlights: ['Professional Instructor', 'Equipment Provided', 'Portfolio Review'],
      difficulty: 'Intermediate',
      includes: ['Camera Equipment', 'Editing Session', 'Prints']
    },
    {
      id: 6,
      title: 'Traditional Dhoni Building Experience',
      location: 'Addu Atoll',
      category: 'cultural',
      price: 85,
      duration: '5 hours',
      groupSize: '8 people max',
      rating: 4.6,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      description: 'Learn the ancient art of dhoni construction from master craftsmen.',
      highlights: ['Traditional Crafts', 'Master Craftsman', 'Hands-on Experience'],
      difficulty: 'Easy',
      includes: ['Materials', 'Tools', 'Certificate']
    }
  ];

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleBookExperience = (experience: typeof experiences[0]) => {
    addToBooking({
      id: experience.id.toString(),
      type: 'experience',
      name: experience.title,
      price: experience.price,
      dates: {
        checkin: new Date(),
        checkout: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      guests: 2,
      image: experience.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Authentic Experiences</h1>
            <p className="text-xl text-blue-100">
              From freediving with manta rays to cultural immersions, discover the soul of the Maldives
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
                placeholder="Search experiences..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
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
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                    {experience.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{experience.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {experience.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">${experience.price}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {experience.rating} ({experience.reviews})
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {experience.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {experience.groupSize}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {experience.highlights.slice(0, 2).map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBookExperience(experience)}
                    >
                      Book Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experiences;