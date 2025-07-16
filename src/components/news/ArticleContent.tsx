
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag } from 'lucide-react';

interface ArticleContentProps {
  title: string;
  image: string;
  date: string;
  categoryTitle: string;
  content: string[];
  subTitle?: string;
  categoryId: string;
  formatDate: (dateString: string) => string;
  source?: string;
}

const ArticleContent = ({
  title,
  image,
  date,
  categoryTitle,
  content,
  subTitle,
  categoryId,
  formatDate,
  source
}: ArticleContentProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-6">
      {/* Article Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Badge variant="secondary" className="bg-rtam-blue text-white">
            {categoryTitle}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(date)}
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>
        
        {subTitle && (
          <h2 className="text-xl text-gray-600 mb-4">{subTitle}</h2>
        )}
      </div>

      {/* Featured Image */}
      <div className="mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Source Attribution */}
      {source && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Fonte: {source}
          </p>
        </div>
      )}

      {/* Article Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/noticias/${categoryId}`}
              className="text-rtam-blue hover:text-rtam-blue-dark transition-colors"
            >
              <Tag className="w-4 h-4 inline mr-1" />
              Mais em {categoryTitle}
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Partilhar:</span>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;
