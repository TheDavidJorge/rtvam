
import React from 'react';
import { useRadioPlayer } from '@/contexts/RadioPlayerContext';
import { Play, Pause, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const FloatingRadioPlayer: React.FC = () => {
  const { isPlaying, togglePlayPause, stationName } = useRadioPlayer();

  if (!isPlaying && !isPlaying) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={cn(
        "bg-white rounded-full shadow-lg p-3 flex items-center space-x-3",
        "border border-rtam-blue/20 hover:shadow-xl transition-all",
        isPlaying ? "bg-gradient-to-r from-rtam-blue/10 to-white" : ""
      )}>
        <button
          onClick={togglePlayPause}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isPlaying ? "bg-rtam-red text-white" : "bg-rtam-blue text-white"
          )}
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex items-center">
          <Radio className="w-4 h-4 text-rtam-blue mr-2" />
          <Link to="/radio" className="text-sm font-medium text-gray-700 hover:text-rtam-blue transition-colors">
            {stationName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingRadioPlayer;
