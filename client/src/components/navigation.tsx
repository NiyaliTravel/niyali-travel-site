import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import SocialLinks from "./social-links";
import NiyaliLogo from "@assets/Niyali Main Logo_1755576205013.jpg";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/guest-houses", label: "Guest Houses" },
    { href: "/ferry-schedule", label: "Ferry" },
    { href: "/domestic-airlines", label: "Airlines" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <img 
              src={NiyaliLogo} 
              alt="Niyali Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-niyali-navy">NIYALI</span>
              <span className="text-xs text-gray-600 -mt-1">Transcend the travel</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-niyali-navy transition-colors ${
                  location === item.href ? 'text-niyali-navy font-medium' : ''
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/agent-login"
              className="bg-niyali-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              data-testid="nav-agent-portal"
            >
              Agent Portal
            </Link>
            <Link 
              href="/traveler-portal"
              className="border-2 border-niyali-navy text-niyali-navy px-4 py-2 rounded-lg hover:bg-niyali-navy hover:text-white transition-all"
              data-testid="nav-traveler-portal"
            >
              My Trips
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                data-testid="mobile-menu-trigger"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={NiyaliLogo} 
                    alt="Niyali Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-niyali-navy">NIYALI</span>
                    <span className="text-xs text-gray-600 -mt-1">Transcend the travel</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg text-gray-700 hover:text-niyali-navy transition-colors ${
                        location === item.href ? 'text-niyali-navy font-medium' : ''
                      }`}
                      data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                <div className="flex flex-col space-y-3 pt-6 border-t">
                  <Link 
                    href="/agent-login"
                    onClick={() => setIsOpen(false)}
                    className="bg-niyali-gradient text-white px-6 py-3 rounded-lg text-center hover:opacity-90 transition-opacity"
                    data-testid="mobile-nav-agent-portal"
                  >
                    Agent Portal
                  </Link>
                  <Link 
                    href="/traveler-portal"
                    onClick={() => setIsOpen(false)}
                    className="border-2 border-niyali-navy text-niyali-navy px-6 py-3 rounded-lg text-center hover:bg-niyali-navy hover:text-white transition-all"
                    data-testid="mobile-nav-traveler-portal"
                  >
                    My Trips
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
