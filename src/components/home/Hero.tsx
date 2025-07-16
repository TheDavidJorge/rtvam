
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="flex justify-center py-8 bg-gray-50">
      <div className="relative w-full max-w-5xl h-[500px] rounded-lg overflow-hidden shadow-xl">
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

              {/* Content - positioned at the bottom instead of overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-6">
                <div className="max-w-3xl">
                  <h1 className="text-2xl sm:text-3xl font-bold text-rtam-blue mb-2">
                    {item.title}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white text-rtam-blue hover:bg-rtam-blue hover:text-white transition-colors shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white text-rtam-blue hover:bg-rtam-blue hover:text-white transition-colors shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-rtam-blue' : 'bg-gray-300 hover:bg-rtam-blue/70'
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
