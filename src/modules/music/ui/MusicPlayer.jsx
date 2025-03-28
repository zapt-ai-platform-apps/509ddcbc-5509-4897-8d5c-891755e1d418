import React, { useCallback } from 'react';
import { 
  HiPlay, 
  HiPause, 
  HiVolumeUp, 
  HiVolumeOff,
  HiRewind,
  HiFastForward,
  HiHeart,
  HiOutlineHeart
} from 'react-icons/hi';
import { useMusicPlayer } from '../../../shared/hooks/useMusicPlayer';

function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume,
    progress,
    togglePlayPause, 
    handleVolumeChange,
    handleProgressChange
  } = useMusicPlayer();
  
  const [liked, setLiked] = React.useState(false);

  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  if (!currentTrack) {
    return (
      <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center text-gray-500">
        No track selected
      </div>
    );
  }

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      <div className="flex items-center w-1/3">
        <img 
          src={currentTrack.album?.images?.[0]?.url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'/%3E%3C/svg%3E"}
          alt={currentTrack.name}
          className="h-14 w-14 rounded shadow mr-4"
        />
        <div>
          <div className="font-medium text-sm">{currentTrack.name}</div>
          <div className="text-xs text-gray-400">{currentTrack.artists?.[0]?.name}</div>
        </div>
        <button 
          onClick={() => setLiked(!liked)}
          className="ml-4 text-xl focus:outline-none cursor-pointer"
        >
          {liked ? (
            <HiHeart className="text-purple-500" />
          ) : (
            <HiOutlineHeart className="text-gray-400 hover:text-white" />
          )}
        </button>
      </div>
      
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white focus:outline-none cursor-pointer">
            <HiRewind className="text-xl" />
          </button>
          <button 
            onClick={togglePlayPause} 
            className="p-2 bg-white rounded-full text-black hover:scale-105 transition focus:outline-none cursor-pointer"
          >
            {isPlaying ? <HiPause className="text-xl" /> : <HiPlay className="text-xl ml-0.5" />}
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none cursor-pointer">
            <HiFastForward className="text-xl" />
          </button>
        </div>
        
        <div className="flex items-center w-full gap-2 mt-2">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(progress * (currentTrack.duration_ms / 1000) / 100)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleProgressChange(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration_ms / 1000)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-end w-1/3">
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white focus:outline-none cursor-pointer">
            {volume === 0 ? <HiVolumeOff className="text-xl" /> : <HiVolumeUp className="text-xl" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;