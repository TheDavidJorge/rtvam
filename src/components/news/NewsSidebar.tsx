
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '@/types/news';

interface NewsSidebarProps {
  relatedNews: NewsItem[];
  popularNews: NewsItem[];
  formatDate: (dateString: string) => string;
}

const NewsSidebar = ({ relatedNews, popularNews, formatDate }: NewsSidebarProps) => {
  return (
    <div className="lg:w-1/3">
      {/* Featured News */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-rtam-blue mb-4 pb-2 border-b">Destaques</h3>
        <div className="space-y-4">
          {relatedNews.map(item => (
            <Link 
              key={item.id} 
              to={`/noticias/${item.category}/${item.id}`}
              className="group flex gap-3 pb-3 border-b border-gray-200 last:border-0"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-20 h-16 object-cover rounded flex-shrink-0"
              />
              <div>
                <h4 className="font-medium text-gray-800 group-hover:text-rtam-blue transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Popular News */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-rtam-blue mb-4 pb-2 border-b">Mais Lidas</h3>
        <div className="space-y-4">
          {popularNews.map((item, index) => (
            <Link 
              key={item.id} 
              to={`/noticias/${item.category}/${item.id}`}
              className="group flex gap-3 pb-3 border-b border-gray-200 last:border-0"
            >
              <span className="w-6 h-6 bg-rtam-blue text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <h4 className="font-medium text-gray-800 group-hover:text-rtam-blue transition-colors line-clamp-2">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
