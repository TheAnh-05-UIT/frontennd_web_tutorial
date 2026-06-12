import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  learningStreak: number;
  coursesCompleted: number;
  projectsFinished: number;
  articlesRead: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  user: UserProfile | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    try {
      const data = await api.get<UserProfile>('/auth/me');
      setUser(data);
    } catch (e) {
      console.error('Failed to fetch profile', e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setRole(decoded.role || 'USER');
          fetchProfile();
        } else {
          logout();
        }
      } catch (e) {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setRole(decoded.role || 'USER');
      fetchProfile();
    } catch (e) {
      console.error('Invalid token format');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
