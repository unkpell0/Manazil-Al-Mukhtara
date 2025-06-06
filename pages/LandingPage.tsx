
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Button } from '../components/Button';
import { useBooking } from '../contexts/BookingContext';
import { APP_ROUTES, PRIMARY_ORANGE, PRIMARY_BLUE, TEXT_LIGHT, BACKGROUND_COLOR, LIGHT_ORANGE, HOTELS_DATA } from '../constants';
import {
  PlaneIcon, HotelIcon, SearchIcon, CalendarIcon, LocationPinIcon, UsersGroupIcon,
  BriefcaseIcon, ChevronDownIcon, SparklesIcon, TicketIcon, BuildingOfficeIcon, TagIcon,
  ChatBubbleLeftRightIcon, LifebuoyIcon, BuildingStorefrontIcon, UserIcon, EllipsisVerticalIcon, ChevronRightIcon,
  PhoneIcon, MailIcon, BusIcon, TrainIcon, VisaIcon
} from '../components/IconComponents';
import { LogoIcon } from '../components/LogoIcon';
import { AuthModal } from '../components/AuthModal'; 
import { BookingSelections, HotelDestinationOptionType } from '../types';

// --- Reusable Input Component for Search Widget ---
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: string;
  as?: 'input' | 'select';
  children?: React.ReactNode; // For select options
}

