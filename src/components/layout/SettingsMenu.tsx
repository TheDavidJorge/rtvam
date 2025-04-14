
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
import { useLanguage } from '@/contexts/LanguageContext';

const SettingsMenu = () => {
  const { t } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-700">
          <Settings className="h-5 w-5 dark:text-gray-200" />
          <span className="sr-only">Settings</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
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
