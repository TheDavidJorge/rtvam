
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarLogo = () => {
  const location = useLocation();
  const isRadioPage = location.pathname.includes('/radio');
  
  // Use the radio-specific logo only on radio pages
  const logoUrl = isRadioPage 
    ? "https://drive.google.com/uc?export=view&id=1voNszLefw4tELXPWVqQsABt5A_XpIsmA" 
    : "https://previews.dropbox.com/p/thumb/ACnLSeE3HGZOWbbnFNgty9N21pt8kKrxBWY-lOnjVzJNFpgcE2HfqWkuTfPpBYoxfEK2IKkhf9sTKRCz5yg5NRgNuMsgoFVlNSUhLRBAB8_lqDmHh76gqzXQrwES9FycHITZC1JOwsa6_0U7DTQeZOg43ngBIou4V9YCfLSd0kS2fSAPhrJnDoku2hmASUY8AiYxNwfyByxQBVOrA9L7vNYHO-Rv4PZyXdQCRMQpzv1y1z9Ea3bVLGRge-AdgJE3hoUfgOFYjZUZyCWTAlle9y3kZbps4Hcam8yqtpLDvrc5I-LhoyXC6rUBF8jkfwC7iyu0035h6_57IlpRTpzDjjei/p.png";

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
