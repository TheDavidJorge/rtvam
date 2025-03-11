
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { ChevronRight } from 'lucide-react';

// Sample data for featured news
const featuredNews = [
  {
    id: 1,
    title: 'Universidade Eduardo Mondlane celebra 60 anos com série de eventos acadêmicos',
    excerpt: 'A mais antiga instituição de ensino superior de Moçambique comemora seis décadas de contribuição para o desenvolvimento do país com uma programação especial que inclui conferências, exposições e atividades culturais.',
    date: '2023-05-28',
    category: 'Educação',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/educacao/1',
  },
  {
    id: 2,
    title: 'Pesquisadores moçambicanos desenvolvem novo método para tratamento de água em comunidades rurais',
    excerpt: 'Equipe de cientistas da Faculdade de Engenharia cria solução de baixo custo que pode beneficiar milhares de pessoas sem acesso à água potável em todo o país.',
    date: '2023-05-27',
    category: 'Ciência',
    image: 'https://images.unsplash.com/photo-1581093458791-9ecdcce682b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/ciencia/2',
  },
  {
    id: 3,
    title: 'Festival de Arte Estudantil reúne talentos de universidades de todo o país',
    excerpt: 'Evento anual que acontece em Maputo promove intercâmbio cultural entre instituições de ensino superior e oferece oficinas, exposições e apresentações.',
    date: '2023-05-26',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/cultura/3',
  },
];

// Sample data for latest news
const latestNews = [
  {
    id: 1,
    title: 'Competição de startups premia projetos inovadores de estudantes universitários',
    date: '2023-05-28',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/tecnologia/1',
  },
  {
    id: 2,
    title: 'Conferência sobre mudanças climáticas debate impactos para Moçambique',
    date: '2023-05-28',
    category: 'Ambiente',
    image: 'https://images.unsplash.com/photo-1569389397653-c04fe624e663?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/ambiente/2',
  },
  {
    id: 3,
    title: 'Seleção universitária de basquete conquista medalha de ouro em torneio internacional',
    date: '2023-05-27',
    category: 'Desporto',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/desporto/3',
  },
  {
    id: 4,
    title: 'Estudo revela aumento no número de estudantes universitários em Moçambique',
    date: '2023-05-27',
    category: 'Educação',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/educacao/4',
  },
  {
    id: 5,
    title: 'Programa de intercâmbio oferece bolsas para estudantes moçambicanos em Portugal',
    date: '2023-05-26',
    category: 'Educação',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/educacao/5',
  },
  {
    id: 6,
    title: 'Ministério da Saúde e universidades lançam campanha de prevenção a doenças',
    date: '2023-05-26',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/noticias/saude/6',
  },
];

// Sample data for all news with categories
const categories = [
  'Todas', 'Educação', 'Ciência', 'Tecnologia', 'Cultura', 'Desporto', 
  'Saúde', 'Ambiente', 'Sociedade', 'Política', 'Economia'
];

// Combine featured and latest news for all news
const allNews = [...featuredNews, ...latestNews];

const News = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  
  // Filter news by category
  const filteredNews = activeCategory === 'Todas' 
    ? allNews 
    : allNews.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero section with featured news carousel */}
        <section className="bg-white py-10 shadow-sm">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-rtam-blue mb-8">Notícias</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <div key={news.id} className="animate-fade-in">
                  <NewsCard {...news} featured={true} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-20">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto hide-scrollbar py-2 space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-rtam-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main news column */}
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-rtam-blue-dark mb-6">
                  {activeCategory === 'Todas' ? 'Últimas Notícias' : `Notícias de ${activeCategory}`}
                </h2>
                
                <div className="space-y-6 animate-fade-in">
                  {filteredNews.map((news) => (
                    <NewsCard key={news.id} {...news} />
                  ))}
                </div>
                
                {/* Pagination placeholder */}
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      Anterior
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-rtam-blue text-white rounded-md"
                    >
                      1
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      3
                    </a>
                    <span className="px-4 py-2 text-gray-600">...</span>
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      Próxima
                    </a>
                  </nav>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-36">
                  <h3 className="text-xl font-bold text-rtam-blue-dark mb-4">Notícias Populares</h3>
                  
                  <div className="space-y-4">
                    {latestNews.slice(0, 5).map((news) => (
                      <a 
                        key={news.id} 
                        href={news.url} 
                        className="flex items-start space-x-3 group"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-rtam-blue transition-colors line-clamp-2">
                            {news.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{news.category}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-rtam-blue-dark mb-4">Categorias</h3>
                    <div className="space-y-2">
                      {categories.filter(cat => cat !== 'Todas').map((category) => (
                        <button
                          key={category}
                          className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setActiveCategory(category)}
                        >
                          <span>{category}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
