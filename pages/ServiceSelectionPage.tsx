import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { ServiceCheckbox } from '../components/ServiceCheckbox';
import { useBooking } from '../contexts/BookingContext';
import { APP_ROUTES, PRIMARY_BLUE, PRIMARY_ORANGE, LIGHT_ORANGE } from '../constants';
import { PlaneIcon, HotelIcon, VisaIcon, SearchIcon, UserIcon, ChevronRightIcon } from '../components/IconComponents';
import { ServiceOption, BookingSelections } from '../types';


const serviceOptions: ServiceOption[] = [
  { id: 'flights', label: 'Flights', icon: PlaneIcon },
  { id: 'hotel', label: 'Hotels', icon: HotelIcon },
  { id: 'visaBus', label: 'Visa & Bus', icon: VisaIcon },
];

export const ServiceSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingSelections, setBookingSelections } = useBooking();

  const handleServiceChange = (serviceId: keyof BookingSelections['services'], checked: boolean) => {
    setBookingSelections(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceId]: checked,
      }
    }));
  };

  const handleNext = () => {
    if (bookingSelections.services.flights) {
      navigate(APP_ROUTES.FLIGHT_DETAILS);
    } else if (bookingSelections.services.hotel) {
      navigate(APP_ROUTES.HOTEL_SELECTION);
    } else if (bookingSelections.services.visaBus) {
      navigate(APP_ROUTES.CONFIRMATION); 
    } else {
      // This case should ideally be prevented by disabling the 'Next' button
      // Consider an inline message or toast notification for better UX
      alert("Please select at least one service to proceed.");
    }
  };
  
  const canProceed = bookingSelections.services.flights || bookingSelections.services.hotel || bookingSelections.services.visaBus;

  return (
    <Layout title="Plan Your Trip">
      <div className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-200 animate-fadeInUp opacity-0 delay-100`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:flex-grow">
            <input 
              type="text" 
              placeholder="Search destinations, hotels, packages..." 
              className={`w-full py-3 pl-12 pr-4 text-[${PRIMARY_BLUE}] border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[${LIGHT_ORANGE}] focus:border-[${PRIMARY_ORANGE}] transition-all duration-200 ease-in-out shadow-sm hover:border-gray-300`}
              aria-label="Search destinations or hotels"
            />
            <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none`} aria-hidden="true" />
          </div>
          <Button 
            variant="ghost" 
            className={`border-[${PRIMARY_BLUE}] text-[${PRIMARY_BLUE}] hover:bg-blue-50 w-full sm:w-auto whitespace-nowrap hover:shadow-md`}
            size="md"
          >
            <UserIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            My Account
          </Button>
        </div>
      </div>

      <PageShell title="What services are you interested in?">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {serviceOptions.map((option, index) => (
            <ServiceCheckbox
              key={option.id}
              id={option.id}
              label={option.label}
              icon={<option.icon />}
              checked={bookingSelections.services[option.id]}
              onChange={(checked) => handleServiceChange(option.id, checked)}
              animationDelay={`${(index * 0.1) + 0.2}s`}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-end animate-fadeInUp opacity-0 delay-500">
          <Button 
            onClick={handleNext} 
            disabled={!canProceed} 
            rightIcon={<ChevronRightIcon className="w-5 h-5" aria-hidden="true"/>}
            size="lg"
            className="min-w-[150px]"
          >
            Next Step
          </Button>
        </div>
      </PageShell>
    </Layout>
  );
};