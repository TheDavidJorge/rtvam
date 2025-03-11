
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Sample news data for each category
const categories = [
  {
    id: 'desporto',
    title: 'Desporto',
    news: [
      {
        id: 1,
        title: 'Universidade de Maputo vence campeonato interuniversitário de futebol',
        date: '2023-05-28',
        image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/1',
      },
      {
        id: 2,
        title: 'Atletas universitários representarão Moçambique nos Jogos Africanos',
        date: '2023-05-26',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/2',
      },
      {
        id: 3,
        title: 'Nova pista de atletismo inaugurada no campus universitário',
        date: '2023-05-24',
        image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/3',
      },
      {
        id: 4,
        title: 'Equipe de basquete feminino conquista título regional',
        date: '2023-05-22',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/desporto/4',
      },
    ],
  },
  {
    id: 'mundo',
    title: 'Mundo',
    news: [
      {
        id: 1,
        title: 'Conferência internacional sobre mudanças climáticas acontece em Maputo',
        date: '2023-05-28',
        image: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/mundo/1',
      },
      {
        id: 2,
        title: 'Pesquisadores moçambicanos participam de projeto global de saúde',
        date: '2023-05-27',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/mundo/2',
      },
      {
        id: 3,
        title: 'União Africana discute novas políticas educacionais para o continente',
        date: '2023-05-25',
        image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/mundo/3',
      },
      {
        id: 4,
        title: 'Intercâmbio acadêmico entre Moçambique e Portugal é ampliado',
        date: '2023-05-23',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/mundo/4',
      },
    ],
  },
  {
    id: 'sociedade',
    title: 'Sociedade',
    news: [
      {
        id: 1,
        title: 'Projeto social de estudantes leva educação a comunidades rurais',
        date: '2023-05-28',
        image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/sociedade/1',
      },
      {
        id: 2,
        title: 'Festival cultural universitário celebra diversidade de Moçambique',
        date: '2023-05-27',
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/sociedade/2',
      },
      {
        id: 3,
        title: 'Debate sobre igualdade de gênero mobiliza campus universitário',
        date: '2023-05-26',
        image: 'https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/sociedade/3',
      },
      {
        id: 4,
        title: 'Voluntários acadêmicos organizam campanha de doação de sangue',
        date: '2023-05-25',
        image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/sociedade/4',
      },
    ],
  },
  {
    id: 'cultura',
    title: 'Cultura',
    news: [
      {
        id: 1,
        title: 'Exposição de arte estudantil atrai visitantes ao campus universitário',
        date: '2023-05-28',
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/1',
      },
      {
        id: 2,
        title: 'Grupo teatral universitário estreia peça sobre história de Moçambique',
        date: '2023-05-27',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/2',
      },
      {
        id: 3,
        title: 'Festival de cinema universitário apresenta produções locais',
        date: '2023-05-26',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/3',
      },
      {
        id: 4,
        title: 'Concurso de música revela novos talentos da cena acadêmica',
        date: '2023-05-25',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '/noticias/cultura/4',
      },
    ],
  },
];

// Format date to localized string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

const LatestNews = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-rtam-blue mb-2">Últimas Notícias</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das últimas notícias em diversas categorias
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-rtam-blue-dark">{category.title}</h3>
                <Link 
                  to={`/noticias/${category.id}`} 
                  className="text-rtam-blue hover:text-rtam-blue-dark transition-colors flex items-center"
                >
                  Ver mais <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.news.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.url}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-4">
                          <p className="text-white text-sm">{formatDate(item.date)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 group-hover:text-rtam-blue transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm">{formatDate(item.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
