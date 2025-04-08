
import React from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

interface MobileNavItemProps {
  item: NavItem;
  openMenus: Record<string, boolean>;
  toggleSubmenu: (name: string) => void;
  isActive: (href: string) => boolean;
}

const MobileNavItem = ({ item, openMenus, toggleSubmenu, isActive }: MobileNavItemProps) => {
  const { t } = useLanguage();
  const Icon = item.icon;
  const active = isActive(item.href);
  const isOpen = openMenus[item.name] || false;

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={cn(
          'flex items-center py-3 px-4 border-l-4',
          active
            ? 'border-rtam-blue bg-rtam-blue/10 text-rtam-blue dark:border-rtam-blue-light dark:text-rtam-blue-light'
            : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
        )}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span>{t(item.name.toLowerCase())}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => toggleSubmenu(item.name)}
        className={cn(
          'w-full flex items-center justify-between py-3 px-4 border-l-4',
          active
            ? 'border-rtam-blue bg-rtam-blue/10 text-rtam-blue dark:border-rtam-blue-light dark:text-rtam-blue-light'
            : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
        )}
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-3" />
          <span>{t(item.name.toLowerCase())}</span>
        </div>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="pl-10 pb-2 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.name}
              to={child.href}
              className={cn(
                'block py-2 px-4 border-l-4',
                isActive(child.href)
                  ? 'border-rtam-blue text-rtam-blue dark:border-rtam-blue-light dark:text-rtam-blue-light'
                  : 'border-transparent hover:text-rtam-blue'
              )}
            >
              {t(child.name.toLowerCase())}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;
