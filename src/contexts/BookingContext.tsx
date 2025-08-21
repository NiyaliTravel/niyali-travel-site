import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingItem {
  id: string;
  type: 'resort' | 'experience' | 'ferry';
  name: string;
  price: number;
  dates: {
    checkin: Date;
    checkout: Date;
  };
  guests: number;
  image: string;
}

interface BookingContextType {
  bookingItems: BookingItem[];
  addToBooking: (item: BookingItem) => void;
  removeFromBooking: (id: string) => void;
  clearBooking: () => void;
  totalPrice: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);

  const addToBooking = (item: BookingItem) => {
    setBookingItems(prev => [...prev, item]);
  };

  const removeFromBooking = (id: string) => {
    setBookingItems(prev => prev.filter(item => item.id !== id));
  };

  const clearBooking = () => {
    setBookingItems([]);
  };

  const totalPrice = bookingItems.reduce((total, item) => total + item.price, 0);

  const value: BookingContextType = {
    bookingItems,
    addToBooking,
    removeFromBooking,
    clearBooking,
    totalPrice
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};