import React from 'react';
import { matches } from '@/static/matches';
import TournamentSchedule from '@/components/tournament/TournamentSchedule';

function TournamentSchedulePage() {
  return <TournamentSchedule matches={matches} />;
  //   return <div>TODO: Implement TournamentSchedulePage</div>;
}

export default TournamentSchedulePage;
