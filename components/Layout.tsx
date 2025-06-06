
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { PRIMARY_ORANGE, PRIMARY_BLUE, BACKGROUND_COLOR, LIGHT_ORANGE, TEXT_DARK, APP_ROUTES } from '../constants'; // Import APP_ROUTES
import { LogoIcon } from './LogoIcon';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className={`min-h-screen bg-[var(--background-color)] p-3 sm:p-4 md:p-6 flex flex-col items-center animate-fadeIn opacity-0`}>
      <div className={`w-full max-w-6xl bg-white shadow-xl rounded-lg border-t-4 border-[${PRIMARY_ORANGE}] overflow-hidden`}>
        <header className="p-4 md:p-5 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <Link to={APP_ROUTES.LANDING} className="group flex items-center" aria-label="Go to homepage">
                    <LogoIcon className="h-9 w-auto mr-2.5 transition-transform duration-300 ease-out group-hover:scale-105" />
                    <div>
                        <h1 className={`text-xl md:text-2xl font-bold text-[${PRIMARY_BLUE}] group-hover:text-[${PRIMARY_ORANGE}] transition-colors duration-300`}>Manazil Al-Mukhtara</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Your Trusted Partner for Hajj & Umrah Journeys</p>
                    </div>
                </Link>
                {title && <h2 className={`text-lg md:text-xl font-semibold text-[${TEXT_DARK}] self-start sm:self-center`}>{title}</h2>}
            </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="py-4 px-6 bg-gray-100 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Manazil Al-Mukhtara. All rights reserved. Travel with Peace.</p>
        </footer>
      </div>
    </div>
  );
};
