
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row items-center">
        {/* Station Logo/Animation */}
        <div className="relative mb-6 md:mb-0 md:mr-8">
          <div className={`relative w-48 h-48 rounded-full overflow-hidden border-4 ${isPlaying ? 'border-rtam-blue animate-pulse' : 'border-gray-200'}`}>
            {stationLogo ? (
              <img 
                src={stationLogo} 
                alt={stationName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Disc className={`w-24 h-24 text-rtam-blue ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
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
            <h3 className="text-2xl font-bold text-rtam-blue-dark">{stationName}</h3>
            <p className="text-gray-500">Rádio Académica de Moçambique</p>
          </div>

          <div className="space-y-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-colors ${
                isPlaying 
                  ? 'bg-rtam-red text-white hover:bg-rtam-red-dark' 
                  : 'bg-rtam-blue text-white hover:bg-rtam-blue-dark'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
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

      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={streamUrl} 
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default RadioPlayer;
