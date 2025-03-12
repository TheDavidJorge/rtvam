
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

interface ArticleContentProps {
  title: string;
  image: string;
  date: string;
  categoryTitle: string;
  content: string[];
  subTitle: string;
  categoryId: string;
  formatDate: (dateString: string) => string;
}

const ArticleContent = ({ 
  title, 
  image, 
  date, 
  categoryTitle, 
  content, 
  subTitle,
  categoryId,
  formatDate
}: ArticleContentProps) => {
  return (
    <div className="lg:w-2/3 animate-fade-in">
      <div className="mb-4">
        <Link to="/" className="text-rtam-blue hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
      </div>
      
      <span className="inline-block bg-rtam-blue text-white text-xs px-2 py-1 rounded mb-3 uppercase">
        {categoryTitle}
      </span>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      
      <div className="flex items-center text-gray-500 mb-6">
        <span>{formatDate(date)}</span>
      </div>
      
      <img 
        src={image} 
        alt={title} 
        className="w-full h-auto rounded-lg mb-6 object-cover"
        style={{ maxHeight: "500px" }}
      />
      
      <div className="prose max-w-none mb-8">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
        ))}
        <h2 className="text-xl font-bold mb-3 mt-6">{subTitle}</h2>
        <p className="text-gray-700 mb-4">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ullamcorper, 
          ipsum vel condimentum rhoncus, nulla augue ultrices augue, vel commodo magna nulla non enim. Donec rutrum 
          condimentum nunc, vel commodo magna.
        </p>
      </div>
      
      {/* Social Share */}
      <div className="flex items-center justify-between border-t border-b py-4 my-8">
        <div className="text-gray-700 font-medium">Partilhar:</div>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Facebook size={18} />
          </button>
          <button className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
            <Twitter size={18} />
          </button>
          <button className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors">
            <Linkedin size={18} />
          </button>
          <button className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
