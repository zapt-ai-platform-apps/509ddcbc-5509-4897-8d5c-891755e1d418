import React from 'react';
import { useParams } from 'react-router-dom';
import { useMusicPlayer } from '../../../shared/hooks/useMusicPlayer';
import { HiPlay, HiPause } from 'react-icons/hi';

const genreData = {
  'pop': {
    name: 'Pop',
    description: 'Top pop tracks from around the world',
    color: 'from-pink-500 to-purple-500',
    tracks: [
      {
        id: 'pop1',
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
        id: 'pop2',
        name: 'Shape of You',
        artists: [{ name: 'Ed Sheeran' }],
        album: { 
          name: 'Divide',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234299e1'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 230000,
        preview_url: 'https://p.scdn.co/mp3-preview/84462d8e1e4d0f9e5ccd06f0da390f65843774a2'
      },
      {
        id: 'pop3',
        name: 'Bad Guy',
        artists: [{ name: 'Billie Eilish' }],
        album: { 
          name: 'When We All Fall Asleep, Where Do We Go?',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2348bb78'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 194000,
        preview_url: 'https://p.scdn.co/mp3-preview/7e1e4f04b89a3a345b363c3578ec0ea367f9aa4c'
      },
      {
        id: 'pop4',
        name: 'Dance Monkey',
        artists: [{ name: 'Tones and I' }],
        album: { 
          name: 'The Kids Are Coming',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239f7aea'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 210000,
        preview_url: 'https://p.scdn.co/mp3-preview/1a4bf4b833fabdaf3f186eb6f8b9c1abb9341b32'
      },
    ]
  },
  'rock': {
    name: 'Rock',
    description: 'Classic and modern rock hits',
    color: 'from-red-500 to-orange-500',
    tracks: [
      {
        id: 'rock1',
        name: 'Sweet Child O\' Mine',
        artists: [{ name: 'Guns N\' Roses' }],
        album: { 
          name: 'Appetite for Destruction',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ed8936'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 355000,
        preview_url: 'https://p.scdn.co/mp3-preview/fa3775a3c696d0b9ebb85472b2361a8f32f966d9'
      },
      {
        id: 'rock2',
        name: 'Bohemian Rhapsody',
        artists: [{ name: 'Queen' }],
        album: { 
          name: 'A Night at the Opera',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 354000,
        preview_url: 'https://p.scdn.co/mp3-preview/d25e2a7b73a9d3b87e1e8cf9e88fc5f2d65edcd8'
      },
    ]
  },
  // Additional genres would be added here
};

function TrackItem({ track, index }) {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusicPlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

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
      <div className="text-gray-400 text-sm">
        {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
      </div>
    </div>
  );
}

function GenrePage() {
  const { genreId } = useParams();
  const genre = genreData[genreId];

  if (!genre) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Genre not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className={`bg-gradient-to-b ${genre.color} to-gray-900 p-8 rounded-lg mb-6`}>
        <div className="flex items-end">
          <div>
            <h1 className="text-5xl font-bold mb-3">{genre.name}</h1>
            <p className="text-gray-200">{genre.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-30 rounded-lg">
        <div className="flex items-center p-3 text-gray-400 text-sm border-b border-gray-800">
          <div className="w-8 text-center mr-4">#</div>
          <div className="w-10"></div>
          <div className="ml-4 flex-1">Title</div>
          <div>Duration</div>
        </div>

        {genre.tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}

export default GenrePage;