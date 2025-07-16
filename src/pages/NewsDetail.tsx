
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArticleContent from '@/components/news/ArticleContent';
import ArticleNavigation from '@/components/news/ArticleNavigation';
import NewsSidebar from '@/components/news/NewsSidebar';
import CommentSection from '@/components/common/CommentSection';
import NewsletterSubscription from '@/components/common/NewsletterSubscription';
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
  
  // Generate content for any news item
  const generateContent = () => {
    const title = newsItem?.title || "Notícia de exemplo";
    const image = newsItem?.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    const date = newsItem?.date || new Date().toISOString().split('T')[0];
    const categoryTitle = category?.title || "Categoria";
    const source = newsItem?.source || "Fonte não disponível";
    
    return {
      title,
      image,
      date,
      categoryTitle,
      source,
      content: [
        "Esta é uma notícia de exemplo com conteúdo informativo relevante para os leitores. O conteúdo real seria fornecido através de uma API ou sistema de gestão de conteúdo.",
        "Aqui continuaria o desenvolvimento da notícia com mais detalhes, citações e informações contextuais importantes para uma compreensão completa do assunto.",
        "O artigo terminaria com uma conclusão ou resumo dos pontos principais abordados, fornecendo ao leitor uma visão clara e completa do tema tratado."
      ],
      subTitle: "Subtítulo informativo da notícia"
    };
  };
  
  const articleContent = generateContent();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <ArticleContent 
                title={articleContent.title}
                image={articleContent.image}
                date={articleContent.date}
                categoryTitle={articleContent.categoryTitle}
                content={articleContent.content}
                subTitle={articleContent.subTitle}
                categoryId={categoryId || ''}
                formatDate={formatDate}
                source={articleContent.source}
              />
              
              {/* Comment Section */}
              <div className="mt-8 border-t pt-8">
                <CommentSection postId={`${categoryId}-${newsId}`} />
              </div>
              
              {/* Navigation between news */}
              <div className="mt-8">
                <ArticleNavigation prevNews={prevNews} nextNews={nextNews} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <NewsSidebar 
                relatedNews={relatedNews}
                popularNews={popularNews}
                formatDate={formatDate}
              />
              
              {/* Newsletter Subscription */}
              <NewsletterSubscription />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
