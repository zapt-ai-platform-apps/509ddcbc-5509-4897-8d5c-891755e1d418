import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../../supabaseClient';
import { useAuth } from './AuthProvider';

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Musically</h1>
          <p className="text-gray-300">Your world of music in one place</p>
        </div>
        
        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-2">Sign in with ZAPT</p>
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 text-sm hover:underline"
            >
              Learn more about ZAPT
            </a>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#8B5CF6',
                    brandAccent: '#7C3AED',
                  },
                },
              },
            }}
            providers={['google', 'facebook', 'apple']}
            magicLink={true}
            view="magic_link"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;