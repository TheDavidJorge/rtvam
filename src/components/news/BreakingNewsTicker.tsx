
import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

interface BreakingNewsTickerProps {
  news: string[];
}

const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ news }) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Start the animation when component mounts
    ticker.style.animationPlayState = 'running';

    // Pause animation on hover
    const handleMouseEnter = () => {
      if (ticker) ticker.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      if (ticker) ticker.style.animationPlayState = 'running';
    };

    ticker.addEventListener('mouseenter', handleMouseEnter);
    ticker.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ticker.removeEventListener('mouseenter', handleMouseEnter);
      ticker.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-rtam-red text-white py-2 shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center mr-2 bg-white text-rtam-red px-2 py-1 rounded font-bold">
          <AlertTriangle className="w-4 h-4 mr-1" />
          <span className="text-sm">ÚLTIMA HORA</span>
        </div>
        
        <div className="overflow-hidden relative w-full">
          <div 
            ref={tickerRef}
            className="whitespace-nowrap inline-block animate-ticker"
            style={{
              animation: 'ticker 30s linear infinite',
            }}
          >
            {news.map((item, index) => (
              <span key={index} className="mx-6 text-sm inline-block">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
