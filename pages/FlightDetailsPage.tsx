import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { useBooking } from '../contexts/BookingContext';
import { APP_ROUTES, PRIMARY_BLUE, PRIMARY_ORANGE, LIGHT_ORANGE } from '../constants';
import { ChevronRightIcon, PlaneIcon } from '../components/IconComponents';

const origins = [
  { value: 'CGK', label: 'CGK (Soekarno-Hatta, Jakarta)' },
  { value: 'SBY', label: 'SBY (Juanda, Surabaya)' },
  // Consider adding more based on common departure points
];

const durations = [
  { value: 9, label: '9 Days (Standard Umrah)' },
  { value: 12, label: '12 Days (Extended Umrah)' },
  // Add other common durations if applicable
];

export const FlightDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingSelections, setBookingSelections } = useBooking();

  // This check is technically redundant due to ProtectedRoute but good for clarity or direct component use
  if (!bookingSelections.services.flights) {
    navigate(APP_ROUTES.SERVICE_SELECTION);
    return null; 
  }

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingSelections(prev => ({
      ...prev,
      flightDetails: {
        ...prev.flightDetails!,
        origin: e.target.value as 'CGK' | 'SBY',
      }
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingSelections(prev => ({
      ...prev,
      flightDetails: {
        ...prev.flightDetails!,
        duration: parseInt(e.target.value) as 9 | 12,
      }
    }));
  };

  const handleNext = () => {
    if (bookingSelections.services.hotel) {
      navigate(APP_ROUTES.HOTEL_SELECTION);
    } else {
      navigate(APP_ROUTES.CONFIRMATION);
    }
  };
  
  const canProceed = bookingSelections.flightDetails?.origin && bookingSelections.flightDetails?.duration;

  const commonSelectClasses = `mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[${LIGHT_ORANGE}] focus:border-[${PRIMARY_ORANGE}] sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400 appearance-none`;


  return (
    <Layout title="Flight Preferences">
      <PageShell title="Tell Us About Your Flight Needs">
        <div className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 animate-scaleUp opacity-0">
          <div className="animate-fadeInUp opacity-0 delay-200">
            <label htmlFor="origin" className={`block text-sm font-medium text-[${PRIMARY_BLUE}] mb-1.5`}>
              Departure City (Origin)
            </label>
            <div className="relative">
              <select
                id="origin"
                name="origin"
                value={bookingSelections.flightDetails?.origin || ''}
                onChange={handleOriginChange}
                className={commonSelectClasses}
                aria-required="true"
              >
                <option value="" disabled>Select departure city</option>
                {origins.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>

          <div className="animate-fadeInUp opacity-0 delay-300">
            <label htmlFor="duration" className={`block text-sm font-medium text-[${PRIMARY_BLUE}] mb-1.5`}>
              Trip Duration
            </label>
            <div className="relative">
              <select
                id="duration"
                name="duration"
                value={bookingSelections.flightDetails?.duration || ''}
                onChange={handleDurationChange}
                className={commonSelectClasses}
                aria-required="true"
              >
                <option value="" disabled>Select trip duration</option>
                {durations.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>
           {/* Placeholder for more flight details if needed in future */}
        </div>
        <div className="mt-10 flex justify-end animate-fadeInUp opacity-0 delay-400">
          <Button 
            onClick={handleNext} 
            disabled={!canProceed} 
            rightIcon={<ChevronRightIcon className="w-5 h-5"/>}
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