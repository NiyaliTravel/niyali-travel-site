import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Users, Star, Play, ArrowRight, Waves, Compass, Heart, Coffee } from 'lucide-react';
import { format } from 'date-fns';

const Home = () => {
  const [searchDates, setSearchDates] = useState<{
    checkin?: Date;
    checkout?: Date;
  }>({});
  const [guests, setGuests] = useState('2');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
      title: 'Let the Ocean Carry Your Story',
      subtitle: 'Discover authentic Maldivian experiences through crystal-clear waters and pristine islands',
      mood: 'Adventure'
    },
    {
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop',
      title: 'Where Dreams Meet Reality',
      subtitle: 'Luxury resorts, cultural immersions, and unforgettable freediving adventures await',
      mood: 'Luxury'
    },
    {
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
      title: 'Connect with Local Stories',
      subtitle: 'Our expert agents craft personalized experiences that capture the soul of the Maldives',
      mood: 'Cultural'
    }
  ];

  const moods = [
    { icon: Waves, title: 'Peaceful Escape', description: 'Serene waters and quiet islands', color: 'blue' },
    { icon: Compass, title: 'Adventure Seeker', description: 'Freediving and exploration', color: 'orange' },
    { icon: Heart, title: 'Romantic Getaway', description: 'Sunset dinners and private beaches', color: 'pink' },
    { icon: Coffee, title: 'Cultural Journey', description: 'Local traditions and island life', color: 'green' }
  ];

  const featuredExperiences = [
    {
      id: 1,
      title: 'Hanifaru Bay Snorkeling',
      location: 'Baa Atoll',
      price: '$180',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      duration: 'Half Day',
      groupSize: '8 people max'
    },
    {
      id: 2,
      title: 'Freediving with Mantas',
      location: 'Baa Atoll',
      price: '$250',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      duration: 'Full Day',
      groupSize: '4 people max'
    },
    {
      id: 3,
      title: 'Local Island Hopping',
      location: 'South Malé Atoll',
      price: '$120',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      duration: 'Full Day',
      groupSize: '12 people max'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'NiyaliTravel transformed our honeymoon into an unforgettable adventure. Our agent Ahmed knew exactly what we needed.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Marco Silva',
      location: 'São Paulo, Brazil',
      text: 'The freediving experience was beyond my wildest dreams. The local guides were incredible professionals.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl space-y-6">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  {slide.mood} Mode
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Explore Experiences
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white relative -mt-20 z-30">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose atoll" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baa">Baa Atoll</SelectItem>
                    <SelectItem value="male">North Malé Atoll</SelectItem>
                    <SelectItem value="south-male">South Malé Atoll</SelectItem>
                    <SelectItem value="ari">Ari Atoll</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchDates.checkin ? format(searchDates.checkin, 'MMM dd') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchDates.checkin}
                      onSelect={(date) => setSearchDates(prev => ({ ...prev, checkin: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchDates.checkout ? format(searchDates.checkout, 'MMM dd') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchDates.checkout}
                      onSelect={(date) => setSearchDates(prev => ({ ...prev, checkout: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5+">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" size="lg">
              Search Experiences
            </Button>
          </div>
        </div>
      </section>

      {/* Mood Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Mood</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tell us how you're feeling, and we'll craft the perfect Maldivian experience for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moods.map((mood, index) => {
              const IconComponent = mood.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{mood.title}</CardTitle>
                    <CardDescription>{mood.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Experiences</h2>
              <p className="text-gray-600">Handpicked adventures by our local experts</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/experiences">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-black">
                    {experience.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{experience.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {experience.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{experience.price}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {experience.rating}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    {experience.groupSize}
                  </div>
                  <Button className="w-full">Book Experience</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stories from Our Travelers</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Real experiences from real people who discovered the magic of the Maldives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-blue-100 text-sm">{testimonial.location}</div>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-50 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our local agents and start crafting your perfect Maldivian adventure today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Find an Agent
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Become an Agent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;