import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { HotelCard } from '../components/HotelCard';
import { useBooking } from '../contexts/BookingContext';
import { HOTELS_DATA, APP_ROUTES } from '../constants';
import { ChevronRightIcon } from '../components/IconComponents';

export const HotelSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingSelections, setBookingSelections } = useBooking();

  // The ProtectedRoute in App.tsx now correctly handles guarding this page.
  // The previous local check here was:
  // if (!bookingSelections.services.hotel && !bookingSelections.services.flights) {
  //   navigate(APP_ROUTES.SERVICE_SELECTION);
  //   return null;
  // }
  // This is no longer needed.

  const handleSelectHotel = (hotelId: string) => {
    setBookingSelections(prev => ({
      ...prev,
      selectedHotelId: hotelId === prev.selectedHotelId ? undefined : hotelId, // Allow unselecting
    }));
  };

  const handleNext = () => {
    navigate(APP_ROUTES.CONFIRMATION);
  };
  
  const canProceed = !!bookingSelections.selectedHotelId;

  // Filter hotels based on criteria from landing page, if provided
  const filteredHotels = React.useMemo(() => {
    if (bookingSelections.hotelSearchCriteria?.destination) {
      const searchTerm = bookingSelections.hotelSearchCriteria.destination.toLowerCase();
      return HOTELS_DATA.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm) || 
        hotel.city.toLowerCase().includes(searchTerm)
      );
    }
    return HOTELS_DATA;
  }, [bookingSelections.hotelSearchCriteria]);


  return (
    <Layout title="Choose Your Accommodation">
      <PageShell title="Select Your Preferred Hotel">
        {bookingSelections.hotelSearchCriteria?.destination && (
          <p className="mb-6 text-sm text-gray-600 animate-fadeInUp opacity-0 delay-100">
            Showing hotels based on your search for: <strong className="text-gray-800">{bookingSelections.hotelSearchCriteria.destination}</strong>.
            {bookingSelections.hotelSearchCriteria.checkIn && ` Check-in: ${new Date(bookingSelections.hotelSearchCriteria.checkIn).toLocaleDateString()}`}.
            {bookingSelections.hotelSearchCriteria.duration && ` Duration: ${bookingSelections.hotelSearchCriteria.duration} nights`}.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mb-8">
          {filteredHotels.map((hotel, index) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isSelected={bookingSelections.selectedHotelId === hotel.id}
              onSelect={handleSelectHotel}
              animationDelay={`${(index * 0.05) + 0.2}s`} // Faster stagger for cards
            />
          ))}
          {filteredHotels.length === 0 && (
             <p className="md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10 animate-fadeInUp opacity-0 delay-200">
                No hotels found matching your criteria. Please try a different search or browse all options.
            </p>
          )}
        </div>
        <div className="mt-10 flex justify-end animate-fadeInUp opacity-0" style={{animationDelay: `${(filteredHotels.length * 0.05) + 0.3}s`}}>
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