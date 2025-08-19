import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, MapPin } from 'lucide-react';

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: 'Sunset Dolphin Cruise',
      category: 'Marine Life',
      price: 65,
      duration: '3 hours',
      groupSize: '2-20',
      rating: 4.9,
      reviews: 234,
      location: 'Malé Atoll',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      description: 'Watch playful dolphins dance in the golden sunset waters'
    },
    {
      id: 2,
      title: 'Manta Ray Night Dive',
      category: 'Diving',
      price: 120,
      duration: '2 hours',
      groupSize: '2-8',
      rating: 5.0,
      reviews: 189,
      location: 'Ari Atoll',
      image: 'https://images.unsplash.com/photo-1559827083-4061c9caab8f?w=800',
      description: 'Experience the magic of diving with majestic manta rays under the stars'
    },
    {
      id: 3,
      title: 'Island Hopping Adventure',
      category: 'Adventure',
      price: 150,
      duration: 'Full day',
      groupSize: '4-12',
      rating: 4.8,
      reviews: 312,
      location: 'Multiple Atolls',
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800',
      description: 'Explore multiple pristine islands in one unforgettable day'
    },
    {
      id: 4,
      title: 'Traditional Fishing Experience',
      category: 'Culture',
      price: 80,
      duration: '4 hours',
      groupSize: '2-10',
      rating: 4.7,
      reviews: 156,
      location: 'Local Islands',
      image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800',
      description: 'Learn traditional Maldivian fishing techniques from local experts'
    }
  ];

  const categories = ['All', 'Marine Life', 'Diving', 'Adventure', 'Culture', 'Water Sports'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experiences</h1>
          <p className="text-xl opacity-90">Create memories that last a lifetime</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button key={category} variant={category === 'All' ? 'default' : 'outline'}>
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map(experience => (
            <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <Badge className="mb-2 w-fit">{experience.category}</Badge>
                <CardTitle className="text-lg">{experience.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{experience.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {experience.groupSize} people
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {experience.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="font-medium">{experience.rating}</span>
                    <span className="text-gray-500 ml-1">({experience.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">${experience.price}</span>
                    <span className="text-gray-500 text-sm ml-1">per person</span>
                  </div>
                  <Button size="sm">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;