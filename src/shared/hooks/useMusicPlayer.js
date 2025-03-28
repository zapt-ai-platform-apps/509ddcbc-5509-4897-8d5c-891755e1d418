import React, { createContext, useState, useContext, useRef, useCallback } from 'react';

const MusicPlayerContext = createContext(null);

export function MusicPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const playTrack = useCallback((track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(true);
      audioRef.current?.play();
      return;
    }
    
    setCurrentTrack(track);
    setIsPlaying(true);
    
    if (audioRef.current) {
      audioRef.current.src = track.preview_url || '';
      audioRef.current.play();
    }
  }, [currentTrack]);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    audioRef.current?.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else {
      if (currentTrack) {
        playTrack(currentTrack);
      }
    }
  }, [isPlaying, currentTrack, playTrack, pauseTrack]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  const handleProgressChange = useCallback((newProgress) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
    }
  }, [duration]);

  const value = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    playTrack,
    pauseTrack,
    togglePlayPause,
    handleVolumeChange,
    handleProgressChange,
    audioRef,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(isNaN(newProgress) ? 0 : newProgress);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === null) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}