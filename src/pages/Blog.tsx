import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Calendar, User, BookOpen, Heart, Share2 } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'experiences', label: 'Experiences' },
    { value: 'culture', label: 'Culture' },
    { value: 'marine-life', label: 'Marine Life' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'photography', label: 'Photography' },
    { value: 'travel-tips', label: 'Travel Tips' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Swimming with Manta Rays: A Life-Changing Experience at Hanifaru Bay',
      excerpt: 'Discover the magic of encountering gentle giants in their natural habitat at one of the world\'s most incredible marine sanctuaries.',
      category: 'marine-life',
      author: {
        name: 'Ahmed Hassan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        role: 'Marine Biologist'
      },
      publishedAt: '2025-01-10',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      featured: true,
      tags: ['Manta Rays', 'Baa Atoll', 'UNESCO', 'Snorkeling']
    },
    {
      id: 2,
      title: 'The Art of Traditional Dhoni Building: Preserving Maldivian Heritage',
      excerpt: 'Journey into the ancient craft of dhoni construction and meet the master craftsmen keeping this tradition alive.',
      category: 'culture',
      author: {
        name: 'Fatima Ali',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=50&h=50&fit=crop&crop=face',
        role: 'Cultural Ambassador'
      },
      publishedAt: '2025-01-08',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Traditional Crafts', 'Heritage', 'Local Culture']
    },
    {
      id: 3,
      title: 'Freediving in Paradise: A Beginner\'s Guide to the Maldives',
      excerpt: 'Learn how to explore the underwater world with just one breath and discover the meditative art of freediving.',
      category: 'experiences',
      author: {
        name: 'Marco Silva',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        role: 'Freediving Instructor'
      },
      publishedAt: '2025-01-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Freediving', 'Underwater', 'Adventure', 'Beginner Guide']
    },
    {
      id: 4,
      title: 'Sustainable Tourism: How We\'re Protecting the Maldives for Future Generations',
      excerpt: 'Explore our commitment to sustainable practices and how responsible tourism can preserve this pristine paradise.',
      category: 'sustainability',
      author: {
        name: 'Mohamed',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        role: 'Founder'
      },
      publishedAt: '2025-01-03',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Sustainability', 'Conservation', 'Responsible Travel']
    },
    {
      id: 5,
      title: 'Capturing Paradise: Photography Tips for the Maldives',
      excerpt: 'Master the art of underwater and landscape photography in one of the world\'s most photogenic destinations.',
      category: 'photography',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=50&h=50&fit=crop&crop=face',
        role: 'Travel Photographer'
      },
      publishedAt: '2025-01-01',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Photography', 'Underwater', 'Landscape', 'Tips']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Travel Stories</h1>
            <p className="text-xl text-blue-100">
              Discover authentic experiences, cultural insights, and travel inspiration from the Maldives
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
                placeholder="Search stories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.some(post => post.featured) && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Story</h2>
            {filteredPosts
              .filter(post => post.featured)
              .slice(0, 1)
              .map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge>{post.category}</Badge>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Featured
                        </Badge>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-sm text-gray-600">{post.author.role}</p>
                          </div>
                        </div>
                        
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">Read Full Story</Button>
                    </div>
                  </div>
                </Card>
              ))
            }
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter(post => !post.featured)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{post.author.name}</p>
                          <p className="text-gray-600">{post.author.role}</p>
                        </div>
                      </div>
                      
                      <div className="text-right text-xs text-gray-600">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Inspired</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel stories, experience guides, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-white text-gray-900 border-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;