'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { jwtDecode } from 'jwt-decode';

import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;

  token: string | null;

  login: (token: string) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(
  null,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    null,
  );

  const [user, setUser] = useState<User | null>(
    null,
  );

  useEffect(() => {
    const storedToken =
      localStorage.getItem('token');

    if (storedToken) {
      const decoded =
        jwtDecode<User>(storedToken);

      setToken(storedToken);

      setUser(decoded);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);

    const decoded =
      jwtDecode<User>(newToken);

    setToken(newToken);

    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider',
    );
  }

  return context;
}