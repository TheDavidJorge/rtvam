
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { NewsItem } from '@/types/news';

interface NewsCarouselProps {
  featuredNews: (NewsItem & { categoryTitle?: string })[];
  formatDate: (dateString: string) => string;
}

const NewsCarousel = ({ featuredNews, formatDate }: NewsCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredNews.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg shadow-md">
      {/* Carousel slides */}
      <div className="h-full">
        {featuredNews.map((news, index) => (
          <div
            key={`${news.category}-${news.id}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Link to={`/noticias/${news.category}/${news.id}`}>
              <div className="relative h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-rtam-blue rounded mb-2">
                      {news.categoryTitle}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{news.title}</h3>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(news.date)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {featuredNews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;
