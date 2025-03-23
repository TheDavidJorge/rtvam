
import React from 'react';
import { LucideIcon } from 'lucide-react';
import NavLink from './NavLink';
import SubMenu from './SubMenu';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

interface DesktopNavigationProps {
  navigation: NavItem[];
  openMenus: Record<string, boolean>;
  toggleSubmenu: (name: string) => void;
  isActive: (href: string) => boolean;
}

const DesktopNavigation = ({ navigation, openMenus, toggleSubmenu, isActive }: DesktopNavigationProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-1">
      {navigation.map((item) => (
        <React.Fragment key={item.name}>
          {!item.children ? (
            <NavLink
              href={item.href}
              name={item.name}
              icon={item.icon}
              isActive={isActive}
            />
          ) : (
            <SubMenu
              item={item}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              isActive={isActive}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DesktopNavigation;
