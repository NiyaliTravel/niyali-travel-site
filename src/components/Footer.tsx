import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-xl">NiyaliTravel</span>
            </div>
            <p className="text-gray-400 text-sm">
              Let the ocean carry your story. Experience authentic Maldivian adventures through our curated travel platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/experiences" className="text-gray-400 hover:text-white transition-colors">Experiences</Link></li>
              <li><Link to="/resorts" className="text-gray-400 hover:text-white transition-colors">Resorts</Link></li>
              <li><Link to="/ferry-schedule" className="text-gray-400 hover:text-white transition-colors">Ferry Schedule</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Travel Stories</Link></li>
            </ul>
          </div>

          {/* For Agents */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/agent-portal" className="text-gray-400 hover:text-white transition-colors">Agent Portal</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Become an Agent</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Commission Structure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketing Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Training Resources</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <p className="text-gray-400 text-sm">
              Get the latest travel stories and exclusive offers delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button>Subscribe</Button>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-400">WhatsApp: +960 9107338</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 NiyaliTravel.com. All rights reserved. Founded by Mohamed.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;