
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample carousel data - this would come from your CMS or API
const carouselItems = [
  {
    id: 1,
    title: 'Jornal Académico',
    description: 'O seu principal programa noticioso, com todas as novidades da academia.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '/programacao/noticias/jornal-academico',
  },
  {
    id: 2,
    title: 'Manhã Académica',
    description: 'Comece o seu dia com as melhores músicas e informações.',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '/programacao/entretenimento/manha-academica',
  },
  {
    id: 3,
    title: 'Debate Académico',
    description: 'Discussões aprofundadas sobre os temas mais relevantes para a comunidade académica.',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    link: '/programacao/entretenimento/debate-academico',
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
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-20">
              <div className="max-w-3xl animate-slide-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {item.title}
                </h1>
                <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
                  {item.description}
                </p>
                <Link
                  to={item.link}
                  className="inline-block px-6 py-3 bg-rtam-blue text-white font-medium rounded-md hover:bg-rtam-blue-dark transition-colors duration-300 shadow-lg"
                >
                  Saber Mais
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
