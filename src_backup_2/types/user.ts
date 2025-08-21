export interface User {
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