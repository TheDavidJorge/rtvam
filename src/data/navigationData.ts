
import { 
  Menu, X, ChevronDown, Radio, Tv, Home, Info, 
  Newspaper, Calendar, ChevronRight 
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
        children: [
          { name: 'Jornal Académico', href: '/programacao/noticias/jornal-academico' },
          { name: 'Síntese Informativa', href: '/programacao/noticias/sintese-informativa' },
          { name: 'Revista de Imprensa', href: '/programacao/noticias/revista-imprensa' },
        ]
      },
      { 
        name: 'Programas de Entretenimento', 
        href: '/programacao/entretenimento',
        children: [
          { name: 'Manhã Académica', href: '/programacao/entretenimento/manha-academica' },
          { name: 'Tarde Académica', href: '/programacao/entretenimento/tarde-academica' },
          { name: 'Noite Académica', href: '/programacao/entretenimento/noite-academica' },
        ]
      },
    ]
  },
  { name: 'Notícias', href: '/noticias', icon: Newspaper },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'TV Directo', href: '/tv', icon: Tv },
  { name: 'Sobre Nós', href: '/sobre', icon: Info },
];
