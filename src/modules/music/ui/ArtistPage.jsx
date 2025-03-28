import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMusicPlayer } from '../../../shared/hooks/useMusicPlayer';
import { HiPlay, HiPause } from 'react-icons/hi';

// Mock data - would come from an API in a real app
const artistData = {
  'artist1': {
    id: 'artist1',
    name: 'The Weeknd',
    genres: ['pop', 'r&b'],
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Ccircle cx='12' cy='12' r='10' /%3E%3C/svg%3E",
    monthlyListeners: '85,432,001',
    popularTracks: [
      {
        id: 'artist1track1',
        name: 'Blinding Lights',
        artists: [{ name: 'The Weeknd' }],
        album: { 
          name: 'After Hours',
          images: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E" }] 
        },
        duration_ms: 200000,
        preview_url: 'https://p.scdn.co/mp3-preview/cb1ae1f9e2f874dd2b5e5889c9df73fd20e93253'
      },
      // More tracks...
    ],
    albums: [
      {
        id: 'album1',
        name: 'After Hours',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f56565'%3E%3Crect width='24' height='24' /%3E%3C/svg%3E",
        releaseYear: '2020'
      },
      // More albums...
    ]
  },
  // More artists...
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
        <div className="text-sm text-gray-400">{track.album.name}</div>
      </div>
      <div className="text-gray-400 text-sm">
        {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
      </div>
    </div>
  );
}

function ArtistPage() {
  const { artistId } = useParams();
  const artist = artistData[artistId];
  const { playTrack } = useMusicPlayer();

  const handlePlayAll = () => {
    if (artist?.popularTracks?.length > 0) {
      playTrack(artist.popularTracks[0]);
    }
  };

  if (!artist) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Artist not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end gap-6 mb-12">
        <img 
          src={artist.image}
          alt={artist.name}
          className="w-52 h-52 rounded-full shadow-2xl"
        />
        <div>
          <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
          <p className="text-gray-300 mb-4">
            {artist.monthlyListeners} monthly listeners
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={handlePlayAll}
              className="bg-green-500 hover:bg-green-400 text-black font-medium py-2 px-8 rounded-full flex items-center gap-2 transition cursor-pointer"
            >
              <HiPlay className="text-xl" /> Play
            </button>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="bg-gray-900 bg-opacity-30 rounded-lg">
          {artist.popularTracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {artist.albums.map((album) => (
            <Link 
              key={album.id}
              to={`/album/${album.id}`}
              className="bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <img 
                src={album.image}
                alt={album.name}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-white mb-1">{album.name}</h3>
              <p className="text-gray-400 text-sm">{album.releaseYear}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistPage;