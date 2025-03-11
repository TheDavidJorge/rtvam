
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/newsData';

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
                    to={`/noticias/${category.id}/${item.id}`}
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
