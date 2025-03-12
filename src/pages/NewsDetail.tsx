
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArticleContent from '@/components/news/ArticleContent';
import ArticleNavigation from '@/components/news/ArticleNavigation';
import NewsSidebar from '@/components/news/NewsSidebar';
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
            <ArticleContent 
              title={articleContent.title}
              image={articleContent.image}
              date={articleContent.date}
              categoryTitle={articleContent.categoryTitle}
              content={articleContent.content}
              subTitle={articleContent.subTitle}
              categoryId={categoryId || ''}
              formatDate={formatDate}
            />
            
            {/* Sidebar */}
            <NewsSidebar 
              relatedNews={relatedNews}
              popularNews={popularNews}
              formatDate={formatDate}
            />
          </div>
          
          {/* Navigation between news */}
          <ArticleNavigation prevNews={prevNews} nextNews={nextNews} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
