
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '@/types/news';
import { Clock, TrendingUp } from 'lucide-react';

interface NewsSidebarProps {
  relatedNews: NewsItem[];
  popularNews: NewsItem[];
  formatDate: (dateString: string) => string;
}

const NewsSidebar = ({ relatedNews, popularNews, formatDate }: NewsSidebarProps) => {
  return (
    <div className="lg:w-1/3 space-y-6">
      {/* Featured News - Destaques */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4 pb-2 border-b">
          <TrendingUp className="w-5 h-5 text-rtam-blue mr-2" />
          <h3 className="text-xl font-bold text-rtam-blue">Destaques</h3>
        </div>
        {relatedNews.length > 0 ? (
          <div className="space-y-4">
            {relatedNews.map(item => (
              <Link 
                key={item.id} 
                to={`/noticias/${item.category}/${item.id}`}
                className="group flex gap-3 pb-3 border-b border-gray-200 last:border-0 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 group-hover:text-rtam-blue transition-colors line-clamp-2 text-sm">
                    {item.title}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma notícia em destaque disponível.</p>
        )}
      </div>
      
      {/* Popular News - Mais Lidas */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4 pb-2 border-b">
          <TrendingUp className="w-5 h-5 text-rtam-blue mr-2" />
          <h3 className="text-xl font-bold text-rtam-blue">Mais Lidas</h3>
        </div>
        {popularNews.length > 0 ? (
          <div className="space-y-4">
            {popularNews.map((item, index) => (
              <Link 
                key={item.id} 
                to={`/noticias/${item.category}/${item.id}`}
                className="group flex gap-3 pb-3 border-b border-gray-200 last:border-0 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <div className="w-6 h-6 bg-rtam-blue text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 group-hover:text-rtam-blue transition-colors line-clamp-2 text-sm">
                    {item.title}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma notícia popular disponível.</p>
        )}
      </div>
    </div>
  );
};

export default NewsSidebar;
