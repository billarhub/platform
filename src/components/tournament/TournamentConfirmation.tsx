import React from 'react';
import { useTournamentBracket } from '@/hooks/api/tournament';
import TournamentSingleBracket from './TournamentSingleBracket';

function TournamentConfirmation({ locale }: { locale: string }) {
  const tournamentId = sessionStorage.getItem('currentTournamentId');
  const { data, isLoading, isError } = useTournamentBracket(tournamentId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tournament brackets</div>;
  }

  const matches = data?.data?.data?.brackets || [];

  return <TournamentSingleBracket locale={locale} matches={matches} />;
}

export default TournamentConfirmation;
