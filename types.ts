
import React from 'react';

export interface Hotel {
  id: string;
  name: string;
  city: 'Al Madinah' | 'Makkah' | 'Jeddah';
  imageUrl: string;
  restaurants: number | string;
  elevators: number;
  beds: number;
  rooms: number;
  roomService: boolean;
  coffeeShop: boolean;
  wifi: boolean;
  parkingSlots: number | string;
  locationDescription: string;
}

export type HotelDestinationOptionType = 'Makkah' | 'Al Madinah' | 'Jeddah' | '';

export interface BookingSelections {
  services: {
    flights: boolean;
    hotel: boolean;
    visaBus: boolean;
  };
  flightDetails?: {
    origin: 'CGK' | 'SBY' | 'JED' | 'MED' | ''; 
    destination?: 'JED' | 'MED' | 'CGK' | 'SBY' | ''; // Updated type
    duration: 9 | 12 | 0;
  };
  selectedHotelId?: string;
  hotelSearchCriteria?: { 
    destination: HotelDestinationOptionType; // Updated type
    checkIn: string; 
    duration: number; 
  };
  numberOfSeats: number;
}

export interface ServiceOption {
  id: keyof BookingSelections['services'];
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}