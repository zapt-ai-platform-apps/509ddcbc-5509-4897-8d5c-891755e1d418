import React from 'react';
import { useParams } from 'react-router-dom';
import { useMusicPlayer } from '../../../shared/hooks/useMusicPlayer';
import { HiPlay, HiPause, HiHeart, HiOutlineHeart } from 'react-icons/hi';

const playlistData = {
  'playlist1': {
    id: 'playlist1',
    name: 'Today\'s Top Hits',
    description: 'The biggest hits right now. Cover: The Weeknd',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E",
    tracks: [
      {
        id: 'playlist1track1',
        name: 'Blinding Lights',
        artists: [{ name: 'The Weeknd' }],
        album: { 
          name: 'After Hours',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 200000,
        preview_url: 'https://p.scdn.co/mp3-preview/cb1ae1f9e2f874dd2b5e5889c9df73fd20e93253'
      },
      {
        id: 'playlist1track2',
        name: 'Shape of You',
        artists: [{ name: 'Ed Sheeran' }],
        album: { 
          name: 'Divide',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234299e1'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 230000,
        preview_url: 'https://p.scdn.co/mp3-preview/84462d8e1e4d0f9e5ccd06f0da390f65843774a2'
      },
      // More tracks...
    ]
  },
  'playlist2': {
    id: 'playlist2',
    name: 'Chill Vibes',
    description: 'Relaxing beats for your day',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234299e1'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E",
    tracks: [
      {
        id: 'playlist2track1',
        name: 'Memories',
        artists: [{ name: 'Maroon 5' }],
        album: { 
          name: 'Memories',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23718096'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 180000,
        preview_url: 'https://p.scdn.co/mp3-preview/d355f3175f8602156854deb0d6ad7fa4be557299'
      },
      // More tracks...
    ]
  },
  // More playlists...
};

function TrackItem({ track, index }) {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusicPlayer();
  const isCurrentTrack = currentTrack?.id === track.id;
  const [liked, setLiked] = React.useState(false);

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(track);
      }
    } else {
      playTrack(track);
    }
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div 
      className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition cursor-pointer"
      onClick={handlePlayPause}
    >
      <div className="w-8 text-gray-400 text-sm text-right mr-4">{index + 1}</div>
      <div className="relative">
        <img 
          src={track.album.images[0].url}
          alt={track.name}
          className="h-10 w-10 rounded"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
          {isCurrentTrack && isPlaying ? (
            <HiPause className="text-white text-xl" />
          ) : (
            <HiPlay className="text-white text-xl" />
          )}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <div className="font-medium">{track.name}</div>
        <div className="text-sm text-gray-400">{track.artists[0].name}</div>
      </div>
      <button
        onClick={handleLikeToggle}
        className="mx-4 focus:outline-none cursor-pointer"
      >
        {liked ? (
          <HiHeart className="text-purple-500 text-xl" />
        ) : (
          <HiOutlineHeart className="text-gray-400 hover:text-white text-xl" />
        )}
      </button>
      <div className="text-gray-400 text-sm">
        {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
      </div>
    </div>
  );
}

function PlaylistPage() {
  const { playlistId } = useParams();
  const playlist = playlistData[playlistId];
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusicPlayer();

  const handlePlayAll = () => {
    if (playlist?.tracks?.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  if (!playlist) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Playlist not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end gap-6 mb-8">
        <img 
          src={playlist.image}
          alt={playlist.name}
          className="w-52 h-52 shadow-2xl"
        />
        <div>
          <div className="text-sm font-medium uppercase text-gray-300 mb-1">Playlist</div>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={handlePlayAll}
              className="bg-green-500 hover:bg-green-400 text-black font-medium py-2 px-8 rounded-full flex items-center gap-2 transition cursor-pointer"
            >
              {isPlaying && currentTrack?.id === playlist.tracks[0].id ? (
                <>
                  <HiPause className="text-xl" /> Pause
                </>
              ) : (
                <>
                  <HiPlay className="text-xl" /> Play
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-30 rounded-lg">
        <div className="flex items-center p-3 text-gray-400 text-sm border-b border-gray-800">
          <div className="w-8 text-center mr-4">#</div>
          <div className="w-10"></div>
          <div className="ml-4 flex-1">Title</div>
          <div className="mx-4"></div>
          <div>Duration</div>
        </div>

        {playlist.tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;