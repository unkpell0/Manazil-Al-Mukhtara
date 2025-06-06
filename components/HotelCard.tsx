import React from 'react';
import { Hotel } from '../types';
import { PRIMARY_ORANGE, PRIMARY_BLUE, LIGHT_ORANGE } from '../constants';
import { InfoIcon, BedIcon, BuildingStorefrontIcon, UsersIcon, SparklesIcon, CheckCircleIcon } from './IconComponents'; // Removed WifiIcon

// Simple WifiIcon for demonstration if not already present
const WifiLocalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.807 9.98-3.807 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.75 20.25h-.008v.008h.008v-.008z" />
  </svg>
);
const CoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5H5.25A2.25 2.25 0 013 17.25V8.25A2.25 2.25 0 015.25 6h9.5A2.25 2.25 0 0117 8.25v1.5M10.5 19.5h2.25m-2.25 0A2.25 2.25 0 0012.75 21.75h2.25M10.5 19.5A2.25 2.25 0 018.25 17.25V15m2.25 4.5V15m0 0a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0116.5 15m-6-9v3.75a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5V6m1.5 0V3.75A1.5 1.5 0 0012.75 2.25H9.75A1.5 1.5 0 008.25 3.75V6m4.5 0H8.25" />
</svg>
);
const ParkingIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v3.75h-.75V6.75zm0 10.5h.75V12h-.75v5.25zm10.5 0h.75V12h-.75v5.25zm0-10.5h.75v3.75h-.75V6.75zM9 6.75h6v10.5H9V6.75zM4.5 19.5a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zm10.5 0a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM2.25 6.75c0-.966.784-1.75 1.75-1.75h15.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0119.5 19.5H4.75A1.75 1.75 0 013 17.25V9M3 9h1.5" />
</svg>

);


interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: (hotelId: string) => void;
  animationDelay?: string;
}

const AmenityChip: React.FC<{icon: React.ReactNode, text: string, colorClass: string}> = ({icon, text, colorClass}) => (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${colorClass} whitespace-nowrap`}>
        {icon}
        {text}
    </span>
);


export const HotelCard: React.FC<HotelCardProps> = ({ hotel, isSelected, onSelect, animationDelay = '0s' }) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 ease-in-out cursor-pointer group
        hover:shadow-2xl hover:transform hover:-translate-y-1.5 
        animate-fadeInUp opacity-0
        ${isSelected ? `border-[${PRIMARY_ORANGE}] ring-4 ring-offset-0 ring-[${LIGHT_ORANGE}]/50 shadow-xl` : `border-gray-200 hover:border-[${PRIMARY_ORANGE}]/50`}
      `}
      style={{ animationDelay }}
      onClick={() => onSelect(hotel.id)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(hotel.id); }}
    >
      <div className="p-5 relative">
        {isSelected && (
          <div className={`absolute top-4 right-4 bg-[${PRIMARY_ORANGE}] text-white p-1.5 rounded-full shadow-md`}>
            <CheckCircleIcon className="w-5 h-5" />
          </div>
        )}
        <h3 className={`text-xl font-semibold text-[${PRIMARY_BLUE}] mb-1 group-hover:text-[${PRIMARY_ORANGE}] transition-colors pr-8`}>{hotel.name}</h3>
        <p className={`text-sm font-medium text-gray-600 mb-3`}>{hotel.city}</p>
        
        <div className="mb-3 space-y-1.5 text-sm text-gray-700">
            <div className="flex items-center">
                <InfoIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>{hotel.locationDescription}</span>
            </div>
            <div className="flex items-center">
                <BedIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>{hotel.beds} Beds, {hotel.rooms} Rooms</span>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
            {hotel.roomService && <AmenityChip icon={<SparklesIcon className="w-3.5 h-3.5 mr-1"/>} text="Room Service" colorClass="bg-green-100 text-green-700" />}
            {hotel.wifi && <AmenityChip icon={<WifiLocalIcon className="w-3.5 h-3.5 mr-1"/>} text="Wi-Fi" colorClass="bg-blue-100 text-blue-700" />}
            {hotel.coffeeShop && <AmenityChip icon={<CoffeeIcon className="w-3.5 h-3.5 mr-1"/>} text="Coffee Shop" colorClass="bg-yellow-100 text-yellow-700" />}
            {typeof hotel.parkingSlots === 'number' && hotel.parkingSlots > 0 && <AmenityChip icon={<ParkingIcon className="w-3.5 h-3.5 mr-1"/>} text={`Parking: ${hotel.parkingSlots}`} colorClass="bg-purple-100 text-purple-700" />}
            {typeof hotel.parkingSlots === 'string' && hotel.parkingSlots !== "No Parking" && <AmenityChip icon={<ParkingIcon className="w-3.5 h-3.5 mr-1"/>} text={`${hotel.parkingSlots}`} colorClass="bg-purple-100 text-purple-700" />}
        </div>
        
      </div>
    </div>
  );
};