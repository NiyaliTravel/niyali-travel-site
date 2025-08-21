import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'traveler' | 'agent' | 'admin';
  profilePhoto?: string;
  company?: string;
  country?: string;
  contactNumber?: string;
  whatsappNumber?: string;
  bio?: string;
  languages?: string[];
  preferredAtolls?: string[];
  tierBadge?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<string | null>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('niyali_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with actual API call
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          role: email.includes('agent') ? 'agent' : 'traveler',
          profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          tierBadge: 'Gold Explorer'
        };
        setUser(mockUser);
        localStorage.setItem('niyali_user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: Partial<User> & { email: string; password: string }): Promise<string | null> => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual API call
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email,
        role: userData.role || 'traveler',
        company: userData.company,
        country: userData.country,
        contactNumber: userData.contactNumber,
        whatsappNumber: userData.whatsappNumber,
        bio: userData.bio,
        languages: userData.languages,
        preferredAtolls: userData.preferredAtolls,
        tierBadge: 'New Explorer'
      };
      setUser(newUser);
      localStorage.setItem('niyali_user', JSON.stringify(newUser));
      setIsLoading(false);
      return newUser.id; // Return the user ID
    } catch (error) {
      setIsLoading(false);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('niyali_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};