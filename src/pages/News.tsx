
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/newsData';
import { NewsItem } from '@/types/news';
import NewsCarousel from '@/components/news/NewsCarousel';
import PublicationTimeline from '@/components/news/PublicationTimeline';
import NewsByCategory from '@/components/news/NewsByCategory';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Format date to localized string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Get all news items from all categories
const getAllNews = () => {
  return categories.flatMap(category => 
    category.news.map(news => ({
      ...news,
      categoryTitle: category.title
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const News = () => {
  const allNews = getAllNews();
  const featuredNews = allNews.slice(0, 5); // Get 5 news items for the carousel

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 page-container">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-rtam-blue mb-8">Notícias</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured News Carousel */}
            <div className="lg:col-span-2">
              <NewsCarousel featuredNews={featuredNews} formatDate={formatDate} />
            </div>
            
            {/* News Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-rtam-blue mb-4">Arquivo de Notícias</h2>
              <PublicationTimeline news={allNews} formatDate={formatDate} />
            </div>
          </div>
          
          {/* Latest News by Category */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-rtam-blue mb-6">Últimas Notícias por Categoria</h2>
            {categories.map(category => (
              <NewsByCategory 
                key={category.id} 
                category={category} 
                formatDate={formatDate} 
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
