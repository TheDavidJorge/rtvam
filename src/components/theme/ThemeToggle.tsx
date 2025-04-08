
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      aria-label={theme === 'dark' ? t('light_mode') : t('dark_mode')}
      className={cn(
        "p-2 h-9 w-9 rounded-full",
        theme === 'dark' ? 'bg-muted text-yellow-400 hover:text-yellow-500' : 'text-sky-700 hover:text-sky-900'
      )}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
