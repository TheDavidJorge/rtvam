
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NewsItem } from '@/types/news';

interface ArticleNavigationProps {
  prevNews: NewsItem | null;
  nextNews: NewsItem | null;
}

const ArticleNavigation = ({ prevNews, nextNews }: ArticleNavigationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 mb-8">
      {prevNews && (
        <Link 
          to={`/noticias/${prevNews.category}/${prevNews.id}`}
          className="group flex flex-col p-4 border rounded-lg hover:border-rtam-blue transition-colors"
        >
          <span className="text-gray-500 flex items-center mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Anterior
          </span>
          <span className="font-medium group-hover:text-rtam-blue transition-colors line-clamp-2">
            {prevNews.title}
          </span>
        </Link>
      )}
      
      {nextNews && (
        <Link 
          to={`/noticias/${nextNews.category}/${nextNews.id}`}
          className="group flex flex-col p-4 border rounded-lg hover:border-rtam-blue transition-colors text-right md:ml-auto"
        >
          <span className="text-gray-500 flex items-center justify-end mb-2">
            Próxima <ArrowRight className="w-4 h-4 ml-1" />
          </span>
          <span className="font-medium group-hover:text-rtam-blue transition-colors line-clamp-2">
            {nextNews.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default ArticleNavigation;
