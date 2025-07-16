
import { Category } from '@/types/news';

export const categories: Category[] = [
  {
    id: 'nacionais',
    title: 'Notícias Nacionais',
    news: [
      {
        id: 1,
        title: 'Governo aprova estratégia para combater a malária nas escolas',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/nacionais/1',
        category: 'nacionais',
        source: 'O País'
      },
      {
        id: 2,
        title: 'Assembleia da República debate orçamento do Estado para 2024',
        date: '2024-01-14',
        image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/nacionais/2',
        category: 'nacionais',
        source: 'Lusa'
      },
      {
        id: 3,
        title: 'Presidente da República inaugura novo hospital em Maputo',
        date: '2024-01-13',
        image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/nacionais/3',
        category: 'nacionais',
        source: 'O País'
      },
      {
        id: 4,
        title: 'Campanha de vacinação contra a COVID-19 atinge 70% da população',
        date: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/nacionais/4',
        category: 'nacionais',
        source: 'Lusa'
      }
    ]
  },
  {
    id: 'desporto',
    title: 'Desporto',
    news: [
      {
        id: 1,
        title: 'Costa do Sol vence Ferroviário e mantém liderança do Moçambola',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/1',
        category: 'desporto',
        source: 'O País'
      },
      {
        id: 2,
        title: 'Seleção nacional de futebol prepara-se para qualificação mundial',
        date: '2024-01-14',
        image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/2',
        category: 'desporto',
        source: 'O País'
      },
      {
        id: 3,
        title: 'Atletas moçambicanos destacam-se nos Jogos Africanos',
        date: '2024-01-13',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/3',
        category: 'desporto',
        source: 'O País'
      },
      {
        id: 4,
        title: 'Reinildo Mandava renova contrato com Atlético de Madrid',
        date: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/4',
        category: 'desporto',
        source: 'O País'
      }
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura',
    news: [
      {
        id: 1,
        title: 'Festival de Música Tradicional promove diversidade cultural',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/1',
        category: 'cultura',
        source: 'O País'
      },
      {
        id: 2,
        title: 'Museu Nacional de Arte inaugura nova exposição',
        date: '2024-01-14',
        image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/2',
        category: 'cultura',
        source: 'O País'
      },
      {
        id: 3,
        title: 'Escritores moçambicanos recebem prémios internacionais',
        date: '2024-01-13',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/3',
        category: 'cultura',
        source: 'O País'
      },
      {
        id: 4,
        title: 'Teatro Nacional apresenta nova peça sobre história de Moçambique',
        date: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/4',
        category: 'cultura',
        source: 'O País'
      }
    ]
  },
  {
    id: 'economia',
    title: 'Economia',
    news: [
      {
        id: 1,
        title: 'Banco de Moçambique mantém taxa de juro de referência',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/economia/1',
        category: 'economia',
        source: 'Lusa'
      },
      {
        id: 2,
        title: 'Exportações de gás natural registam crescimento de 15%',
        date: '2024-01-14',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/economia/2',
        category: 'economia',
        source: 'Lusa'
      },
      {
        id: 3,
        title: 'Investimento estrangeiro direto aumenta 20% em 2023',
        date: '2024-01-13',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/economia/3',
        category: 'economia',
        source: 'Lusa'
      },
      {
        id: 4,
        title: 'Setor agrícola mostra sinais de recuperação após seca',
        date: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/economia/4',
        category: 'economia',
        source: 'Lusa'
      }
    ]
  }
];
