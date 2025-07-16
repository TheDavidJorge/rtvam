import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedPrograms = () => {
  const { t } = useLanguage();

  const programs = [
    {
      id: 1,
      title: 'Diário Informativo',
      description: 'Resumo diário das principais notícias nacionais e internacionais',
      time: '07:00 - 08:00',
      image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Informativo'
    },
    {
      id: 2,
      title: 'Estilo e Moda',
      description: 'Programa dedicado às tendências de moda e estilo de vida',
      time: '15:00 - 16:00',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Lifestyle'
    },
    {
      id: 3,
      title: 'A Voz do Povo',
      description: 'Programa interativo que dá voz aos cidadãos moçambicanos',
      time: '12:00 - 13:00',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Participativo'
    },
    {
      id: 4,
      title: 'Super Tardes',
      description: 'Entretenimento e música para as suas tardes',
      time: '16:00 - 18:00',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Entretenimento'
    },
    {
      id: 5,
      title: 'Jornal TVA',
      description: 'Jornal televisivo com as notícias mais importantes do dia',
      time: '20:00 - 21:00',
      image: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Informativo'
    }
  ];

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-rtam-blue-dark mb-4">{t('featured_programs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Card key={program.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2">{program.title}</CardTitle>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{program.description}</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="w-4 h-4 mr-1" />
                  {program.time}
                </div>
                <div className="flex items-center mt-2 text-gray-500 text-xs">
                  <Calendar className="w-4 h-4 mr-1" />
                  {program.category}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
