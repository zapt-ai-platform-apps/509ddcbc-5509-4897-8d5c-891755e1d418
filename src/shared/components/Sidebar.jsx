import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/ui/AuthProvider';
import { 
  HiHome, 
  HiSearch, 
  HiCollection, 
  HiHeart, 
  HiPlus,
  HiUser,
  HiCog,
  HiLogout
} from 'react-icons/hi';

function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 text-sm font-medium px-4 py-3 hover:text-white transition cursor-pointer ${
      isActive ? 'text-white bg-gray-800' : 'text-gray-400'
    }`;

  return (
    <aside className="w-64 bg-black flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Musically</h1>
      </div>
      
      <nav className="mt-2 flex-1">
        <NavLink to="/" className={navLinkClass}>
          <HiHome className="text-xl" />
          Home
        </NavLink>
        <NavLink to="/search" className={navLinkClass}>
          <HiSearch className="text-xl" />
          Search
        </NavLink>
        <NavLink to="/library" className={navLinkClass}>
          <HiCollection className="text-xl" />
          Your Library
        </NavLink>
        
        <div className="mt-6 px-4">
          <button 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition cursor-pointer"
          >
            <HiPlus className="p-1 bg-gray-400 text-black rounded-sm" />
            Create Playlist
          </button>
        </div>
        
        <div className="mt-4 px-4">
          <NavLink 
            to="/liked" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition cursor-pointer"
          >
            <HiHeart className="p-1 bg-gradient-to-br from-purple-600 to-blue-400 text-white rounded-sm" />
            Liked Songs
          </NavLink>
        </div>
        
        <div className="border-t border-gray-800 my-6"></div>
        
        <div className="px-4 text-sm text-gray-500 font-medium">
          <div className="mb-2">Playlists</div>
          <div className="text-gray-400 hover:text-white transition py-1 cursor-pointer">
            Top Hits 2023
          </div>
          <div className="text-gray-400 hover:text-white transition py-1 cursor-pointer">
            Chill Vibes
          </div>
          <div className="text-gray-400 hover:text-white transition py-1 cursor-pointer">
            Workout Mix
          </div>
        </div>
      </nav>
      
      <div className="border-t border-gray-800 mt-auto">
        <div className="p-4">
          <NavLink to="/profile" className={navLinkClass}>
            <HiUser className="text-xl" />
            Profile
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            <HiCog className="text-xl" />
            Settings
          </NavLink>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 text-sm font-medium px-4 py-3 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <HiLogout className="text-xl" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;