
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translations with more text
const translations: Record<Language, Record<string, string>> = {
  pt: {
    'home': 'Início',
    'radio': 'Rádio',
    'tv': 'TV',
    'news': 'Notícias',
    'programming': 'Programação',
    'dark_mode': 'Modo Escuro',
    'light_mode': 'Modo Claro',
    'language': 'Idioma',
    'settings': 'Configurações',
    'sports': 'Esportes',
    'live': 'Ao Vivo',
    'schedule': 'Programação',
    'about_us': 'Sobre Nós',
    'contact': 'Contato',
    'search': 'Pesquisar',
    'latest_news': 'Últimas Notícias',
    'popular': 'Popular',
    'read_more': 'Leia Mais',
    'today': 'Hoje',
    'toggle_theme': 'Alternar Tema',
    // Add more translations as needed
  },
  en: {
    'home': 'Home',
    'radio': 'Radio',
    'tv': 'TV',
    'news': 'News',
    'programming': 'Programming',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    'language': 'Language',
    'settings': 'Settings',
    'sports': 'Sports',
    'live': 'Live',
    'schedule': 'Schedule',
    'about_us': 'About Us',
    'contact': 'Contact',
    'search': 'Search',
    'latest_news': 'Latest News',
    'popular': 'Popular',
    'read_more': 'Read More',
    'today': 'Today',
    'toggle_theme': 'Toggle Theme',
    // Add more translations as needed
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
