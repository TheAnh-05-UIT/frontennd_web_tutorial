import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ViewMode, User } from '../types';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  role: 'user',
  joinDate: '2025-01-15',
  coursesCompleted: 12,
  articlesRead: 45,
  projectsFinished: 5,
  learningStreak: 7,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'public') {
      setUser(null);
    } else if (mode === 'user') {
      setUser(mockUser);
    } else if (mode === 'admin') {
      setUser({ ...mockUser, role: 'admin' });
    }
  };

  return (
    <AppContext.Provider value={{
      viewMode,
      setViewMode: handleSetViewMode,
      user,
      setUser,
      sidebarOpen,
      setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
