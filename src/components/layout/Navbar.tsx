
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigation } from '@/data/navigationData';
import NavbarLogo from './NavbarLogo';
import MobileMenuButton from './MobileMenuButton';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import SettingsMenu from './SettingsMenu';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { language } = useLanguage();

  // Handle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle submenu visibility
  const toggleSubmenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Check if a link is active based on the current location
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  // Update navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-primary shadow-md py-2 text-white' 
          : 'bg-primary/95 backdrop-blur-sm py-4 text-white'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavbarLogo />
          <div className="flex items-center space-x-4">
            <DesktopNavigation 
              navigation={navigation}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              isActive={isActive}
            />
            <div className="hidden lg:flex">
              <SettingsMenu />
            </div>
            <MobileMenuButton 
              isOpen={isOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      </div>

      <MobileNavigation 
        isOpen={isOpen}
        navigation={navigation}
        openMenus={openMenus}
        toggleSubmenu={toggleSubmenu}
        isActive={isActive}
      />
    </nav>
  );
};

export default Navbar;
