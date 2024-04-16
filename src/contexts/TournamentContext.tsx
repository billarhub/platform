'use client';
import React from 'react';

interface TournamentContextProps {
  data: any;
  updateTournamentData: (newData: any) => void;
}

const TournamentContext = React.createContext<
  TournamentContextProps | undefined
>(undefined);

interface TournamentProviderProps {
  children: React.ReactNode;
}

export function TournamentProvider({ children }: TournamentProviderProps) {
  const [data, setData] = React.useState<any>(null);

  const updateTournamentData = (newData: any) => {
    setData(newData);
  };

  return (
    <TournamentContext.Provider value={{ data, updateTournamentData }}>
      {children}
    </TournamentContext.Provider>
  );
}

export const useTournament = (): TournamentContextProps => {
  const context = React.useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
