import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="text-center space-y-6">
        <Frown className="mx-auto h-24 w-24 text-primary" />
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <Button asChild size="lg">
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
