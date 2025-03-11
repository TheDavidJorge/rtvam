
import React, { useState } from 'react';

interface LiveStreamProps {
  videoUrl: string;
  title?: string;
  description?: string;
  isLive?: boolean;
}

const LiveStream: React.FC<LiveStreamProps> = ({
  videoUrl,
  title = 'TV Académica de Moçambique',
  description = 'Transmissão ao vivo da programação da TV Académica de Moçambique',
  isLive = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
      <div className="aspect-w-16 aspect-h-9 bg-gray-900 relative">
        {/* Video Player - in a real implementation, this would be an iframe or video element */}
        <div className="w-full h-full flex items-center justify-center bg-black">
          <img 
            src="https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt="TV Live Stream" 
            className="w-full h-full object-cover opacity-60"
            onLoad={() => setIsLoading(false)}
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="w-20 h-20 rounded-full bg-rtam-red/90 flex items-center justify-center hover:bg-rtam-red transition-colors"
              aria-label="Play video"
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Live indicator */}
          {isLive && (
            <div className="absolute top-4 left-4 bg-rtam-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              AO VIVO
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-rtam-blue-dark mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            1.2K espectadores
          </div>
          
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-rtam-blue transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-rtam-blue transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
