
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { categories } from '@/data/newsData';

const NewsDetail = () => {
  const { categoryId, newsId } = useParams();
  
  // Find the news item
  const category = categories.find((cat) => cat.id === categoryId);
  const newsItem = category?.news.find((item) => item.id === Number(newsId));
  
  // Find related news (from all categories)
  const relatedNews = categories
    .flatMap(cat => cat.news)
    .filter(item => item.id !== Number(newsId))
    .slice(0, 3);
  
  // Find popular news
  const popularNews = categories
    .flatMap(cat => cat.news)
    .filter(item => item.id !== Number(newsId))
    .slice(0, 5);
  
  // Navigate to previous and next news
  const allNews = categories.flatMap(cat => cat.news).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = allNews.findIndex(item => item.id === Number(newsId) && item.category === categoryId);
  const prevNews = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
  const nextNews = currentIndex > 0 ? allNews[currentIndex - 1] : null;
  
  // Format date to localized string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-PT', options);
  };
  
  // Generate fictional content for any news item, even if not found
  const generateFictionalContent = () => {
    // If we have the actual news item, use its information
    const title = newsItem?.title || "Notícia de exemplo";
    const image = newsItem?.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    const date = newsItem?.date || new Date().toISOString().split('T')[0];
    const categoryTitle = category?.title || "Categoria";
    
    return {
      title,
      image,
      date,
      categoryTitle,
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
        "Suspendisse potenti. Nulla facilisi. Sed feugiat varius nisi, at euismod nunc tincidunt at. Maecenas fermentum, metus in auctor dignissim, quam tellus sollicitudin nunc, at dapibus eros tellus at neque. Etiam eu scelerisque ante, vel commodo magna.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ullamcorper, ipsum vel condimentum rhoncus, nulla augue ultrices augue, vel commodo magna nulla non enim. Donec rutrum condimentum nunc, vel commodo magna."
      ],
      subTitle: "Subtítulo da notícia"
    };
  };
  
  const articleContent = generateFictionalContent();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3 animate-fade-in">
              <div className="mb-4">
                <Link to="/" className="text-rtam-blue hover:underline inline-flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
                </Link>
              </div>
              
              <span className="inline-block bg-rtam-blue text-white text-xs px-2 py-1 rounded mb-3 uppercase">
                {articleContent.categoryTitle}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{articleContent.title}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <span>{formatDate(articleContent.date)}</span>
              </div>
              
              <img 
                src={articleContent.image} 
                alt={articleContent.title} 
                className="w-full h-auto rounded-lg mb-6 object-cover"
                style={{ maxHeight: "500px" }}
              />
              
              <div className="prose max-w-none mb-8">
                {articleContent.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                ))}
                <h2 className="text-xl font-bold mb-3 mt-6">{articleContent.subTitle}</h2>
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
              
              {/* Navigation between news */}
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
            </div>
            
            {/* Sidebar */}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
