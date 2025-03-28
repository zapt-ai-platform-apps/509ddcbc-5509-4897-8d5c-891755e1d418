import React from 'react';
import { Link } from 'react-router-dom';
import { useMusicPlayer } from '../../../shared/hooks/useMusicPlayer';
import { HiPlay, HiPause } from 'react-icons/hi';

// Mock data - in a real app, this would come from an API
const featuredPlaylists = [
  {
    id: 'playlist1',
    name: 'Today\'s Top Hits',
    description: 'The biggest hits right now',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E"
  },
  {
    id: 'playlist2',
    name: 'Chill Vibes',
    description: 'Relaxing beats for your day',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234299e1'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E"
  },
  {
    id: 'playlist3',
    name: 'Rock Classics',
    description: 'Legendary rock songs',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ed8936'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E"
  },
  {
    id: 'playlist4',
    name: '90s Hits',
    description: 'The best from the 90s',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23805ad5'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E"
  },
  {
    id: 'playlist5',
    name: 'Workout Beats',
    description: 'Energy for your workout',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2348bb78'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E"
  },
];

const genres = [
  { id: 'pop', name: 'Pop', color: 'from-pink-500 to-purple-500' },
  { id: 'rock', name: 'Rock', color: 'from-red-500 to-orange-500' },
  { id: 'hiphop', name: 'Hip Hop', color: 'from-yellow-500 to-green-500' },
  { id: 'electronic', name: 'Electronic', color: 'from-teal-500 to-blue-500' },
  { id: 'jazz', name: 'Jazz', color: 'from-indigo-500 to-purple-500' },
  { id: 'classical', name: 'Classical', color: 'from-gray-500 to-gray-700' },
];

const recentlyPlayed = [
  {
    id: 'track1',
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
    id: 'track2',
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
    id: 'track3',
    name: 'Bad Guy',
    artists: [{ name: 'Billie Eilish' }],
    album: { 
      name: 'When We All Fall Asleep, Where Do We Go?',
      images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2348bb78'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
    },
    duration_ms: 194000,
    preview_url: 'https://p.scdn.co/mp3-preview/7e1e4f04b89a3a345b363c3578ec0ea367f9aa4c'
  },
];

function TrackItem({ track }) {
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
      className="flex items-center p-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
      onClick={handlePlayPause}
    >
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
      <div className="ml-3">
        <div className="text-sm font-medium">{track.name}</div>
        <div className="text-xs text-gray-400">{track.artists[0].name}</div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
            <Link 
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <img 
                src={playlist.image}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-white mb-1">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">{playlist.description}</p>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Link 
              key={genre.id}
              to={`/genre/${genre.id}`}
              className={`bg-gradient-to-br ${genre.color} p-6 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-200`}
            >
              <h3 className="font-bold text-white text-lg">{genre.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="bg-gray-800 bg-opacity-30 rounded-lg p-4">
          {recentlyPlayed.map((track) => (
            <TrackItem key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;