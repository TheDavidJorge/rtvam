import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Terms that should not be translated
const preservedTerms = [
  'Rádio Académica de Moçambique',
  'Televisão Académica de Moçambique',
  'RTAM'
];

// Default translations
const translations = {
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
    'login': "Login",
    'logout': "Logout",
    'register': "Register",
    'email': "Email",
    'password': "Password",
    'your_email': "Your email",
    'your_password': "Your password",
    'login_with_google': "Login with Google",
    'login_required': "Login Required",
    'login_to_comment': "Please login to comment",
    'comment_added': "Comment Added",
    'comment_success': "Your comment was added successfully",
    'comment_error': "Error adding comment",
    'error': "Error",
    'enter_email_password': "Please enter your email and password",
    'password_too_short': "Password must be at least 6 characters",
    'password_requirement': "Password must be at least 6 characters long",
    'account_access': "Account Access",
    'account_access_description': "Login or create an account to participate in the community",
    'newsletter': "Newsletter",
    'newsletter_description': "Subscribe to our newsletter to get the latest news",
    'your_name': "Your name",
    'subscribe': "Subscribe",
    'newsletter_success': "Subscription successful! Thank you for subscribing.",
    'newsletter_error': "Error subscribing to newsletter. Please try again.",
    'enter_email': "Please enter your email",
    'success': "Success",
    'name': "Name",
    'post_comment': "Post Comment",
    'comments': "Comments",
    'no_comments': "No comments yet. Be the first to comment!",
    'write_comment': "Write your comment here...",
    'like': "Like",
    'toggle_theme': "Toggle Theme",
    'dark_mode': "Dark Mode",
    'language': "Language",
  },
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
    'login': "Entrar",
    'logout': "Sair",
    'register': "Registrar",
    'email': "Email",
    'password': "Senha",
    'your_email': "Seu email",
    'your_password': "Sua senha",
    'login_with_google': "Entrar com Google",
    'login_required': "Login Necessário",
    'login_to_comment': "Por favor, faça login para comentar",
    'comment_added': "Comentário Adicionado",
    'comment_success': "Seu comentário foi adicionado com sucesso",
    'comment_error': "Erro ao adicionar comentário",
    'error': "Erro",
    'enter_email_password': "Por favor, insira seu email e senha",
    'password_too_short': "A senha deve ter pelo menos 6 caracteres",
    'password_requirement': "A senha deve ter pelo menos 6 caracteres",
    'account_access': "Acesso à Conta",
    'account_access_description': "Entre ou crie uma conta para participar da comunidade",
    'newsletter': "Newsletter",
    'newsletter_description': "Assine nossa newsletter para receber as últimas notícias",
    'your_name': "Seu nome",
    'subscribe': "Assinar",
    'newsletter_success': "Assinatura realizada com sucesso! Obrigado por assinar.",
    'newsletter_error': "Erro ao assinar a newsletter. Por favor, tente novamente.",
    'enter_email': "Por favor, insira seu email",
    'success': "Sucesso",
    'name': "Nome",
    'post_comment': "Postar Comentário",
    'comments': "Comentários",
    'no_comments': "Ainda não há comentários. Seja o primeiro a comentar!",
    'write_comment': "Escreva seu comentário aqui...",
    'like': "Curtir",
    'toggle_theme': "Alternar Tema",
    'dark_mode': "Modo Escuro",
    'language': "Idioma",
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
    // Check if this is a preserved term that shouldn't be translated
    if (preservedTerms.some(term => key.includes(term))) {
      return key;
    }
    
    // Return the translation or the key if not found
    return translations[language][key.toLowerCase()] || key;
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
