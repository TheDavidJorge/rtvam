
import React from 'react';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2">{t('language')}:</span>
      <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as Language)}>
        <ToggleGroupItem value="pt" aria-label="Português" className="text-xs px-2 py-1">
          PT
        </ToggleGroupItem>
        <ToggleGroupItem value="en" aria-label="English" className="text-xs px-2 py-1">
          EN
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
