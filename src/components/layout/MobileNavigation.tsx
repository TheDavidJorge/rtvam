
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import MobileNavItem from './MobileNavItem';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

interface MobileNavigationProps {
  isOpen: boolean;
  navigation: NavItem[];
  openMenus: Record<string, boolean>;
  toggleSubmenu: (name: string) => void;
  isActive: (href: string) => boolean;
}

const MobileNavigation = ({ 
  isOpen, 
  navigation, 
  openMenus, 
  toggleSubmenu, 
  isActive 
}: MobileNavigationProps) => {
  return (
    <div
      className={cn(
        "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
      )}
    >
      <div className="container mx-auto px-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col space-y-1 py-2">
          {navigation.map((item) => (
            <MobileNavItem
              key={item.name}
              item={item}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              isActive={isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
