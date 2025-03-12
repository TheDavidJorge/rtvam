
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Category } from '@/types/news';

interface NewsByCategoryProps {
  category: Category;
  formatDate: (dateString: string) => string;
}

const NewsByCategory = ({ category, formatDate }: NewsByCategoryProps) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-rtam-blue">{category.title}</h3>
        <Link 
          to={`/noticias/${category.id}`} 
          className="text-rtam-blue hover:text-rtam-blue-dark transition-colors flex items-center text-sm"
        >
          Ver todas <ArrowRight className="ml-1 w-4 h-4" />
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
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 group-hover:text-rtam-blue transition-colors mb-2 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(item.date)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsByCategory;
