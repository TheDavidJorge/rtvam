
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavLinkProps {
  href: string;
  name: string;
  icon: LucideIcon;
  isActive: (href: string) => boolean;
}

const NavLink = ({ href, name, icon: Icon, isActive }: NavLinkProps) => {
  const { t } = useLanguage();
  const active = isActive(href);
  
  return (
    <Link
      to={href}
      className={cn(
        'nav-link flex items-center space-x-1 dark:text-gray-200 dark:hover:bg-rtam-blue-dark/20',
        active && 'active dark:bg-rtam-blue-dark dark:text-white'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{t(name.toLowerCase())}</span>
    </Link>
  );
};

export default NavLink;
