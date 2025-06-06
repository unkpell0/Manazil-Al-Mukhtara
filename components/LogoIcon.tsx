// components/LogoIcon.tsx
import React from 'react';
import { PRIMARY_BLUE, PRIMARY_ORANGE } from '../constants'; // LIGHT_ORANGE is not used for this logo version

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  // Props like className, width, height are passed through
}

export const LogoIcon: React.FC<LogoIconProps> = (props) => {
  const blue = PRIMARY_BLUE; // For M, Crescent, Stars
  const orange = PRIMARY_ORANGE; // For H

  // Star path: A simple 5-pointed star. Scale and translate as needed.
  // Original path: M0,-5 L1.4,-1.5 L4.7,-1.5 L2.3,0.6 L2.9,3.9 L0,2 L-2.9,3.9 L-2.3,0.6 L-4.7,-1.5 L-1.4,-1.5 Z
  // Scaled by 1.2 for slightly larger stars: M0,-6 L1.68,-1.8 L5.64,-1.8 L2.76,0.72 L3.48,4.68 L0,2.4 L-3.48,4.68 L-2.76,0.72 L-5.64,-1.8 L-1.68,-1.8 Z
  const starPath = "M0,-6 L1.68,-1.8 L5.64,-1.8 L2.76,0.72 L3.48,4.68 L0,2.4 L-3.48,4.68 L-2.76,0.72 L-5.64,-1.8 L-1.68,-1.8 Z";

  return (
    <svg 
      viewBox="0 0 180 90" // Adjusted viewBox for the new logo proportions
      xmlns="http://www.w3.org/2000/svg"
      {...props} 
    >
      {/* Crescent/Swoosh (top arc) */}
      <path 
        d="M10 45 C 50 0, 130 0, 170 45 C 145 30, 115 20, 90 20 C 65 20, 35 30, 10 45 Z"
        fill={blue} 
      />
      
      {/* "M" bars (Blue) - From left to right: medium, tall, short */}
      {/* Base of M/H elements at y=80 */}
      <rect x="45" y="55" width="15" height="25" rx="1" fill={blue} /> {/* Left bar of M, top at y=55 */}
      <rect x="65" y="45" width="15" height="35" rx="1" fill={blue} /> {/* Middle bar of M, top at y=45 */}
      <rect x="85" y="60" width="15" height="20" rx="1" fill={blue} /> {/* Right bar of M, top at y=60 */}
      
      {/* "H" (Orange) */}
      {/* Left vertical of H, aligned with M's middle bar height */}
      <rect x="105" y="45" width="15" height="35" rx="1" fill={orange} /> 
      {/* Horizontal bar of H */}
      <rect x="105" y="57.5" width="35" height="10" rx="1" fill={orange} /> 
      {/* Right vertical of H */}
      <rect x="125" y="45" width="15" height="35" rx="1" fill={orange} />

      {/* Stars (Blue) - Arranged in an arc */}
      <path d={starPath} fill={blue} transform="translate(70, 38)" />
      <path d={starPath} fill={blue} transform="translate(85, 35)" />
      <path d={starPath} fill={blue} transform="translate(100, 35)" />
      <path d={starPath} fill={blue} transform="translate(115, 38)" />
    </svg>
  );
};
