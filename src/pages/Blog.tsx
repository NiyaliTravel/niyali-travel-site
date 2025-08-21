import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Hidden Beaches in the Maldives',
      excerpt: 'Discover secret paradises away from the crowds...',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min',
      category: 'Travel Guide',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    },
    {
      id: 2,
      title: 'Best Time to Visit the Maldives',
      excerpt: 'Planning your trip? Here\'s everything about seasons...',
      author: 'Mike Chen',
      date: '2024-01-10',
      readTime: '3 min',
      category: 'Tips',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800'
    },
    {
      id: 3,
      title: 'Maldivian Cuisine: A Food Lover\'s Guide',
      excerpt: 'Explore the rich flavors of traditional Maldivian dishes...',
      author: 'Emma Wilson',
      date: '2024-01-05',
      readTime: '7 min',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl opacity-90">Stories, tips, and insights from the Maldives</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <Badge className="mb-2 w-fit">{post.category}</Badge>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <Button variant="link" className="p-0">
                  Read More <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;