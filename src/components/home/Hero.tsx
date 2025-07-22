
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Updated carousel data with new images
const carouselItems = [
  {
    id: 1,
    title: 'Notícias ao Meio Dia',
    description: 'O seu programa noticioso diário com todas as novidades nacionais e internacionais.',
    image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/NOTICIAS-AO-MEIO-DIA-1-3.jpg',
  },
  {
    id: 2,
    title: 'Olhar Político',
    description: 'Análises profundas e debates sobre os principais temas políticos da atualidade.',
    image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/olharpolitico1-scaled.jpg',
  },
  {
    id: 3,
    title: 'Impacto Semanal',
    description: 'Resumo semanal dos acontecimentos mais importantes em Moçambique e no mundo.',
    image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/impacosemanalcover2-scaled.png',
  },
  {
    id: 4,
    title: 'Bom Dia Beira',
    description: 'O melhor programa matinal da rádio para começar o seu dia com energia.',
    image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/BOM-DIA-BEIRA.png',
  },
  {
    id: 5,
    title: 'Toca o Som',
    description: 'Música e entretenimento para todos os gostos e idades.',
    image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/TOCA-O-SEU-SOM1.png',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselItems.length;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex justify-center py-12 bg-gradient-to-br from-accent/20 to-background">
      <div className="relative w-full max-w-6xl h-[600px] rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow-elegant)]">
        {/* Slides */}
        <div className="relative h-full">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
              </div>

              {/* Content - modern glass overlay */}
              <div className="absolute bottom-0 left-0 right-0 glass-hero backdrop-blur-lg p-8">
                <div className="max-w-4xl">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3">
                    {item.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Em Destaque
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      RTVAM • Rádio e Televisão Académica
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass-hero text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[var(--shadow-card)] hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass-hero text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[var(--shadow-card)] hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-110 shadow-[var(--shadow-glow)]' 
                  : 'bg-white/60 hover:bg-primary/70 hover:scale-105'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
