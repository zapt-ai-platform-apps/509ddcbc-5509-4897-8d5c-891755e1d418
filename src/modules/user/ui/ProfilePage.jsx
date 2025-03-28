import React from 'react';
import { useAuth } from '../../auth/ui/AuthProvider';

function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-4">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold mb-2">{user?.email?.split('@')[0]}</h1>
        <p className="text-gray-400">{user?.email}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Your Top Tracks</h2>
          <div className="text-gray-400 text-center py-10">
            Your listening data will appear here as you use Musically
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
          <div className="text-gray-400 text-center py-10">
            Create playlists to see them here
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;