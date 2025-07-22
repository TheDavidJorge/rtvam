
import { 
  Home, Info, 
  Newspaper, Calendar, Radio, Tv
} from 'lucide-react';

// Simplified navigation structure
export const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Programação', href: '/programacao', icon: Calendar },
  { name: 'Notícias', href: '/noticias', icon: Newspaper },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'TV Directo', href: '/tv', icon: Tv },
  { name: 'TVA 2', href: '/tva', icon: Tv },
  { name: 'Dashboard', href: '/dashboard', icon: Info },
];
