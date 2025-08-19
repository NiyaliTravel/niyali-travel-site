import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">We'd love to hear from you!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="p-6">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl">Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Inquiry about bookings" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Type your message here..." />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+960 777-1234</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@niyalitravel.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">H. Orchid, Ameer Ahmed Magu, Malé, Maldives</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM (GMT+5)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="mb-4">
              <CardTitle className="text-xl">Find us on Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                {/* Placeholder for Google Maps embed */}
                Map Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;