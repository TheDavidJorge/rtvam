
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

// Sample featured programs data
const featuredPrograms = [
  {
    id: 1,
    title: 'Manhã Académica',
    description: 'O melhor programa para começar o seu dia com música e informação.',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '06:00 - 09:00',
    days: 'Segunda a Sexta',
    link: '/programacao/entretenimento/manha-academica',
  },
  {
    id: 2,
    title: 'Jornal Académico',
    description: 'Todas as notícias relevantes para a comunidade académica.',
    image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '13:00 - 14:00',
    days: 'Segunda a Sexta',
    link: '/programacao/noticias/jornal-academico',
  },
  {
    id: 3,
    title: 'Debate Académico',
    description: 'Discussões aprofundadas sobre temas relevantes para a academia.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '19:00 - 20:30',
    days: 'Terças e Quintas',
    link: '/programacao/entretenimento/debate-academico',
  },
  {
    id: 4,
    title: 'Noite Académica',
    description: 'Música e entretenimento para relaxar depois de um dia de estudo.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '20:30 - 22:00',
    days: 'Segunda a Sexta',
    link: '/programacao/entretenimento/noite-academica',
  },
];

const FeaturedPrograms = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-rtam-blue mb-2">Programação em Destaque</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira os programas mais populares da Rádio e Televisão Académica de Moçambique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrograms.map((program) => (
            <div 
              key={program.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium">{program.time}</p>
                    <p className="text-xs opacity-80">{program.days}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={program.link}
                    className="p-3 bg-rtam-red rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform"
                    aria-label={`Assistir ${program.title}`}
                  >
                    <Play className="w-6 h-6" />
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-rtam-blue-dark group-hover:text-rtam-blue transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {program.description}
                </p>
                <Link
                  to={program.link}
                  className="text-rtam-blue text-sm font-medium hover:text-rtam-blue-dark inline-flex items-center"
                >
                  Ver detalhes
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/programacao" 
            className="btn-primary"
          >
            Ver Programação Completa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
