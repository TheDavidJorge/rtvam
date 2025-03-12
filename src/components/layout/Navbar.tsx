
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu, X, ChevronDown, Radio, Tv, Home, Info, 
  Newspaper, Calendar, ChevronRight 
} from 'lucide-react';

// Define navigation structure with nested menus
const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { 
    name: 'Programação', 
    href: '/programacao',
    icon: Calendar,
    children: [
      { 
        name: 'Programas Noticiosos', 
        href: '/programacao/noticias',
        children: [
          { name: 'Jornal Académico', href: '/programacao/noticias/jornal-academico' },
          { name: 'Síntese Informativa', href: '/programacao/noticias/sintese-informativa' },
          { name: 'Revista de Imprensa', href: '/programacao/noticias/revista-imprensa' },
        ]
      },
      { 
        name: 'Programas de Entretenimento', 
        href: '/programacao/entretenimento',
        children: [
          { name: 'Manhã Académica', href: '/programacao/entretenimento/manha-academica' },
          { name: 'Tarde Académica', href: '/programacao/entretenimento/tarde-academica' },
          { name: 'Noite Académica', href: '/programacao/entretenimento/noite-academica' },
        ]
      },
    ]
  },
  { name: 'Notícias', href: '/noticias', icon: Newspaper },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'TV Directo', href: '/tv', icon: Tv },
  { name: 'Sobre Nós', href: '/sobre', icon: Info },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-rtam-blue">RTAM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                {!item.children ? (
                  <Link
                    to={item.href}
                    className={cn(
                      "nav-link flex items-center",
                      isActive(item.href) && "active"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ) : (
                  <div className="relative group">
                    <button
                      className={cn(
                        "nav-link flex items-center",
                        openMenus[item.name] && "active"
                      )}
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg hidden group-hover:block animate-fade-in">
                      <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5 py-1">
                        {item.children.map((child) => (
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
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col space-y-1 py-2">
            {navigation.map((item) => (
              <div key={item.name} className="w-full">
                {!item.children ? (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 hover:bg-gray-100 rounded-md",
                      isActive(item.href) && "bg-gray-100 text-rtam-blue font-medium"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
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
                        <item.icon className="w-5 h-5 mr-3" />
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
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
