
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

interface SubMenuProps {
  item: NavItem;
  openMenus: Record<string, boolean>;
  toggleSubmenu: (name: string) => void;
  isActive: (href: string) => boolean;
}

const SubMenu = ({ item, openMenus, toggleSubmenu, isActive }: SubMenuProps) => {
  return (
    <div className="relative group">
      <button
        className={cn(
          "nav-link flex items-center",
          openMenus[item.name] && "active"
        )}
        onClick={() => toggleSubmenu(item.name)}
      >
        {item.icon && <item.icon className="w-4 h-4 mr-2" />}
        {item.name}
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>
      <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg hidden group-hover:block animate-fade-in">
        <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5 py-1">
          {item.children?.map((child) => (
            <div key={child.name} className="group/submenu relative">
              {!child.children ? (
                <Link
                  to={child.href}
                  className={cn(
                    "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                    isActive(child.href) && "bg-gray-50 text-rtam-blue font-medium"
                  )}
                >
                  {child.name}
                </Link>
              ) : (
                <>
                  <div className="flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100">
                    <span>{child.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="absolute left-full top-0 ml-1 w-56 origin-top-left rounded-md shadow-lg hidden group-hover/submenu:block">
                    <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5 py-1">
                      {child.children.map((subChild) => (
                        <Link
                          key={subChild.name}
                          to={subChild.href}
                          className={cn(
                            "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                            isActive(subChild.href) && "bg-gray-50 text-rtam-blue font-medium"
                          )}
                        >
                          {subChild.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
