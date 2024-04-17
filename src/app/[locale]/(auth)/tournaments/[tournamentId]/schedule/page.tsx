import React from 'react';
import { matches } from '@/static/matches';
import TournamentSchedule from '@/components/tournament/TournamentSchedule';

function TournamentSchedulePage({
  params: { tournamentId, locale },
}: {
  params: { tournamentId: string; locale: string };
}) {
  return <TournamentSchedule matches={matches} tournamentId={tournamentId} />;
  //   return <div>TODO: Implement TournamentSchedulePage</div>;
}

export default TournamentSchedulePage;
