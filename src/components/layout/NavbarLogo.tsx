
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="https://rtvam.co.mz/wp-content/uploads/2023/11/cropped-cropped-cropped-logo-1.png" 
        alt="RTAM Logo" 
        className="h-8 w-auto"
      />
    </Link>
  );
};

export default NavbarLogo;
