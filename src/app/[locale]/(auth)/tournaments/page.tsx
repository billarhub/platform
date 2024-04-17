import React from 'react';
import TournamentList from '@/components/tournament/TournamentList';

function Tournaments({ params: { locale } }: { params: { locale: string } }) {
  return <TournamentList locale={locale} />;
}

export default Tournaments;
