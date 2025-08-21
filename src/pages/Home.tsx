import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Ship,
  Palmtree,
  Fish,
  Waves,
  Sun,
  Heart,
  ArrowRight,
  Star,
  TrendingUp,
  Gift,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moods = [
    { id: 'adventure', label: 'Adventure', icon: Fish, color: 'bg-blue-500' },
    { id: 'relaxation', label: 'Relaxation', icon: Palmtree, color: 'bg-green-500' },
    { id: 'romance', label: 'Romance', icon: Heart, color: 'bg-pink-500' },
    { id: 'family', label: 'Family Fun', icon: Users, color: 'bg-yellow-500' },
    { id: 'luxury', label: 'Luxury', icon: Sparkles, color: 'bg-purple-500' },
    { id: 'diving', label: 'Diving', icon: Waves, color: 'bg-cyan-500' }
  ];

  const featuredDestinations = [
    {
      id: 1,
      name: 'Malé Atoll',
      description: 'The vibrant capital region',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      rating: 4.8,
      activities: 23
    },
    {
      id: 2,
      name: 'Ari Atoll',
      description: 'Paradise for divers and snorkelers',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      rating: 4.9,
      activities: 31
    },
    {
      id: 3,
      name: 'Baa Atoll',
      description: 'UNESCO Biosphere Reserve',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800',
      rating: 4.9,
      activities: 28
    }
  ];

  const popularExperiences = [
    {
      id: 1,
      title: 'Sunset Dolphin Cruise',
      price: '$65',
      duration: '3 hours',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    },
    {
      id: 2,
      title: 'Manta Ray Night Dive',
      price: '$120',
      duration: '2 hours',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1559827083-4061c9caab8f?w=800'
    },
    {
      id: 3,
      title: 'Island Hopping Adventure',
      price: '$150',
      duration: 'Full day',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800'
    },
    {
      id: 4,
      title: 'Traditional Fishing Experience',
      price: '$80',
      duration: '4 hours',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Let the Ocean Carry Your Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience the authentic beauty of the Maldives through cinematic travel experiences
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Search destinations, resorts, or experiences..."
                  className="pl-10 h-12 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8"
                onClick={() => navigate('/destinations')}
              >
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Selector */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Your Travel Mood?</h2>
            <p className="text-lg text-gray-600">Choose your vibe and we'll curate the perfect experience</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <Card
                  key={mood.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedMood === mood.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${mood.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-medium">{mood.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Destinations</h2>
              <p className="text-gray-600">Discover the most beautiful atolls in the Maldives</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/destinations')}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      {destination.rating}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{destination.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.activities} activities available
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Experiences</h2>
              <p className="text-gray-600">Handpicked activities for unforgettable memories</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/experiences')}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{experience.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary">{experience.price}</span>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {experience.duration}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {experience.rating} rating
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Maldivian Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of travelers who've discovered paradise</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              <Gift className="mr-2 h-5 w-5" />
              Get Started with Rewards
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Contact an Agent
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-gray-600">Islands to Explore</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Experiences Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600">Expert Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;