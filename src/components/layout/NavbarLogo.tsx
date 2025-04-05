
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarLogo = () => {
  const location = useLocation();
  const isRadioPage = location.pathname.includes('/radio');
  
  // Use the radio-specific logo only on radio pages
  const logoUrl = isRadioPage 
    ? "https://drive.google.com/uc?export=view&id=1voNszLefw4tELXPWVqQsABt5A_XpIsmA" 
    : "/lovable-uploads/82edc24c-19ea-465b-8237-3da455dcf4e0.png";

  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src={logoUrl} 
        alt="RTAM Logo" 
        className="h-12 w-auto"
      />
    </Link>
  );
};

export default NavbarLogo;
