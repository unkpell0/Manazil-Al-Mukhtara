
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BookingSelections } from '../types';

const initialSelections: BookingSelections = {
  services: {
    flights: false,
    hotel: false,
    visaBus: false,
  },
  flightDetails: {
    origin: '', 
    destination: '', // Default to empty string, consistent with updated type
    duration: 0,
  },
  selectedHotelId: undefined,
  hotelSearchCriteria: undefined, // Destination within this will be set from LandingPage
  numberOfSeats: 1,
};

interface BookingContextType {
  bookingSelections: BookingSelections;
  setBookingSelections: React.Dispatch<React.SetStateAction<BookingSelections>>;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingSelections, setBookingSelections] = useState<BookingSelections>(initialSelections);
  
  const resetBooking = () => {
    setBookingSelections(initialSelections);
  }

  return (
    <BookingContext.Provider value={{ bookingSelections, setBookingSelections, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};