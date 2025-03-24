
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface RadioPlayerContextType {
  isPlaying: boolean;
  volume: number;
  togglePlayPause: () => void;
  setVolumeLevel: (volume: number) => void;
  stationName: string;
  stationLogo?: string;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export const RadioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stationName, setStationName] = useState("Rádio Académica UNIAC");
  const [stationLogo, setStationLogo] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Create audio element once on mount
    audioRef.current = new Audio("https://stream.zeno.fm/f32qntg3srhvv");
    audioRef.current.volume = volume / 100;
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setVolumeLevel = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <RadioPlayerContext.Provider value={{
      isPlaying,
      volume,
      togglePlayPause,
      setVolumeLevel,
      stationName,
      stationLogo
    }}>
      {children}
    </RadioPlayerContext.Provider>
  );
};

export const useRadioPlayer = (): RadioPlayerContextType => {
  const context = useContext(RadioPlayerContext);
  if (context === undefined) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider');
  }
  return context;
};
