
import React from 'react';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/contexts/ThemeContext';

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2 dark:text-white">{t('language')}:</span>
      <ToggleGroup 
        type="single" 
        value={language} 
        onValueChange={(value) => value && setLanguage(value as Language)}
        className={theme === 'dark' ? 'bg-gray-700 rounded-md' : 'bg-white/20 rounded-md'}
      >
        <ToggleGroupItem 
          value="pt" 
          aria-label="Português" 
          className="text-xs px-2 py-1 dark:data-[state=on]:bg-primary dark:data-[state=on]:text-white dark:text-white dark:hover:text-gray-400"
        >
          PT
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="en" 
          aria-label="English" 
          className="text-xs px-2 py-1 dark:data-[state=on]:bg-primary dark:data-[state=on]:text-white dark:text-white dark:hover:text-gray-400"
        >
          EN
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
