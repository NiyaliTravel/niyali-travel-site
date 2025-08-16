import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Users, Globe, Award, Target, Eye, Compass } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'We believe in genuine connections between travelers and local communities, creating meaningful experiences that respect Maldivian culture.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Our platform empowers local agents and guides, ensuring that tourism benefits the communities we visit.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to protecting the pristine environment of the Maldives for future generations.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Every experience is carefully curated to meet the highest standards of quality and safety.'
    }
  ];

  const team = [
    {
      name: 'Mohamed',
      role: 'Founder & Creative Director',
      bio: 'Born and raised in the Maldives, Mohamed founded NiyaliTravel to share the authentic beauty of his homeland with the world.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialties: ['Cultural Experiences', 'Sustainable Tourism', 'Local Partnerships']
    },
    {
      name: 'Ahmed Hassan',
      role: 'Lead Experience Curator',
      bio: 'With over 10 years in Maldivian tourism, Ahmed specializes in marine experiences and freediving adventures.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      specialties: ['Marine Life', 'Freediving', 'Photography Tours']
    },
    {
      name: 'Fatima Ali',
      role: 'Cultural Ambassador',
      bio: 'Fatima connects travelers with authentic Maldivian culture through immersive local island experiences.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=150&h=150&fit=crop&crop=face',
      specialties: ['Local Culture', 'Traditional Crafts', 'Island Communities']
    }
  ];

  const milestones = [
    { year: '2020', title: 'Foundation', description: 'NiyaliTravel was founded with a vision to showcase authentic Maldivian experiences' },
    { year: '2021', title: 'Local Partnerships', description: 'Established partnerships with local communities across 12 atolls' },
    { year: '2022', title: 'Sustainable Focus', description: 'Launched our sustainability initiative to protect marine ecosystems' },
    { year: '2023', title: 'Agent Network', description: 'Built a network of 50+ certified local agents and guides' },
    { year: '2024', title: 'Digital Platform', description: 'Launched our comprehensive digital platform connecting travelers and agents' },
    { year: '2025', title: 'Global Recognition', description: 'Recognition as a leading sustainable tourism platform in the Maldives' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              Born from a passion to share the authentic soul of the Maldives with the world
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    To create authentic, meaningful connections between travelers and the Maldivian islands, 
                    fostering cultural exchange while supporting local communities.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <Eye className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    We envision a future where sustainable tourism preserves the natural beauty and cultural 
                    heritage of the Maldives for generations to come.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <Compass className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    Every journey should be transformative - not just for the traveler, but for the communities 
                    and environments they encounter.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
                alt="Maldivian waters"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every experience we create and every partnership we build
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate locals dedicated to sharing the authentic beauty of the Maldives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-gradient-to-b from-blue-100 to-blue-200">
                  <Avatar className="w-32 h-32 absolute bottom-4 left-1/2 transform -translate-x-1/2 border-4 border-white">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a local vision to a platform connecting travelers with authentic Maldivian experiences
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <Badge className="bg-blue-600 text-white">{milestone.year}</Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a traveler seeking authentic experiences or a local guide ready to share your island, 
            we invite you to be part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Journey
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

export default About;