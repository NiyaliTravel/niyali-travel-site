import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, Wifi, Utensils, Waves, Plane } from 'lucide-react';

const Resorts = () => {
  const resorts = [
    {
      id: 1,
      name: 'Paradise Island Resort',
      category: 'Luxury',
      price: 450,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      amenities: ['Private Beach', 'Spa', 'Water Sports', 'Fine Dining']
    },
    {
      id: 2,
      name: 'Coral Bay Resort',
      category: 'Family',
      price: 320,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      amenities: ['Kids Club', 'Pool', 'Snorkeling', 'All-Inclusive']
    },
    {
      id: 3,
      name: 'Azure Waters Villa',
      category: 'Boutique',
      price: 580,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      amenities: ['Overwater Villa', 'Butler Service', 'Private Pool', 'Yacht']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Resorts</h1>
          <p className="text-xl opacity-90">Experience paradise in our handpicked resorts</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resorts.map(resort => (
            <Card key={resort.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{resort.name}</CardTitle>
                  <Badge>{resort.category}</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{resort.rating}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resort.amenities.map(amenity => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">${resort.price}</span>
                    <span className="text-gray-500 text-sm ml-1">per night</span>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resorts;