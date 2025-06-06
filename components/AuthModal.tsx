import React from 'react';
import { Button } from './Button';
import { APP_ROUTES, PRIMARY_BLUE, TEXT_DARK, LIGHT_ORANGE, PRIMARY_ORANGE } from '../constants';
import { LogoIcon } from './LogoIcon';
import { XIcon } from './IconComponents';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Called when user signs in, registers, or skips
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, handle actual login/registration
    console.log('AuthModal: Simulating sign in/register...');
    onSuccess();
  };

  const handleSkip = () => {
    console.log('AuthModal: Skipping authentication...');
    onSuccess();
  };

  const commonInputClasses = `mt-1 block w-full px-3.5 py-2.5 border border-gray-300 bg-white text-[var(--text-dark)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--light-orange)] focus:border-[var(--primary-orange)] sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400`;

  return (
    <div
      className="fixed inset-0 z-[190] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose} // Close modal if backdrop is clicked
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md z-[200] animate-scaleUp opacity-0"
        style={{animationDelay: '0.1s'}} // Slight delay for panel animation after backdrop fades in
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--primary-orange)]"
            aria-label="Close login/register"
          >
            <XIcon className="w-6 h-6" />
          </button>
          
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4 animate-fadeInUp opacity-0 delay-100" style={{animationDelay: '0.2s', animationPlayState: isOpen ? 'running': 'paused'}}>
                <LogoIcon className="w-16 h-auto text-[var(--primary-blue)]" />
            </div>
            <h2 id="auth-modal-title" className={`text-2xl md:text-3xl font-bold text-[${PRIMARY_BLUE}] animate-fadeInUp opacity-0 delay-200`} style={{animationDelay: '0.3s', animationPlayState: isOpen ? 'running': 'paused'}}>Manazil Al-Mukhtara</h2>
            <p className="text-gray-600 mt-2 animate-fadeInUp opacity-0 delay-300" style={{animationDelay: '0.4s', animationPlayState: isOpen ? 'running': 'paused'}}>Plan your sacred journey with ease and confidence.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="animate-fadeInUp opacity-0" style={{animationDelay: '0.5s', animationPlayState: isOpen ? 'running': 'paused'}}>
              <label htmlFor="modal-email" className={`block text-sm font-medium text-[${TEXT_DARK}] mb-1`}>
                Email address (Optional)
              </label>
              <input
                type="email"
                name="email"
                id="modal-email"
                className={commonInputClasses}
                placeholder="you@example.com"
                aria-label="Email address"
              />
            </div>

            <div className="animate-fadeInUp opacity-0" style={{animationDelay: '0.6s', animationPlayState: isOpen ? 'running': 'paused'}}>
              <label htmlFor="modal-password" className={`block text-sm font-medium text-[${TEXT_DARK}] mb-1`}>
                Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                id="modal-password"
                className={commonInputClasses}
                placeholder="••••••••"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between animate-fadeInUp opacity-0" style={{animationDelay: '0.7s', animationPlayState: isOpen ? 'running': 'paused'}}>
              <div className="flex items-center">
                <input id="modal-remember-me" name="remember-me" type="checkbox" className={`h-4 w-4 text-[${PRIMARY_ORANGE}] border-gray-300 rounded focus:ring-[${PRIMARY_ORANGE}] focus:ring-offset-1 transition-colors`} />
                <label htmlFor="modal-remember-me" className="ml-2 block text-sm text-gray-700"> Remember me </label>
              </div>
              <div className="text-sm">
                <a href="#" className={`font-medium text-[${PRIMARY_ORANGE}] hover:text-orange-600 transition-colors`}> Forgot password? </a>
              </div>
            </div>
            
            <div className="space-y-4 pt-2 animate-fadeInUp opacity-0" style={{animationDelay: '0.8s', animationPlayState: isOpen ? 'running': 'paused'}}>
                <Button type="submit" variant="primary" fullWidth>
                  Sign In / Register
                </Button>
                <Button type="button" variant="ghost" fullWidth onClick={handleSkip}>
                  Skip for Now & Plan Trip
                </Button>
            </div>
          </form>
      </div>
    </div>
  );
};