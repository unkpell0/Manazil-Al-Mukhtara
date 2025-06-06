import React from 'react';
import { PRIMARY_ORANGE, PRIMARY_BLUE } from '../constants';

interface ServiceCheckboxProps {
  id: string;
  label: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  checked: boolean;
  onChange: (checked: boolean) => void;
  animationDelay?: string;
}

export const ServiceCheckbox: React.FC<ServiceCheckboxProps> = ({ id, label, icon, checked, onChange, animationDelay = '0s' }) => {
  return (
    <label
      htmlFor={id}
      className={`
        flex flex-col items-center justify-center p-4 md:p-6 border-2 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl
        animate-fadeInUp opacity-0
        ${checked ? `border-[${PRIMARY_ORANGE}] bg-orange-50/70 shadow-lg ring-2 ring-offset-1 ring-[${PRIMARY_ORANGE}]` : `border-gray-300 bg-white hover:border-gray-400 shadow-md`}
      `}
      style={{ animationDelay }}
      aria-checked={checked}
      role="checkbox"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-labelledby={`${id}-label`}
      />
      <div className={`w-12 h-12 md:w-16 md:h-16 mb-3 flex items-center justify-center rounded-full transition-all duration-300
                      ${checked ? `bg-gradient-to-br from-[${PRIMARY_ORANGE}] to-orange-400 text-white shadow-inner` : `bg-gray-100 text-[${PRIMARY_BLUE}] group-hover:bg-gray-200`}`}>
        {React.cloneElement(icon, { className: "w-6 h-6 md:w-8 md:h-8", "aria-hidden": true })}
      </div>
      <span id={`${id}-label`} className={`text-sm md:text-base font-semibold transition-colors duration-300 ${checked ? `text-[${PRIMARY_ORANGE}]` : `text-[${PRIMARY_BLUE}]`}`}>
        {label}
      </span>
    </label>
  );
};