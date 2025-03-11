
import React from 'react';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: number;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  category: string;
  url: string;
  featured?: boolean;
}

// Format date to localized string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  date,
  image,
  category,
  url,
  featured = false,
}) => {
  if (featured) {
    return (
      <Link 
        to={url} 
        className="group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <div className="absolute top-4 left-4">
              <span className="bg-rtam-red text-white text-xs px-2 py-1 rounded-md uppercase font-medium">
                {category}
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-rtam-blue transition-colors line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
              {excerpt}
            </p>
          )}
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
            <span className="text-gray-500 text-sm">
              {formatDate(date)}
            </span>
            <span className="text-rtam-blue font-medium text-sm">Ler mais</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={url} 
      className="group flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="w-1/3 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="w-2/3 p-4">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-rtam-red">{category}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{formatDate(date)}</span>
        </div>
        <h3 className="font-bold text-gray-800 group-hover:text-rtam-blue transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
