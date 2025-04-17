
import React from 'react';
import { Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/theme/ThemeToggle';
import LanguageToggle from '@/components/language/LanguageToggle';
import GoogleLogin from '@/components/auth/GoogleLogin';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthModal from '@/components/auth/AuthModal';

const SettingsMenu = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {currentUser ? (
          <button className="rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-primary">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
              <AvatarFallback>{currentUser.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          </button>
        ) : (
          <button className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-700">
            <Settings className="h-5 w-5 dark:text-gray-200" />
            <span className="sr-only">Settings</span>
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
        {currentUser && (
          <>
            <DropdownMenuLabel className="dark:text-gray-200">
              {currentUser.displayName || currentUser.email || 'User'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-700">
          {currentUser ? <GoogleLogin /> : <AuthModal />}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuLabel className="dark:text-gray-200">{t('language')}</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer dark:hover:bg-gray-700">
          <LanguageToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuLabel className="dark:text-gray-200">{t('toggle_theme')}</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer flex justify-between items-center dark:hover:bg-gray-700">
          <span className="dark:text-gray-200">{t('dark_mode')}</span>
          <ThemeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
