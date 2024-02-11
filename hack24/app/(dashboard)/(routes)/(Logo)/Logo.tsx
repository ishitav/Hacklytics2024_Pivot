// Logo.tsx
import React from 'react';
import './Logo.css'; // Assuming you have a CSS file for additional styles

interface LogoProps {
  size?: string; // Optional size prop to customize font size
}

const Logo: React.FC<LogoProps> = ({ size = '24px' }) => {
  return (
    <div className="logo" style={{ fontSize: size, color: '#f28500', fontFamily: "'Reem Kufi Fun', sans-serif" }}>
      Pivot.
    </div>
  );
};

export default Logo;
