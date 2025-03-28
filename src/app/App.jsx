import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppProviders from './AppProviders';
import Layout from '../shared/components/Layout';
import LoginPage from '../modules/auth/ui/LoginPage';
import HomePage from '../modules/music/ui/HomePage';
import GenrePage from '../modules/music/ui/GenrePage';
import ArtistPage from '../modules/music/ui/ArtistPage';
import AlbumPage from '../modules/music/ui/AlbumPage';
import PlaylistPage from '../modules/playlist/ui/PlaylistPage';
import ProfilePage from '../modules/user/ui/ProfilePage';
import SettingsPage from '../modules/user/ui/SettingsPage';
import ProtectedRoute from '../modules/auth/ui/ProtectedRoute';
import ZaptBadge from '../shared/components/ZaptBadge';

function App() {
  return (
    <Router>
      <AppProviders>
        <div className="h-full bg-black text-white">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/genre/:genreId" element={<ProtectedRoute><GenrePage /></ProtectedRoute>} />
              <Route path="/artist/:artistId" element={<ProtectedRoute><ArtistPage /></ProtectedRoute>} />
              <Route path="/album/:albumId" element={<ProtectedRoute><AlbumPage /></ProtectedRoute>} />
              <Route path="/playlist/:playlistId" element={<ProtectedRoute><PlaylistPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <ZaptBadge />
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;