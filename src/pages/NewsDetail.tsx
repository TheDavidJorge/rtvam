
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
  
  // Get all news items for better selection
  const allNews = categories.flatMap(cat => cat.news);
  
  // Find related news (from same category first, then others, excluding current)
  const relatedNews = React.useMemo(() => {
    const currentNewsId = Number(newsId);
    
    // First, try to get news from the same category
    const sameCategoryNews = category?.news.filter(item => item.id !== currentNewsId) || [];
    
    // If we need more news, get from other categories
    if (sameCategoryNews.length < 3) {
      const otherCategoryNews = allNews.filter(item => 
        item.id !== currentNewsId && item.category !== categoryId
      );
      
      return [...sameCategoryNews, ...otherCategoryNews].slice(0, 3);
    }
    
    return sameCategoryNews.slice(0, 3);
  }, [category, newsId, categoryId, allNews]);
  
  // Find popular news (most recent from all categories, excluding current)
  const popularNews = React.useMemo(() => {
    const currentNewsId = Number(newsId);
    
    return allNews
      .filter(item => item.id !== currentNewsId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [allNews, newsId]);
  
  // Navigate to previous and next news
  const sortedNews = allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = sortedNews.findIndex(item => item.id === Number(newsId));
  const prevNews = currentIndex < sortedNews.length - 1 ? sortedNews[currentIndex + 1] : null;
  const nextNews = currentIndex > 0 ? sortedNews[currentIndex - 1] : null;
  
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
    const source = newsItem?.source || "RTVAM";
    
    return {
      title,
      image,
      date,
      categoryTitle,
      source,
      content: [
        "Esta é uma notícia de exemplo com conteúdo informativo relevante para os leitores da RTVAM. O conteúdo real seria fornecido através de uma API ou sistema de gestão de conteúdo.",
        "Aqui continuaria o desenvolvimento da notícia com mais detalhes, citações e informações contextuais importantes para uma compreensão completa do assunto abordado pela Rádio e Televisão Académica de Moçambique.",
        "O artigo terminaria com uma conclusão ou resumo dos pontos principais abordados, fornecendo ao leitor uma visão clara e completa do tema tratado pela nossa equipa de jornalismo."
      ],
      subTitle: "Subtítulo informativo da notícia - RTVAM"
    };
  };
  
  const articleContent = generateContent();
  
  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Notícia não encontrada</h1>
              <p className="text-gray-600">A notícia que procura não foi encontrada.</p>
            </div>
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
