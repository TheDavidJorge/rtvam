
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define supported languages
export type Language = 'pt' | 'en';

// Define translation keys
export type TranslationKey = 
  | 'login'
  | 'logout'
  | 'register'
  | 'email'
  | 'password'
  | 'your_email'
  | 'your_password'
  | 'enter_email_password'
  | 'password_too_short'
  | 'password_requirement'
  | 'account_access'
  | 'account_access_description'
  | 'login_with_google'
  | 'toggle_theme'
  | 'dark_mode'
  | 'light_mode'
  | 'language'
  | 'error'
  | 'success'
  | 'newsletter'
  | 'newsletter_description'
  | 'name'
  | 'your_name'
  | 'subscribe'
  | 'enter_email'
  | 'newsletter_success'
  | 'newsletter_error'
  | 'comments'
  | 'write_comment'
  | 'post_comment'
  | 'login_required'
  | 'login_to_comment'
  | 'comment_added'
  | 'comment_success'
  | 'comment_error'
  | 'no_comments'
  | 'like'
  | 'follow_on'
  | 'redirect_to'
  | 'of_rtvam'
  | 'share'
  | 'link_copied'
  | 'connect_with_us'
  | 'see_more_on'
  | 'featured_videos'
  | 'featured_programs'
  | 'follow_us'
  | 'followers'
  | 'subscribers'
  | 'subscribe_to'
  | 'share_our_site'
  | 'home'
  | 'programação'
  | 'notícias'
  | 'rádio'
  | 'sobre'
  | 'programas'
  | 'entretenimento'
  | 'manhã'
  | 'tarde'
  | 'noite'
  | 'jornal'
  | 'síntese'
  | 'revista';

// Translation dictionary type
type TranslationDict = Record<TranslationKey, string>;

// Portuguese translations
const ptTranslations: TranslationDict = {
  login: 'Entrar',
  logout: 'Sair',
  register: 'Registrar',
  email: 'E-mail',
  password: 'Senha',
  your_email: 'Seu e-mail',
  your_password: 'Sua senha',
  enter_email_password: 'Por favor, insira e-mail e senha',
  password_too_short: 'A senha deve ter pelo menos 6 caracteres',
  password_requirement: 'A senha deve ter pelo menos 6 caracteres',
  account_access: 'Acesso à Conta',
  account_access_description: 'Entre ou registre-se para aceder a todas as funcionalidades',
  login_with_google: 'Entrar com Google',
  toggle_theme: 'Alternar Tema',
  dark_mode: 'Modo Escuro',
  light_mode: 'Modo Claro',
  language: 'Idioma',
  error: 'Erro',
  success: 'Sucesso',
  newsletter: 'Boletim Informativo',
  newsletter_description: 'Subscreva para receber as últimas notícias',
  name: 'Nome',
  your_name: 'Seu nome',
  subscribe: 'Subscrever',
  enter_email: 'Por favor, insira um e-mail válido',
  newsletter_success: 'Obrigado por subscrever o nosso boletim!',
  newsletter_error: 'Erro ao subscrever. Por favor, tente novamente.',
  comments: 'Comentários',
  write_comment: 'Escreva um comentário...',
  post_comment: 'Publicar Comentário',
  login_required: 'Login Necessário',
  login_to_comment: 'Faça login para comentar',
  comment_added: 'Comentário Adicionado',
  comment_success: 'Seu comentário foi publicado com sucesso!',
  comment_error: 'Erro ao adicionar comentário. Por favor, tente novamente.',
  no_comments: 'Ainda não há comentários. Seja o primeiro a comentar!',
  like: 'Gostar',
  follow_on: 'Seguir em',
  redirect_to: 'Redirecionar para',
  of_rtvam: 'da RTVAM',
  share: 'Compartilhar',
  link_copied: 'Link copiado!',
  connect_with_us: 'Conecte-se conosco',
  see_more_on: 'Ver mais em',
  featured_videos: 'Vídeos em Destaque',
  featured_programs: 'Programas em Destaque',
  follow_us: 'Siga-nos',
  followers: 'seguidores',
  subscribers: 'inscritos',
  subscribe_to: 'Inscrever-se em',
  share_our_site: 'Compartilhe nosso site',
  home: 'Início',
  'programação': 'Programação',
  'notícias': 'Notícias',
  'rádio': 'Rádio',
  'sobre': 'Sobre Nós',
  'programas': 'Programas',
  'entretenimento': 'Entretenimento',
  'manhã': 'Manhã',
  'tarde': 'Tarde',
  'noite': 'Noite',
  'jornal': 'Jornal',
  'síntese': 'Síntese',
  'revista': 'Revista'
};

// English translations
const enTranslations: TranslationDict = {
  login: 'Login',
  logout: 'Logout',
  register: 'Register',
  email: 'Email',
  password: 'Password',
  your_email: 'Your email',
  your_password: 'Your password',
  enter_email_password: 'Please enter email and password',
  password_too_short: 'Password must be at least 6 characters',
  password_requirement: 'Password must be at least 6 characters',
  account_access: 'Account Access',
  account_access_description: 'Login or register to access all features',
  login_with_google: 'Login with Google',
  toggle_theme: 'Toggle Theme',
  dark_mode: 'Dark Mode',
  light_mode: 'Light Mode',
  language: 'Language',
  error: 'Error',
  success: 'Success',
  newsletter: 'Newsletter',
  newsletter_description: 'Subscribe to receive the latest news',
  name: 'Name',
  your_name: 'Your name',
  subscribe: 'Subscribe',
  enter_email: 'Please enter a valid email',
  newsletter_success: 'Thank you for subscribing to our newsletter!',
  newsletter_error: 'Error subscribing. Please try again.',
  comments: 'Comments',
  write_comment: 'Write a comment...',
  post_comment: 'Post Comment',
  login_required: 'Login Required',
  login_to_comment: 'Please login to comment',
  comment_added: 'Comment Added',
  comment_success: 'Your comment was successfully posted!',
  comment_error: 'Error adding comment. Please try again.',
  no_comments: 'No comments yet. Be the first to comment!',
  like: 'Like',
  follow_on: 'Follow on',
  redirect_to: 'Redirect to',
  of_rtvam: 'of RTVAM',
  share: 'Share',
  link_copied: 'Link copied!',
  connect_with_us: 'Connect with us',
  see_more_on: 'See more on',
  featured_videos: 'Featured Videos',
  featured_programs: 'Featured Programs',
  follow_us: 'Follow us',
  followers: 'followers',
  subscribers: 'subscribers',
  subscribe_to: 'Subscribe to',
  share_our_site: 'Share our site',
  home: 'Home',
  'programação': 'Programming',
  'notícias': 'News',
  'rádio': 'Radio',
  'sobre': 'About Us',
  'programas': 'Programs',
  'entretenimento': 'Entertainment',
  'manhã': 'Morning',
  'tarde': 'Afternoon',
  'noite': 'Night',
  'jornal': 'Journal',
  'síntese': 'Summary',
  'revista': 'Review'
};

// Create language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  // Translate function
  const t = (key: TranslationKey): string => {
    return language === 'pt'
      ? ptTranslations[key]
      : enTranslations[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
