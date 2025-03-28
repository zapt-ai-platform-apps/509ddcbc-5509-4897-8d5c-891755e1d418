import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, recordLogin } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRecordedLogin, setHasRecordedLogin] = useState(false);

  useEffect(() => {
    async function getSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        Sentry.captureException(error);
        setLoading(false);
      }
    }

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth event:', event);
        setSession(newSession);
        setUser(newSession?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user?.email && !hasRecordedLogin) {
      try {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
        setHasRecordedLogin(true);
      } catch (error) {
        console.error('Failed to record login:', error);
        Sentry.captureException(error);
      }
    }
  }, [session, hasRecordedLogin]);

  const value = {
    session,
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}