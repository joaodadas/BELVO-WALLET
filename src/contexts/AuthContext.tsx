/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { login as loginService } from '../services/auth';
import { isTokenExpired } from '../utils/isTokenExpired';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const saved = localStorage.getItem('token');
    return saved && !isTokenExpired(saved) ? saved : null;
  });

  useEffect(() => {
    let interval: number;

    if (token) {
      localStorage.setItem('token', token);

      interval = setInterval(() => {
        if (isTokenExpired(token)) {
          alert('Sessão expirada. Faça login novamente.');
          logout();
        }
      }, 5000); // verifica a cada 5s
    } else {
      localStorage.removeItem('token');
    }

    return () => clearInterval(interval);
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await loginService(username, password);
    setToken(res.access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
