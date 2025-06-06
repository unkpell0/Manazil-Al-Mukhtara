import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage'; 
// import { AuthPage } from './pages/AuthPage'; // Removed AuthPage import
import { ServiceSelectionPage } from './pages/ServiceSelectionPage';
import { FlightDetailsPage } from './pages/FlightDetailsPage';
import { HotelSelectionPage } from './pages/HotelSelectionPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { BookingProvider, useBooking } from './contexts/BookingContext';
import { APP_ROUTES } from './constants';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

interface ProtectedRouteProps {
  children: JSX.Element;
  condition: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, condition, redirectTo }) => {
  if (!condition) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};


const AppRoutes: React.FC = () => {
  const { bookingSelections } = useBooking();

  return (
    <Routes>
      <Route path={APP_ROUTES.LANDING} element={<LandingPage />} />
      {/* <Route path={APP_ROUTES.LOGIN} element={<AuthPage />} /> Removed AuthPage route */}
      <Route path={APP_ROUTES.SERVICE_SELECTION} element={<ServiceSelectionPage />} />
      <Route 
        path={APP_ROUTES.FLIGHT_DETAILS} 
        element={
          <ProtectedRoute condition={bookingSelections.services.flights} redirectTo={APP_ROUTES.SERVICE_SELECTION}>
            <FlightDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={APP_ROUTES.HOTEL_SELECTION} 
        element={
           <ProtectedRoute 
             condition={
                bookingSelections.services.hotel || 
                (bookingSelections.services.flights && 
                 bookingSelections.flightDetails !== undefined && 
                 bookingSelections.flightDetails.origin !== '' && 
                 bookingSelections.flightDetails.duration !== 0
                )
             } 
             redirectTo={bookingSelections.services.flights ? APP_ROUTES.FLIGHT_DETAILS : APP_ROUTES.SERVICE_SELECTION}
           >
            <HotelSelectionPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={APP_ROUTES.CONFIRMATION} 
        element={
          <ProtectedRoute condition={bookingSelections.services.flights || bookingSelections.services.hotel || bookingSelections.services.visaBus} redirectTo={APP_ROUTES.SERVICE_SELECTION}>
            <ConfirmationPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to={APP_ROUTES.LANDING} />} />
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <BookingProvider>
      <HashRouter>
        <AppRoutes />
        <Analytics />
        <SpeedInsights />
      </HashRouter>
    </BookingProvider>
  );
};

export default App;
