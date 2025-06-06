import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { useBooking } from '../contexts/BookingContext';
import { HOTELS_DATA, APP_ROUTES, PRIMARY_BLUE, PRIMARY_ORANGE, LIGHT_ORANGE } from '../constants';
import { PlaneIcon, HotelIcon, VisaIcon, CheckCircleIcon, UsersIcon, CalendarIcon, LocationPinIcon } from '../components/IconComponents';

export const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingSelections, setBookingSelections, resetBooking } = useBooking();

  const selectedHotel = bookingSelections.selectedHotelId ? HOTELS_DATA.find(h => h.id === bookingSelections.selectedHotelId) : null;

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seats = parseInt(e.target.value);
    if (seats >= 1 && seats <= 100) { // Added max seats for sanity
      setBookingSelections(prev => ({ ...prev, numberOfSeats: seats }));
    } else if (e.target.value === '') {
       setBookingSelections(prev => ({ ...prev, numberOfSeats: 1 })); // Default to 1 if empty
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to a backend.
    console.log("Booking Submitted:", bookingSelections);
    // Show a more professional confirmation message (e.g., a modal or toast)
    alert("Your booking request has been successfully submitted! We will contact you shortly. (Details logged in console)");
    resetBooking();
    navigate(APP_ROUTES.LANDING); // Navigate to landing after booking
  };
  
  const SummaryItem: React.FC<{icon: React.ReactNode, title: string, children: React.ReactNode, colorTheme: string, delay: string}> = ({icon, title, children, colorTheme, delay}) => (
    <div className={`p-5 rounded-xl border ${colorTheme} flex items-start shadow-lg animate-fadeInUp opacity-0`} style={{ animationDelay: delay }}>
        <div className="mr-4 mt-1 flex-shrink-0">{icon}</div>
        <div className="flex-grow">
            <p className="font-semibold text-lg">{title}</p>
            <div className="text-sm text-gray-700 space-y-0.5 mt-1">{children}</div>
        </div>
    </div>
  );


  return (
    <Layout title="Finalize Your Booking">
      <PageShell title="Confirm Your Selections">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-8 border border-gray-100 animate-scaleUp opacity-0">
          <div>
            <h3 className={`text-xl font-bold text-[${PRIMARY_BLUE}] mb-5 border-b border-gray-200 pb-3`}>Order Summary</h3>
            
            <div className="space-y-5">
              {bookingSelections.services.flights && bookingSelections.flightDetails && (
                <SummaryItem 
                  icon={<PlaneIcon className={`w-8 h-8 text-blue-600`} />}
                  title="Flight Package"
                  colorTheme="bg-blue-50 border-blue-200 text-blue-800"
                  delay="0.2s"
                >
                  <p><strong className="font-medium">Origin:</strong> {bookingSelections.flightDetails.origin || 'Not specified'}</p>
                  <p><strong className="font-medium">Destination:</strong> {bookingSelections.flightDetails.destination || 'Jeddah/Madinah (assumed)'}</p>
                  <p><strong className="font-medium">Duration:</strong> {bookingSelections.flightDetails.duration ? `${bookingSelections.flightDetails.duration} days` : 'Not specified'}</p>
                </SummaryItem>
              )}

              {bookingSelections.services.hotel && selectedHotel && (
                 <SummaryItem
                    icon={<HotelIcon className={`w-8 h-8 text-green-600`} />}
                    title="Hotel Accommodation"
                    colorTheme="bg-green-50 border-green-200 text-green-800"
                    delay="0.3s"
                 >
                    <p><strong className="font-medium">Hotel:</strong> {selectedHotel.name}</p>
                    <p><strong className="font-medium">City:</strong> {selectedHotel.city}</p>
                    {bookingSelections.hotelSearchCriteria?.checkIn && 
                        <p className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1.5 text-gray-500"/> <strong className="font-medium">Check-in:</strong> {new Date(bookingSelections.hotelSearchCriteria.checkIn).toLocaleDateString()}</p>}
                    {bookingSelections.hotelSearchCriteria?.duration && 
                        <p><strong className="font-medium">Nights:</strong> {bookingSelections.hotelSearchCriteria.duration}</p>}
                 </SummaryItem>
              )}
              
              {bookingSelections.services.visaBus && (
                <SummaryItem
                    icon={<VisaIcon className={`w-8 h-8 text-yellow-600`} />}
                    title="Visa & Ground Transport"
                    colorTheme="bg-yellow-50 border-yellow-300 text-yellow-800"
                    delay="0.4s"
                >
                    <p>Visa processing and bus transportation services are included in your request.</p>
                </SummaryItem>
              )}

              {!(bookingSelections.services.flights || bookingSelections.services.hotel || bookingSelections.services.visaBus) && (
                <p className="text-gray-500 text-center py-4 animate-fadeInUp opacity-0 delay-200">No services selected. Please go back and choose your preferred services.</p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 animate-fadeInUp opacity-0 delay-500">
            <label htmlFor="seats" className={`block text-base font-semibold text-[${PRIMARY_BLUE}] mb-2`}>
              Number of Travelers / Seats
            </label>
            <div className="relative max-w-xs">
                <UsersIcon className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none`} />
                <input
                type="number"
                id="seats"
                name="seats"
                min="1"
                max="100"
                value={bookingSelections.numberOfSeats}
                onChange={handleSeatsChange}
                className={`mt-1 block w-full py-3 px-3 pl-12 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[${LIGHT_ORANGE}] focus:border-[${PRIMARY_ORANGE}] sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400`}
                aria-label="Number of travelers or seats"
                />
            </div>
             {bookingSelections.numberOfSeats <=0 && <p className="text-red-500 text-xs mt-1">Please enter a valid number of travelers (at least 1).</p>}
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-end items-center gap-4 animate-fadeInUp opacity-0 delay-600">
           <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} // Go back
            size="lg"
            className="w-full sm:w-auto"
          >
            Make Changes
          </Button>
          <Button 
            onClick={handleSubmit} 
            leftIcon={<CheckCircleIcon className="w-5 h-5"/>} 
            size="lg"
            className="min-w-[200px] w-full sm:w-auto"
            disabled={!(bookingSelections.services.flights || bookingSelections.services.hotel || bookingSelections.services.visaBus) || bookingSelections.numberOfSeats <=0}
          >
            Confirm & Submit
          </Button>
        </div>
      </PageShell>
    </Layout>
  );
};