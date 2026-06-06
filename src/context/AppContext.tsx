import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

interface AppContextType {
  auth: AuthState;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const profile = storageService.getUserProfile();
    return {
      isLoggedIn: true,
      user: {
        name: profile.name,
        email: 'edlasio@example.com',
        avatar: profile.photo,
      },
    };
  });

  useEffect(() => {
    const handleProfileUpdate = () => {
      const profile = storageService.getUserProfile();
      setAuth(prev => ({
        ...prev,
        user: {
          name: profile.name,
          email: prev.user?.email || 'edlasio@example.com',
          avatar: profile.photo,
        }
      }));
    };
    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('userProfileUpdated', handleProfileUpdate);
  }, []);

  const login = React.useCallback(() => {
    const profile = storageService.getUserProfile();
    setAuth({
      isLoggedIn: true,
      user: {
        name: profile.name,
        email: 'edlasio@example.com',
        avatar: profile.photo,
      },
    });
    localStorage.setItem('duet:auth', '1');
  }, []);

  const logout = React.useCallback(() => {
    const profile = storageService.getUserProfile();
    // Keep user logged in with defaults since login/signup got eliminated
    setAuth({
      isLoggedIn: true,
      user: {
        name: profile.name,
        email: 'edlasio@example.com',
        avatar: profile.photo,
      },
    });
    localStorage.removeItem('duet:auth');
  }, []);

  const value = React.useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
