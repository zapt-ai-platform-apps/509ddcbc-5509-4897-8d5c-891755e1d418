import React from 'react';
import { AuthProvider } from '../modules/auth/ui/AuthProvider';
import { MusicPlayerProvider } from '../shared/hooks/useMusicPlayer';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <MusicPlayerProvider>
        {children}
      </MusicPlayerProvider>
    </AuthProvider>
  );
}

export default AppProviders;