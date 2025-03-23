
import React from 'react';
import { Disc, Volume2, VolumeX } from 'lucide-react';
import { useRadioPlayer } from '@/contexts/RadioPlayerContext';

interface RadioPlayerProps {
  streamUrl: string;
  stationName: string;
  stationLogo?: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({
  streamUrl,
  stationName,
  stationLogo,
}) => {
  const { 
    isPlaying, 
    volume, 
    togglePlayPause, 
    setVolumeLevel
  } = useRadioPlayer();
  
  const [isMuted, setIsMuted] = React.useState(false);

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setVolumeLevel(volume > 0 ? volume : 80);
    } else {
      setVolumeLevel(0);
    }
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolumeLevel(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="bg-white rounded-lg max-w-3xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row items-center">
        {/* Station Logo/Animation */}
        <div className="relative mb-6 md:mb-0 md:mr-8">
          <div className={`relative w-40 h-40 rounded-full overflow-hidden border-4 ${isPlaying ? 'border-rtam-blue animate-pulse' : 'border-gray-200'}`}>
            {stationLogo ? (
              <img 
                src={stationLogo} 
                alt={stationName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Disc className={`w-20 h-20 text-rtam-blue ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              </div>
            )}
            <div className={`absolute inset-0 rounded-full ${isPlaying ? 'bg-black bg-opacity-20' : ''}`}></div>
          </div>
          {isPlaying && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-rtam-red text-white px-3 py-1 rounded-full text-xs font-medium">
              AO VIVO
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex-1 w-full">
          <div className="mb-4 text-center md:text-left">
            <h3 className="text-xl font-bold text-rtam-blue-dark">{stationName}</h3>
            <p className="text-gray-500">Universidade Alberto Chipande UNIAC</p>
          </div>

          <div className="space-y-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center font-medium transition-colors ${
                isPlaying 
                  ? 'bg-rtam-red text-white hover:bg-rtam-red-dark' 
                  : 'bg-rtam-blue text-white hover:bg-rtam-blue-dark'
              }`}
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                  Pausar
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Iniciar
                </>
              )}
            </button>
            
            {/* Volume Controls */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleMute}
                className="p-2 text-gray-600 hover:text-rtam-blue transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rtam-blue"
              />
              <span className="text-sm text-gray-600 w-8">{volume}%</span>
            </div>

            {/* Currently Playing (placeholder) */}
            {isPlaying && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">A tocar agora:</p>
                <p className="font-medium">Programa da Manhã Académica</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
