
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton = ({ isOpen, toggleMenu }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={toggleMenu}
      className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
