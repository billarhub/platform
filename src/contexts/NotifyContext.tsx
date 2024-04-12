'use client';
import React from 'react';
import { toast } from 'react-toastify';

interface NotifyContextProps {
  notify: (message: string, type: 'success' | 'error') => void;
}

const NotifyContext = React.createContext<NotifyContextProps | undefined>(
  undefined
);

interface NotifyProviderProps {
  children: React.ReactNode;
}

export function NotifyProvider({ children }: NotifyProviderProps) {
  function notify(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  }

  return (
    <NotifyContext.Provider value={{ notify }}>
      {children}
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const context = React.useContext(NotifyContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotifyProvider');
  }
  return context;
}