const SearchInput: React.FC<SearchInputProps> = ({
    icon,
    label,
    as = 'input',
    children,
    className: inputFieldClassName,
    value,
    onChange,
    ...otherNativeProps
}) => {
    const baseInputStyle = `w-full py-3 ${icon ? 'pl-11' : 'pl-4'} pr-4 border border-white/30 bg-white/10 text-white rounded-md focus:ring-2 focus:ring-[${LIGHT_ORANGE}] focus:border-[${LIGHT_ORANGE}] focus:bg-white/20 text-sm placeholder-gray-300/70 transition-all duration-200 ease-in-out shadow-sm hover:border-white/50`;
    const finalInputClassName = `${baseInputStyle} ${inputFieldClassName || ''}`;

    const baseSelectStyle = `w-full py-3 ${icon ? 'pl-11' : 'pl-4'} pr-10 border border-white/30 bg-white/10 text-gray-200 rounded-md focus:ring-2 focus:ring-[${LIGHT_ORANGE}] focus:border-[${LIGHT_ORANGE}] focus:bg-white/20 text-sm appearance-none transition-all duration-200 ease-in-out shadow-sm hover:border-white/50`;
    const finalSelectClassName = `${baseSelectStyle} ${inputFieldClassName || ''}`;

    return (
        <div className="flex-1 min-w-[150px] sm:min-w-[120px] md:min-w-[150px]">
            <label className="text-xs text-gray-100/90 block mb-1.5 font-medium">{label}</label>
            <div className="relative">
                {icon && React.cloneElement(icon, { className: "absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" })}
                {as === 'input' && (
                    <input
                        {...(otherNativeProps as React.InputHTMLAttributes<HTMLInputElement>)}
                        value={value}
                        onChange={onChange}
                        className={finalInputClassName}
                    />
                )}
                {as === 'select' && (
                    <>
                        <select
                            {...(otherNativeProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
                            value={value}
                            onChange={onChange}
                            className={finalSelectClassName}
                        >
                            {children}
                        </select>
                        <ChevronDownIcon className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300/70 pointer-events-none" />
                    </>
                )}
            </div>
        </div>
    );
};


// --- Landing Page Header ---
interface LandingHeaderProps {
  onAuthClick: () => void;
}
const LandingHeader: React.FC<LandingHeaderProps> = ({ onAuthClick }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);


  const mainNavLinks = [
    { name: 'Hotels', href: '#' },
    { name: 'Flights', href: '#' },
    { name: 'Umrah Packages', href: '#' },
    { name: 'Hajj Packages', href: '#' },
  ];

  const moreNavLinks = [
    { name: 'Travel Guides', href: '#' },
    { name: 'Customer Support', href: '#' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    if (isMoreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMoreMenuOpen]);


  return (
    <header className={`bg-white shadow-lg sticky top-0 z-[100] border-b-2 border-[${PRIMARY_ORANGE}] transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={APP_ROUTES.LANDING} className="flex items-center group" aria-label="Go to homepage">
            <LogoIcon className="h-9 w-auto mr-2.5 transition-transform duration-300 ease-out group-hover:scale-105" />
            <h1 className={`text-xl font-bold text-[${PRIMARY_BLUE}] group-hover:text-[${PRIMARY_ORANGE}] transition-colors duration-300 whitespace-nowrap`}>Manazil Al-Mukhtara</h1>
          </Link>

          {/* Desktop Navigation (visible lg and up) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {mainNavLinks.map(item => (
              <a key={item.name} href={item.href} className={`text-gray-700 hover:text-[${PRIMARY_ORANGE}] transition-colors duration-200 text-[15px] font-medium group relative py-1`}>
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[${PRIMARY_ORANGE}] transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
            <div className="relative">
              <button
                ref={moreButtonRef}
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`text-gray-700 hover:text-[${PRIMARY_ORANGE}] transition-colors duration-200 text-[15px] font-medium flex items-center group relative py-1 focus:outline-none`}
                aria-expanded={isMoreMenuOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDownIcon className={`w-4 h-4 ml-1 group-hover:text-[${PRIMARY_ORANGE}] transition-transform duration-200 ${isMoreMenuOpen ? 'transform rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[${PRIMARY_ORANGE}] transition-all duration-300 group-hover:w-full ${isMoreMenuOpen ? 'w-full' : ''}`}></span>
              </button>
              {isMoreMenuOpen && (
                <div ref={moreMenuRef} className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-md shadow-xl z-50 ring-1 ring-black ring-opacity-5 focus:outline-none animate-fadeInDown opacity-0" style={{animationDuration: '0.2s'}}>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {moreNavLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                        role="menuitem"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side container for Auth buttons and Mobile menu toggle */}
          <div className="flex items-center space-x-2.5">
            {/* Desktop Auth Buttons (visible lg and up) */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <Button variant="ghost" size="sm" onClick={onAuthClick} className={`hover:shadow-md !px-3.5 !py-1.5 border-[${PRIMARY_BLUE}] text-[${PRIMARY_BLUE}] hover:bg-blue-50`}>
                Log In
              </Button>
              <Button variant="primary" size="sm" onClick={onAuthClick} className="hover:shadow-lg hover:brightness-105 !px-3.5 !py-1.5">
                Register
              </Button>
            </div>

            {/* Mobile Auth Buttons and Triple Dot (visible below lg) */}
            <div className="flex lg:hidden items-center space-x-2.5">
              <Button variant="ghost" size="sm" onClick={onAuthClick} className={`hover:shadow-md !px-3.5 !py-1.5 border-[${PRIMARY_BLUE}] text-[${PRIMARY_BLUE}] hover:bg-blue-50`}>
                Log In
              </Button>
              <Button variant="primary" size="sm" onClick={onAuthClick} className="hover:shadow-lg hover:brightness-105 !px-3.5 !py-1.5">
                Register
              </Button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen} className="p-1">
                <EllipsisVerticalIcon className="w-7 h-7 text-gray-600 hover:text-[${PRIMARY_ORANGE}] transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (visible below lg when open) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 animate-fadeInDown">
            <nav className="flex flex-col space-y-3">
              {[...mainNavLinks, ...moreNavLinks].map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-[${PRIMARY_ORANGE}] transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// --- Hero Search Widget ---
type CabinClass = 'Economy' | 'Business' | 'First';
type ActiveSearchTab = 'flights' | 'hotel' | 'packages' | 'transport';
type FlightOriginType = 'CGK' | 'SBY' | 'JED' | 'MED' | '';
type FlightDestinationType = 'JED' | 'MED' | 'CGK' | 'SBY' | '';
// type HotelDestinationOption defined in types.ts
type TransportLocationOption = 'Makkah' | 'Al Madinah' | 'Jeddah' | 'Airport' | '';


const HeroSearchWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveSearchTab>('flights');
  const navigate = useNavigate();
  const { setBookingSelections } = useBooking();

  // Flight state
  const [flightOrigin, setFlightOrigin] = useState<FlightOriginType>('CGK');
  const [flightDestination, setFlightDestination] = useState<FlightDestinationType>('JED');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 9);
    return date.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');

  // Hotel state
  const [hotelDestination, setHotelDestination] = useState<HotelDestinationOptionType>('Makkah');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [hotelDuration, setHotelDuration] = useState(5);
  const [guests, setGuests] = useState(1);

  // Packages State
  const [packageDestination, setPackageDestination] = useState<HotelDestinationOptionType | 'Both' | ''>('');
  const [packageType, setPackageType] = useState<'Umrah' | 'Hajj' | ''>('');
  const [preferredMonth, setPreferredMonth] = useState('');
  const [packagePeople, setPackagePeople] = useState(1);

  // Transport State
  const [transportType, setTransportType] = useState<'bus' | 'train' | ''>('');
  const [transportFrom, setTransportFrom] = useState<TransportLocationOption>('');
  const [transportTo, setTransportTo] = useState<TransportLocationOption>('');
  const [transportDate, setTransportDate] = useState(new Date().toISOString().split('T')[0]);
  const [transportPassengers, setTransportPassengers] = useState(1);

  const [currentTabKey, setCurrentTabKey] = useState(0);
  useEffect(() => {
    setCurrentTabKey(prev => prev + 1);
  }, [activeTab]);

  const handleSearch = () => {
    if (activeTab === 'flights') {
      const durationDays = Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 3600 * 24)));
      setBookingSelections(prev => ({
        ...prev,
        services: { ...prev.services, flights: true, hotel: false, visaBus: false },
        flightDetails: {
            origin: flightOrigin,
            duration: (durationDays === 9 || durationDays === 12 ? durationDays : 9) as 9 | 12,
            destination: flightDestination
        },
        selectedHotelId: undefined,
        hotelSearchCriteria: undefined,
        numberOfSeats: passengers,
      }));
       navigate(APP_ROUTES.FLIGHT_DETAILS);
    } else if (activeTab === 'hotel') {
       setBookingSelections(prev => ({
        ...prev,
        services: { ...prev.services, hotel: true, flights: false, visaBus: false },
        flightDetails: undefined,
        selectedHotelId: undefined,
        numberOfSeats: guests,
        hotelSearchCriteria: { destination: hotelDestination, checkIn: checkInDate, duration: hotelDuration }
      }));
       navigate(APP_ROUTES.HOTEL_SELECTION);
    } else if (activeTab === 'packages') {
      let pkgDestForBooking: HotelDestinationOptionType = '';
      if (packageDestination === "Makkah" || packageDestination === "Al Madinah" || packageDestination === "Jeddah") {
        pkgDestForBooking = packageDestination;
      } else if (packageDestination === "Both") {
        pkgDestForBooking = 'Makkah'; // Default to Makkah if "Both" for single destination field
      }

       setBookingSelections(prev => ({
        ...prev,
        services: { ...prev.services, visaBus: true, flights: true, hotel: true },
        flightDetails: {
            origin: 'CGK',
            duration: 9,
            destination: packageDestination === "Both" ? "JED" : (packageDestination === "Makkah" ? "JED" : "MED") // Simplified
        },
        hotelSearchCriteria: { destination: pkgDestForBooking, checkIn: new Date().toISOString().split('T')[0], duration: 7 },
        selectedHotelId: undefined,
        numberOfSeats: packagePeople,
      }));
      navigate(APP_ROUTES.CONFIRMATION);
    } else if (activeTab === 'transport') {
      setBookingSelections(prev => ({
        ...prev,
        services: { ...prev.services, visaBus: true },
        numberOfSeats: transportPassengers,
      }));
      navigate(APP_ROUTES.CONFIRMATION);
    }
  };

  const TabButton: React.FC<{isActive: boolean, onClick: () => void, icon: React.ReactElement<React.SVGProps<SVGSVGElement>>, label: string}> =
    ({isActive, onClick, icon, label}) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2.5 px-4 sm:px-5 py-3.5 font-medium rounded-t-lg transition-all duration-300 ease-in-out focus:outline-none relative group text-sm sm:text-base
                  ${isActive ? `bg-white/95 text-[${PRIMARY_ORANGE}] shadow-lg` : `bg-transparent text-gray-100 hover:bg-white/10`}`}
      aria-selected={isActive}
      role="tab"
    >
      {React.cloneElement(icon, {className: "w-4 h-4 sm:w-5 sm:h-5"})}
      <span>{label}</span>
      {isActive && <div className={`absolute -bottom-px left-0 right-0 h-1 bg-[${PRIMARY_ORANGE}] rounded-t-sm`}></div>}
    </button>
  );

  const searchButtonText = {
    flights: "Search Flights",
    hotel: "Search Hotels",
    packages: "Find Packages",
    transport: "Find Transport"
  };

  const flightQuickLinks = ["Cheap Flights to Jeddah", "Umrah Flight Deals", "Madinah Flights"];
  const hotelQuickLinks = ["Hotels in Makkah", "Madinah Hotel Offers", "5-Star Hotels Jeddah"];
  const packageQuickLinks = ["Family Umrah Packages", "Short Umrah Deals", "Hajj 2025 Info"];
  const transportQuickLinks = ["Makkah to Madinah Bus", "Jeddah Airport Transfer", "Harmain Train Tickets"];

  return (
    <div className="bg-gradient-to-br from-[rgba(42,57,144,0.92)] to-[rgba(60,85,160,0.92)] backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl -mt-16 md:-mt-24 lg:-mt-32 relative z-10 max-w-5xl mx-auto animate-fadeInUp opacity-0 delay-500 w-[95%] sm:w-[90%]" role="tablist">
      <div className="flex flex-wrap mb-5 border-b border-white/20">
        <TabButton isActive={activeTab === 'flights'} onClick={() => setActiveTab('flights')} icon={<PlaneIcon />} label="Flights" />
        <TabButton isActive={activeTab === 'hotel'} onClick={() => setActiveTab('hotel')} icon={<HotelIcon />} label="Hotels" />
        <TabButton isActive={activeTab === 'packages'} onClick={() => setActiveTab('packages')} icon={<BriefcaseIcon />} label="Packages" />
        <TabButton isActive={activeTab === 'transport'} onClick={() => setActiveTab('transport')} icon={<BusIcon />} label="Transport" />
      </div>

      <div key={currentTabKey} className="animate-fadeIn opacity-0" style={{animationDelay: '0.1s'}} role="tabpanel">
        {activeTab === 'flights' && (
          <>
            <div className="space-y-4 md:space-y-5">
              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                 <SearchInput as="select" icon={<LocationPinIcon />} label="From" value={flightOrigin} onChange={e => setFlightOrigin(e.target.value as FlightOriginType)}>
                    <option className="text-black bg-white" value="" disabled>Select Origin</option>
                    <option className="text-black bg-white" value="CGK">CGK (Jakarta)</option>
                    <option className="text-black bg-white" value="SBY">SBY (Surabaya)</option>
                    <option className="text-black bg-white" value="JED">JED (Jeddah)</option>
                    <option className="text-black bg-white" value="MED">MED (Madinah)</option>
                </SearchInput>
                <SearchInput as="select" icon={<LocationPinIcon />} label="To" value={flightDestination} onChange={e => setFlightDestination(e.target.value as FlightDestinationType)}>
                    <option className="text-black bg-white" value="JED">JED (Jeddah)</option>
                    <option className="text-black bg-white" value="MED">MED (Madinah)</option>
                    <option className="text-black bg-white" value="CGK">CGK (Jakarta - Return)</option>
                    <option className="text-black bg-white" value="SBY">SBY (Surabaya - Return)</option>
                </SearchInput>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <SearchInput icon={<CalendarIcon />} label="Departure Date" type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} min={new Date().toISOString().split('T')[0]}/>
                <SearchInput icon={<CalendarIcon />} label="Return Date" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={departureDate} />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <SearchInput icon={<UsersGroupIcon />} label="Passengers" type="number" min="1" placeholder="1" value={passengers} onChange={e => setPassengers(Math.max(1, parseInt(e.target.value)))} />
                <SearchInput as="select" icon={<TicketIcon />} label="Cabin Class" value={cabinClass} onChange={e => setCabinClass(e.target.value as CabinClass)}>
                    <option className="text-black bg-white" value="Economy">Economy</option>
                    <option className="text-black bg-white" value="Business">Business</option>
                    <option className="text-black bg-white" value="First">First</option>
                </SearchInput>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-200/80">Looking for: {flightQuickLinks.map(link => <a href="#" key={link} className="underline hover:text-white mx-1">{link}</a>)}</div>
          </>
        )}

        {activeTab === 'hotel' && (
          <>
            <div className="space-y-4 md:space-y-5">
                <SearchInput as="select" icon={<LocationPinIcon />} label="Destination" value={hotelDestination} onChange={e => setHotelDestination(e.target.value as HotelDestinationOptionType)}>
                    <option className="text-black bg-white" value="Makkah">Makkah</option>
                    <option className="text-black bg-white" value="Al Madinah">Al Madinah</option>
                    <option className="text-black bg-white" value="Jeddah">Jeddah</option>
                </SearchInput>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <SearchInput icon={<CalendarIcon />} label="Check-in Date" type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                <SearchInput icon={<CalendarIcon />} label="Duration (Nights)" type="number" min="1" placeholder="1" value={hotelDuration} onChange={e => setHotelDuration(Math.max(1, parseInt(e.target.value)))} />
                <SearchInput icon={<UsersGroupIcon />} label="Guests" type="number" min="1" placeholder="1" value={guests} onChange={e => setGuests(Math.max(1, parseInt(e.target.value)))} />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-200/80">Looking for: {hotelQuickLinks.map(link => <a href="#" key={link} className="underline hover:text-white mx-1">{link}</a>)}</div>
          </>
        )}

        {activeTab === 'packages' && (
            <>
                <div className="space-y-4 md:space-y-5">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                        <SearchInput as="select" icon={<LocationPinIcon />} label="Destination" value={packageDestination} onChange={e => setPackageDestination(e.target.value as HotelDestinationOptionType | 'Both' | '')}>
                            <option className="text-black bg-white" value="" disabled>Select Destination</option>
                            <option className="text-black bg-white" value="Makkah">Makkah</option>
                            <option className="text-black bg-white" value="Al Madinah">Al Madinah</option>
                            <option className="text-black bg-white" value="Jeddah">Jeddah</option>
                            <option className="text-black bg-white" value="Both">Makkah & Madinah</option>
                        </SearchInput>
                         <SearchInput as="select" icon={<BriefcaseIcon />} label="Package Type" value={packageType} onChange={e => setPackageType(e.target.value as 'Umrah' | 'Hajj' | '')}>
                            <option className="text-black bg-white" value="" disabled>Select Package Type</option>
                            <option className="text-black bg-white" value="Umrah">Umrah</option>
                            <option className="text-black bg-white" value="Hajj">Hajj</option>
                        </SearchInput>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                       <SearchInput icon={<CalendarIcon />} label="Preferred Month (Approx.)" type="month" value={preferredMonth} onChange={e => setPreferredMonth(e.target.value)} min={new Date().toISOString().slice(0,7)} />
                       <SearchInput icon={<UsersGroupIcon />} label="Number of People" type="number" min="1" placeholder="1" value={packagePeople} onChange={e => setPackagePeople(Math.max(1, parseInt(e.target.value)))} />
                    </div>
                </div>
                <div className="mt-3 text-xs text-gray-200/80">Looking for: {packageQuickLinks.map(link => <a href="#" key={link} className="underline hover:text-white mx-1">{link}</a>)}</div>
            </>
        )}

        {activeTab === 'transport' && (
            <>
                <div className="space-y-4 md:space-y-5">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                        <SearchInput as="select" icon={<BuildingStorefrontIcon />} label="Transport Type" value={transportType} onChange={e => setTransportType(e.target.value as 'bus' | 'train' | '')}>
                            <option className="text-black bg-white" value="" disabled>Select Transport</option>
                            <option className="text-black bg-white" value="bus">Bus</option>
                            <option className="text-black bg-white" value="train">Train (Harmain)</option>
                        </SearchInput>
                        <SearchInput as="select" icon={<LocationPinIcon />} label="From" value={transportFrom} onChange={e => setTransportFrom(e.target.value as TransportLocationOption)}>
                            <option className="text-black bg-white" value="" disabled>Select Origin</option>
                            <option className="text-black bg-white" value="Makkah">Makkah</option>
                            <option className="text-black bg-white" value="Al Madinah">Al Madinah</option>
                            <option className="text-black bg-white" value="Jeddah">Jeddah</option>
                            <option className="text-black bg-white" value="Airport">Airport (Generic)</option>
                        </SearchInput>
                        <SearchInput as="select" icon={<LocationPinIcon />} label="To" value={transportTo} onChange={e => setTransportTo(e.target.value as TransportLocationOption)}>
                             <option className="text-black bg-white" value="" disabled>Select Destination</option>
                            <option className="text-black bg-white" value="Makkah">Makkah</option>
                            <option className="text-black bg-white" value="Al Madinah">Al Madinah</option>
                            <option className="text-black bg-white" value="Jeddah">Jeddah</option>
                            <option className="text-black bg-white" value="Airport">Airport (Generic)</option>
                        </SearchInput>
                    </div>
                     <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                        <SearchInput icon={<CalendarIcon />} label="Travel Date" type="date" value={transportDate} onChange={e => setTransportDate(e.target.value)} min={new Date().toISOString().split('T')[0]}/>
                        <SearchInput icon={<UsersGroupIcon />} label="Passengers" type="number" min="1" placeholder="1" value={transportPassengers} onChange={e => setTransportPassengers(Math.max(1, parseInt(e.target.value)))} />
                    </div>
                </div>
                <div className="mt-3 text-xs text-gray-200/80">Looking for: {transportQuickLinks.map(link => <a href="#" key={link} className="underline hover:text-white mx-1">{link}</a>)}</div>
            </>
        )}

        <div className="mt-6 md:mt-8">
            <Button onClick={handleSearch} fullWidth={true} className="h-[50px] hover:shadow-lg hover:brightness-110 !text-base w-full" variant="primary" rightIcon={<SearchIcon className="w-5 h-5 ml-1"/>}>
                {searchButtonText[activeTab]}
            </Button>
        </div>
      </div>
    </div>
  );
};

// --- Promo Card ---
interface PromoItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discount?: string;
  validUntil?: string;
  tag?: string;
  price?: string;
}
const PromoCard: React.FC<{item: PromoItem, animationDelay: string}> = ({item, animationDelay}) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group animate-fadeInUp opacity-0 flex flex-col" style={{animationDelay}}>
        <div className="relative overflow-hidden h-56">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"/>
          {(item.tag || item.discount) && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {item.tag && <span className={`inline-block bg-gradient-to-r from-[${PRIMARY_BLUE}] to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}>{item.tag}</span>}
                {item.discount && <span className={`inline-block bg-gradient-to-r from-[${PRIMARY_ORANGE}] to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>{item.discount}</span>}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className={`text-lg font-semibold text-[${PRIMARY_BLUE}] mb-1.5 group-hover:text-[${PRIMARY_ORANGE}] transition-colors duration-200`}>{item.title}</h3>
            <p className="text-sm text-gray-600 mb-3 flex-grow min-h-[40px]">{item.description}</p>
            <div className="mt-auto">
                {item.validUntil && <p className="text-xs text-gray-500 mb-2">Valid until: {item.validUntil}</p>}
                {item.price && <p className="text-lg font-bold text-[${PRIMARY_ORANGE}] mb-3">{item.price}</p>}
                <Button variant="ghost" size="sm" className="w-full hover:bg-orange-500 hover:text-white transition-all duration-300 border-2 group-hover:border-orange-500">
                    View Deal <ChevronRightIcon className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"/>
                </Button>
            </div>
        </div>
    </div>
);

const FeaturedHotelCard: React.FC<{hotel: typeof HOTELS_DATA[0], animationDelay: string}> = ({ hotel, animationDelay }) => {
    const navigate = useNavigate();
    const { setBookingSelections } = useBooking();

    const handleViewDetails = () => {
        setBookingSelections(prev => ({
            ...prev,
            services: { ...prev.services, hotel: true, flights: false, visaBus: false },
            selectedHotelId: hotel.id,
            hotelSearchCriteria: { destination: hotel.city as HotelDestinationOptionType, checkIn: new Date().toISOString().split('T')[0], duration: 1 }
        }));
        navigate(APP_ROUTES.HOTEL_SELECTION);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group animate-fadeInUp opacity-0 flex flex-col" style={{animationDelay}}>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-md font-semibold text-[${PRIMARY_BLUE}] group-hover:text-[${PRIMARY_ORANGE}] transition-colors flex-grow pr-2`}>{hotel.name}</h3>
                    <span className={`bg-[${PRIMARY_ORANGE}] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap`}>{hotel.city}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 flex-grow min-h-[40px]">{hotel.locationDescription.length > 80 ? hotel.locationDescription.substring(0,80) + '...' : hotel.locationDescription}</p>
                <Button onClick={handleViewDetails} variant="ghost" size="sm" className="w-full mt-auto border-2 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                    View Details
                </Button>
            </div>
        </div>
    );
};

const DestinationCard: React.FC<{title: string; tagline: string; imageUrl: string; animationDelay: string;}> = ({ title, tagline, imageUrl, animationDelay }) => (
    <div
        className="relative rounded-xl overflow-hidden shadow-xl group transform transition-all duration-300 hover:shadow-2xl hover:scale-105 h-72 md:h-80 animate-fadeInUp opacity-0"
        style={{animationDelay}}
        role="group"
        aria-label={title}
    >
        <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
            <h3 className={`text-2xl md:text-3xl font-bold text-white mb-1.5 drop-shadow-md`}>{title}</h3>
            <p className="text-sm text-gray-200 drop-shadow-sm">{tagline}</p>
        </div>
    </div>
);

const LandingFooter: React.FC = () => (
  <footer className={`bg-slate-800 text-slate-300 py-14 md:py-20 mt-16 border-t-4 border-[${PRIMARY_ORANGE}]`}>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
        <div className="animate-fadeInUp opacity-0 delay-100 md:col-span-2 lg:col-span-2">
          <div className="flex items-center mb-4">
            <LogoIcon className="h-8 w-auto mr-2" />
            <h1 className={`text-lg font-bold text-white`}>Manazil Al-Mukhtara</h1>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">Your trusted partner for Hajj and Umrah journeys. Offering comprehensive travel solutions with dedication and care for a spiritual experience of a lifetime.</p>
        </div>

        <div className="animate-fadeInUp opacity-0 delay-200">
          <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {['About Us', 'Our Services', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map(link => (
               <li key={link}><a href="#" className={`hover:text-[${LIGHT_ORANGE}] transition-colors duration-200 flex items-center group`}><ChevronRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[${LIGHT_ORANGE}]"/>{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="animate-fadeInUp opacity-0 delay-300">
          <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
                <PhoneIcon className="w-4 h-4 mr-2.5 mt-0.5 text-slate-400 flex-shrink-0"/>
                <div>
                    <a href="tel:+966547158002" className={`block hover:text-[${LIGHT_ORANGE}] transition-colors`}>+966 54 715 8002</a>
                    <span className="text-xs text-slate-500">Makkah Branch</span>
                </div>
            </li>
             <li className="flex items-start">
                <PhoneIcon className="w-4 h-4 mr-2.5 mt-0.5 text-slate-400 flex-shrink-0"/>
                <div>
                    <a href="tel:+966549088545" className={`block hover:text-[${LIGHT_ORANGE}] transition-colors`}>+966 54 908 8545</a>
                    <span className="text-xs text-slate-500">Jeddah Branch</span>
                </div>
            </li>
             <li className="flex items-start">
                <MailIcon className="w-4 h-4 mr-2.5 mt-0.5 text-slate-400 flex-shrink-0"/>
                <a href="mailto:info@manazilalmukhtara.com" className={`hover:text-[${LIGHT_ORANGE}] transition-colors`}>info@manazilalmukhtara.com</a>
            </li>
             <li className="flex items-start">
                <LocationPinIcon className="w-4 h-4 mr-2.5 mt-0.5 text-slate-400 flex-shrink-0"/>
                <span className="text-slate-400">Head Office, [City], Saudi Arabia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 pt-10 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Manazil Al-Mukhtara Travel. All rights reserved. Crafted with love for spiritual journeys.</p>
      </div>
    </div>
  </footer>
);

// --- Main Landing Page Component ---
const heroImages = [
  "https://images.unsplash.com/photo-1583889398044-36914094d504?auto=format&fit=crop&w=1920&q=80", // Kaaba
  "https://images.unsplash.com/photo-1562991069-0260840994bb?auto=format&fit=crop&w=1920&q=80", // Prophet's Mosque
  "https://images.unsplash.com/photo-1603352489783-744620659f0e?auto=format&fit=crop&w=1920&q=80", // Hotel exterior/lobby
  "https://images.unsplash.com/photo-1528822610401-ead5980160a7?auto=format&fit=crop&w=1920&q=80", // Transportation (Bus/Train)
  "https://images.unsplash.com/photo-1569980169993-0fb6a3579896?auto=format&fit=crop&w=1920&q=80", // Happy pilgrims/family
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetBooking } = useBooking(); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    resetBooking(); 
    setIsAuthModalOpen(false);
    navigate(APP_ROUTES.SERVICE_SELECTION);
  };


  const samplePromos: PromoItem[] = [
    {id: 'promo1', title: 'Exclusive Umrah Package', description: 'Embark on a serene spiritual journey with our all-inclusive Umrah package. Flights, premium hotels, and guided tours.', imageUrl: 'https://images.unsplash.com/photo-1583889398044-36914094d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODk5MTV8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGthaWJhfGVufDB8fHx8MTcxNzgzNzE3Mnww&ixlib=rb-4.0.3&q=80&w=600', discount: '15% OFF', validUntil: '2024-12-31', tag: 'UMRAH 2024', price: '$1,899 /person'},
    {id: 'promo2', title: 'Madinah Luxury Retreat', description: 'Experience tranquility in Madinah. Stay at top-rated hotels near Masjid an-Nabawi with special amenities.', imageUrl: 'https://images.unsplash.com/photo-1603352489783-744620659f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODk5MTV8MHwxfHNlYXJjaHwxfHxtYWRpbmFoJTIwaG90ZWx8ZW58MHx8fHwxNzE3ODM3MjMzfDA&ixlib=rb-4.0.3&q=80&w=600', tag: 'MADINAH SPECIAL', validUntil: '2024-11-30', price: 'From $150 /night'},
    {id: 'promo3', title: 'Family Hajj Experience', description: 'Create unforgettable memories with our family-friendly Hajj packages. Includes guidance and support for all ages.', imageUrl: 'https://images.unsplash.com/photo-1569980169993-0fb6a3579896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODk5MTV8MHwxfHNlYXJjaHwxfHxoYWpqJTIwZmFtaWx5fGVufDB8fHx8MTcxNzgzNzI4NHww&ixlib=rb-4.0.3&q=80&w=600', discount: 'GROUP RATES', validUntil: '2025-02-28', tag: 'HAJJ 2025', price: 'Inquire for Package'},
  ];

  const coreServices = [
    { icon: VisaIcon, title: 'Electronic Visa', description: 'Streamlined e-Visa processing for your smooth travel.', delay: '0.2s'},
    { icon: BriefcaseIcon, title: 'Integrated Umrah Programs', description: 'Comprehensive Umrah packages tailored to your spiritual needs.', delay: '0.3s'},
    { icon: HotelIcon, title: 'Hotel Accommodation', description: 'Comfortable stays in Madinah, Makkah & Jeddah, near sacred sites.', delay: '0.4s'},
    { icon: UsersGroupIcon, title: 'Pilgrim Assistance', description: 'Dedicated support for pilgrims, from arrival to departure.', delay: '0.5s'},
    { icon: BuildingStorefrontIcon, title: 'Restaurant & Catering', description: 'Quality catering options to suit diverse palates.', delay: '0.6s'},
    { icon: BusIcon, title: 'Sacred Places Transfers', description: 'Reliable transfers to mosques and other sacred locations.', delay: '0.7s'},
  ];

  const featuredHotels = HOTELS_DATA.slice(0, 6);

  const transportationServices = [
      {icon: BusIcon, title: "Pilgrim Bus Transport", description: "Comfortable and reliable bus transport for groups and individuals.", delay: "0.2s"},
      {icon: PlaneIcon, title: "Flight Bookings", description: "Easy flight bookings through Manazil Al Mukhtara Aviation Company.", delay: "0.3s"},
      {icon: TrainIcon, title: "Harmain Highspeed Railway", description: "Book your travel with Harmain Highspeed Railway for efficient city-to-city travel.", delay: "0.4s"},
  ];

  const featuredDestinations = [
      { title: "Makkah Al-Mukarramah", tagline: "The heart of Islam, home to the Holy Kaaba and Masjid al-Haram.", imageUrl: "https://images.unsplash.com/photo-1563387850371-623258145930?auto=format&fit=crop&w=800&q=75", animationDelay: "0.2s" },
      { title: "Al Madinah Al-Munawwarah", tagline: "The city of the Prophet (PBUH), radiating peace and serenity.", imageUrl: "https://images.unsplash.com/photo-1600970497089-348545c269fe?auto=format&fit=crop&w=800&q=75", animationDelay: "0.3s" },
      { title: "Jeddah", tagline: "The vibrant gateway to the Holy Cities, blending tradition with modernity.", imageUrl: "https://images.unsplash.com/photo-1580769510085-5f61005770f1?auto=format&fit=crop&w=800&q=75", animationDelay: "0.4s" },
  ];


  return (
    <div className={`min-h-screen flex flex-col bg-[var(--background-color)]`}>
      <LandingHeader onAuthClick={handleAuthClick} />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} onSuccess={handleAuthSuccess} />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative pt-28 pb-40 md:pt-36 md:pb-48 lg:pt-40 lg:pb-60 overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${src})`,
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
              aria-hidden="true"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-[2]"></div>
          <div className="container mx-auto px-4 relative z-[3] text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight animate-fadeInUp opacity-0 drop-shadow-lg" style={{animationDelay: '0.2s'}}>
              Your Sacred Journey Starts Here
            </h2>
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto animate-fadeInUp opacity-0 drop-shadow-sm" style={{animationDelay: '0.4s'}}>
              Manazil Al-Mukhtara offers seamless bookings for flights, hotels, and visa services for your Hajj & Umrah. Experience peace of mind with us.
            </p>
          </div>
        </div>

        <HeroSearchWidget />

        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 text-center">
                <div className="animate-fadeInUp opacity-0" style={{animationDelay: '0.1s'}}>
                    <LocationPinIcon className={`w-16 h-16 text-[${PRIMARY_ORANGE}] mx-auto mb-5`} />
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${PRIMARY_BLUE}] mb-4`}>Explore Our Sacred Destinations</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base leading-relaxed">Discover the spiritual richness and unique charm of the Kingdom's most revered cities.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredDestinations.map(dest => (
                        <DestinationCard
                            key={dest.title}
                            title={dest.title}
                            tagline={dest.tagline}
                            imageUrl={dest.imageUrl}
                            animationDelay={dest.animationDelay}
                        />
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <div className="animate-fadeInUp opacity-0" style={{animationDelay: '0.1s'}}>
                    <BuildingStorefrontIcon className={`w-16 h-16 text-[${PRIMARY_ORANGE}] mx-auto mb-5`} />
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${PRIMARY_BLUE}] mb-4`}>Discover Our Core Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base leading-relaxed">From individual travel plans to group bookings, we cater to all your spiritual travel needs with professionalism, care, and a commitment to excellence.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {coreServices.map(service => (
                             <div key={service.title} className="bg-slate-50 p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeInUp opacity-0" style={{animationDelay: service.delay}}>
                                <service.icon className={`w-12 h-12 text-[${PRIMARY_ORANGE}] mb-4 p-2 bg-orange-100 rounded-full`}/>
                                <h3 className={`text-xl font-semibold text-[${PRIMARY_BLUE}] mb-2.5`}>{service.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fadeInUp opacity-0" style={{animationDelay: '0.1s'}}>
                    <HotelIcon className={`w-16 h-16 text-[${PRIMARY_ORANGE}] mx-auto mb-5`} />
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${PRIMARY_BLUE}] mb-3`}>Experience Comfort at Our Premier Hotels</h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-base">Explore a selection of our finest hotels, offering exceptional service and strategic locations.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {featuredHotels.map((hotel, index) => (
                        <FeaturedHotelCard key={hotel.id} hotel={hotel} animationDelay={`${(index * 0.1) + 0.2}s`} />
                    ))}
                </div>
                <div className="text-center mt-12 animate-fadeInUp opacity-0" style={{animationDelay: `${(featuredHotels.length * 0.1) + 0.2}s`}}>
                    <Button variant="primary" size="lg" onClick={() => navigate(APP_ROUTES.HOTEL_SELECTION)} className="hover:shadow-xl hover:brightness-105">
                        View All Hotels
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <div className="animate-fadeInUp opacity-0" style={{animationDelay: '0.1s'}}>
                    <PlaneIcon className={`w-16 h-16 text-[${PRIMARY_ORANGE}] mx-auto mb-5 transform rotate-[-45deg]`} />
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${PRIMARY_BLUE}] mb-4`}>Integrated Transportation Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base leading-relaxed">Travel seamlessly with our comprehensive transportation options, designed for your comfort and convenience during your sacred journey.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {transportationServices.map(service => (
                             <div key={service.title} className="bg-slate-50 p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fadeInUp opacity-0" style={{animationDelay: service.delay}}>
                                <service.icon className={`w-12 h-12 text-[${PRIMARY_ORANGE}] mb-4 p-2 bg-orange-100 rounded-full`}/>
                                <h3 className={`text-xl font-semibold text-[${PRIMARY_BLUE}] mb-2.5`}>{service.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left animate-fadeInUp opacity-0" style={{animationDelay: '0.2s'}}>
                <div>
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${PRIMARY_BLUE}]`}>Special Offers & Packages</h2>
                    <p className="text-gray-500 mt-1.5 text-base">Curated deals for your spiritual journey.</p>
                </div>
                <Button variant="ghost" size="md" className="mt-5 sm:mt-0 hover:bg-orange-500 hover:text-white transition-all group border-2 hover:border-orange-500">
                    View All Promos <ChevronRightIcon className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"/>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {samplePromos.map((promo, index) => <PromoCard key={promo.id} item={promo} animationDelay={`${(index * 0.1) + 0.3}s`} />)}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-[var(--primary-blue)] to-blue-700 text-white">
            <div className="container mx-auto px-4 text-center">
                <div className="animate-fadeInUp opacity-0 delay-200">
                    <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-[var(--primary-orange)]" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Plan Your Journey?</h2>
                    <p className="text-lg text-white max-w-xl mx-auto mb-8">
                        Let us help you craft the perfect spiritual experience. Contact our experts today or start your booking online.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => {
                                const searchWidget = document.querySelector('.z-10.max-w-5xl');
                                searchWidget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className="bg-gradient-to-r from-[${PRIMARY_ORANGE}] to-orange-400 hover:from-orange-500 hover:to-[${PRIMARY_ORANGE}] shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                            Start Booking Now
                        </Button>
                        <Button
                            variant="light-ghost"
                            size="lg"
                            className="border-white text-white hover:bg-white/10 hover:shadow-lg"
                        >
                            Contact Our Team
                        </Button>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <LandingFooter />
    </div>
  );
};
