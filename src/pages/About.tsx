import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About NiyaliTravel</h1>
          <p className="text-xl opacity-90">Your gateway to authentic Maldivian experiences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-600">
            NiyaliTravel was born from a passion for sharing the untold beauty of the Maldives. 
            We connect travelers with authentic experiences, local communities, and pristine nature.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Local experts with deep knowledge</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600">Make Maldives accessible to everyone</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Sustainability</h3>
              <p className="text-sm text-gray-600">Protecting paradise for generations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Award-winning service quality</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg">Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default About;