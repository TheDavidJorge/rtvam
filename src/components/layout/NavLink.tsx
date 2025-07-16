
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  name: string;
  icon: LucideIcon;
  isActive: (href: string) => boolean;
}

const NavLink = ({ href, name, icon: Icon, isActive }: NavLinkProps) => {
  const active = isActive(href);
  
  return (
    <Link
      to={href}
      className={cn(
        'nav-link flex items-center space-x-1 text-white hover:bg-white/10 dark:text-white hover-dark',
        active && 'active bg-white/20 dark:bg-white/20'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{name}</span>
    </Link>
  );
};

export default NavLink;
