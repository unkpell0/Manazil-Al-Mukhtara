import React from 'react';
import { TEXT_DARK } from '../constants'; // Use TEXT_DARK for titles on light backgrounds

interface PageShellProps {
  title: string;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ title, children }) => {
  return (
    <div className="space-y-6 animate-fadeInUp opacity-0" style={{animationDelay: '0.1s'}}>
      <div className="pb-3 border-b border-gray-200"> {/* Softer border */}
        <h2 className={`text-xl md:text-2xl font-bold text-[var(--text-dark)]`}>{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};