import React, { useState } from 'react';
import { useAuth } from '../../auth/ui/AuthProvider';

function SettingsPage() {
  const { user, signOut } = useAuth();
  const [audioQuality, setAudioQuality] = useState('auto');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Account</h2>
        <div className="mb-6">
          <p className="text-gray-400 mb-1">Email</p>
          <p>{user?.email}</p>
        </div>
        
        <button 
          onClick={signOut}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
      
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Audio</h2>
        
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Audio Quality</label>
          <select 
            value={audioQuality}
            onChange={(e) => setAudioQuality(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded w-full box-border cursor-pointer"
          >
            <option value="auto">Automatic</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        
        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-400">Dark Mode</label>
          <div 
            className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${darkMode ? 'bg-purple-500' : 'bg-gray-600'}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div 
              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${darkMode ? 'translate-x-6' : ''}`}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        
        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-400">Push Notifications</label>
          <div 
            className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${notifications ? 'bg-purple-500' : 'bg-gray-600'}`}
            onClick={() => setNotifications(!notifications)}
          >
            <div 
              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${notifications ? 'translate-x-6' : ''}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;