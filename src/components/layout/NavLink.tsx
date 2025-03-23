
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  name: string;
  icon: LucideIcon;
  isActive: (href: string) => boolean;
}

const NavLink = ({ href, name, icon: Icon, isActive }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "nav-link flex items-center",
        isActive(href) && "active"
      )}
    >
      <Icon className="w-4 h-4 mr-2" />
      {name}
    </Link>
  );
};

export default NavLink;
