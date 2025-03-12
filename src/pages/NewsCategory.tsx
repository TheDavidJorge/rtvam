
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/data/newsData';

const NewsCategory = () => {
  const { categoryId } = useParams();
  
  // Find the category
  const category = categories.find((cat) => cat.id === categoryId);
  
  // Format date to localized string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-PT', options);
  };
  
  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16 page-container">
          <div className="py-12 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Categoria não encontrada</h1>
            <p className="mb-6">A categoria que procura não foi encontrada.</p>
            <Link to="/" className="bg-rtam-blue text-white px-4 py-2 rounded hover:bg-rtam-blue-dark">Voltar à página inicial</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 animate-fade-in">
          <div className="mb-4">
            <Link to="/" className="text-rtam-blue hover:underline inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-rtam-blue mb-8">{category.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.news.map((item) => (
              <Link 
                key={item.id} 
                to={`/noticias/${categoryId}/${item.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
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
      </main>
      <Footer />
    </div>
  );
};

export default NewsCategory;
