import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

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
    const saved = localStorage.getItem('duet:auth');
    if (saved === '1') {
      return {
        isLoggedIn: true,
        user: {
          name: 'Edlasio Galhardo',
          email: 'edlasio@example.com',
          avatar: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
        },
      };
    }
    return { isLoggedIn: false, user: null };
  });

  const login = React.useCallback(() => {
    setAuth({
      isLoggedIn: true,
      user: {
        name: 'Edlasio Galhardo',
        email: 'edlasio@example.com',
        avatar: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
      },
    });
    localStorage.setItem('duet:auth', '1');
  }, []);

  const logout = React.useCallback(() => {
    setAuth({ isLoggedIn: false, user: null });
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
