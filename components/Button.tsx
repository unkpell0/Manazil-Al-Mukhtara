
import React from 'react';
import { PRIMARY_ORANGE, TEXT_LIGHT, PRIMARY_BLUE, LIGHT_ORANGE, TEXT_DARK } from '../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'light-ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
  leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false, 
  className = '', 
  leftIcon, 
  rightIcon, 
  size = 'md', 
  loading = false,
  disabled,
  ...props 
}) => {
  const baseStyle = "font-semibold rounded-md focus:outline-none transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  
  let sizeStyle = "";
  let iconSizeClass = "w-5 h-5"; // Default for md
  switch (size) {
    case 'sm':
      sizeStyle = "py-2 px-3.5 text-sm";
      iconSizeClass = "w-4 h-4";
      break;
    case 'lg':
      sizeStyle = "py-3 px-6 text-lg";
      iconSizeClass = "w-6 h-6";
      break;
    case 'md': 
    default:
      sizeStyle = "py-2.5 px-5 text-base"; // Adjusted padding
      break;
  }
  
  const widthStyle = fullWidth ? "w-full" : "";

  let variantStyle = "";
  let loadingSpinnerColor = TEXT_LIGHT; // Default for dark background buttons

  switch (variant) {
    case 'primary':
      variantStyle = `bg-[${PRIMARY_ORANGE}] text-[${TEXT_LIGHT}] shadow-md hover:shadow-lg hover:brightness-110 active:brightness-95 focus-visible:ring-[${LIGHT_ORANGE}] disabled:bg-orange-300 disabled:shadow-none disabled:brightness-100`;
      break;
    case 'secondary':
      variantStyle = `bg-[${PRIMARY_BLUE}] text-[${TEXT_LIGHT}] shadow-md hover:shadow-lg hover:brightness-110 active:brightness-95 focus-visible:ring-blue-300 disabled:bg-blue-300 disabled:shadow-none disabled:brightness-100`;
      break;
    case 'ghost':
      variantStyle = `bg-transparent text-[${PRIMARY_ORANGE}] border-2 border-[${PRIMARY_ORANGE}] hover:bg-orange-50/70 active:bg-orange-100/70 focus-visible:ring-[${LIGHT_ORANGE}] disabled:border-orange-200 disabled:text-orange-300 disabled:bg-transparent`;
      loadingSpinnerColor = PRIMARY_ORANGE;
      break;
    case 'light-ghost': // For use on dark backgrounds
        variantStyle = `bg-transparent text-white border-2 border-white/60 hover:bg-white/10 active:bg-white/20 focus-visible:ring-white/50 disabled:border-white/30 disabled:text-white/50 disabled:bg-transparent`;
        loadingSpinnerColor = TEXT_LIGHT;
        break;
    case 'danger':
      variantStyle = `bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg active:bg-red-800 focus-visible:ring-red-400 disabled:bg-red-300 disabled:shadow-none`;
      break;
    default: // Same as primary
      variantStyle = `bg-[${PRIMARY_ORANGE}] text-[${TEXT_LIGHT}] shadow-md hover:shadow-lg hover:brightness-110 active:brightness-95 focus-visible:ring-[${LIGHT_ORANGE}] disabled:bg-orange-300 disabled:shadow-none disabled:brightness-100`;
  }

  const disabledClasses = "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none";

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${widthStyle} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className={`animate-spin -ml-1 mr-2 ${iconSizeClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: loadingSpinnerColor }}>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && leftIcon && React.cloneElement(leftIcon, { className: `${iconSizeClass} ${children ? 'mr-2' : ''}` })}
      <span>{children}</span>
      {!loading && rightIcon && React.cloneElement(rightIcon, { className: `${iconSizeClass} ${children ? 'ml-2' : ''}` })}
    </button>
  );
};
