
import { 
  Menu, X, ChevronDown, Radio, Tv, Home, Info, 
  Newspaper, Calendar, ChevronRight, FileText, Music, Sun, Moon
} from 'lucide-react';

// Define navigation structure with nested menus
export const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { 
    name: 'Programação', 
    href: '/programacao',
    icon: Calendar,
    children: [
      { 
        name: 'Programas Noticiosos', 
        href: '/programacao/noticias',
        icon: Newspaper,
        children: [
          { name: 'Jornal Académico', href: '/programacao/noticias/jornal-academico', icon: FileText },
          { name: 'Síntese Informativa', href: '/programacao/noticias/sintese-informativa', icon: FileText },
          { name: 'Revista de Imprensa', href: '/programacao/noticias/revista-imprensa', icon: FileText },
        ]
      },
      { 
        name: 'Programas de Entretenimento', 
        href: '/programacao/entretenimento',
        icon: Music,
        children: [
          { name: 'Manhã Académica', href: '/programacao/entretenimento/manha-academica', icon: Sun },
          { name: 'Tarde Académica', href: '/programacao/entretenimento/tarde-academica', icon: Sun },
          { name: 'Noite Académica', href: '/programacao/entretenimento/noite-academica', icon: Moon },
        ]
      },
    ]
  },
  { name: 'Notícias', href: '/noticias', icon: Newspaper },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'TV Directo', href: '/tv', icon: Tv },
  { name: 'Sobre Nós', href: '/sobre', icon: Info },
];
