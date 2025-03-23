
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

interface MobileNavItemProps {
  item: NavItem;
  openMenus: Record<string, boolean>;
  toggleSubmenu: (name: string) => void;
  isActive: (href: string) => boolean;
}

const MobileNavItem = ({ item, openMenus, toggleSubmenu, isActive }: MobileNavItemProps) => {
  return (
    <div className="w-full">
      {!item.children ? (
        <Link
          to={item.href}
          className={cn(
            "flex items-center px-4 py-3 hover:bg-gray-100 rounded-md",
            isActive(item.href) && "bg-gray-100 text-rtam-blue font-medium"
          )}
        >
          {item.icon && <item.icon className="w-5 h-5 mr-3" />}
          {item.name}
        </Link>
      ) : (
        <div className="w-full">
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 rounded-md",
              openMenus[item.name] && "bg-gray-100"
            )}
          >
            <div className="flex items-center">
              {item.icon && <item.icon className="w-5 h-5 mr-3" />}
              {item.name}
            </div>
            <ChevronDown className={cn(
              "w-5 h-5 transition-transform",
              openMenus[item.name] && "transform rotate-180"
            )} />
          </button>
          <div
            className={cn(
              "pl-12 pr-4 overflow-hidden transition-all duration-200",
              openMenus[item.name] ? "max-h-96" : "max-h-0"
            )}
          >
            {item.children.map((child) => (
              <div key={child.name}>
                {!child.children ? (
                  <Link
                    to={child.href}
                    className={cn(
                      "flex items-center py-3 pl-2 border-l border-gray-200 hover:text-rtam-blue",
                      isActive(child.href) && "text-rtam-blue font-medium"
                    )}
                  >
                    {child.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSubmenu(child.name)}
                      className={cn(
                        "flex items-center justify-between w-full py-3 pl-2 border-l border-gray-200",
                        openMenus[child.name] && "text-rtam-blue font-medium"
                      )}
                    >
                      {child.name}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        openMenus[child.name] && "transform rotate-180"
                      )} />
                    </button>
                    <div
                      className={cn(
                        "pl-6 overflow-hidden transition-all duration-200",
                        openMenus[child.name] ? "max-h-96" : "max-h-0"
                      )}
                    >
                      {child.children.map((subChild) => (
                        <Link
                          key={subChild.name}
                          to={subChild.href}
                          className={cn(
                            "flex items-center py-2 pl-2 border-l border-gray-200 hover:text-rtam-blue",
                            isActive(subChild.href) && "text-rtam-blue font-medium"
                          )}
                        >
                          {subChild.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;
