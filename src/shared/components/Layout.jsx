import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MusicPlayer from '../../modules/music/ui/MusicPlayer';

function Layout() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default Layout;