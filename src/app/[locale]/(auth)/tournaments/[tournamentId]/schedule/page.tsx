import React from 'react';
import { matches } from '@/static/matches';
import TournamentSchedule from '@/components/tournament/TournamentSchedule';
import { cookies } from 'next/headers';
import Loading from '@/components/common/Loading';

function TournamentSchedulePage({
  params: { tournamentId, locale },
}: {
  params: { tournamentId: string; locale: string };
}) {
  const session = cookies().get('authToken')?.value;
  return (
    <>
      {!session ? (
        <Loading />
      ) : (
        <TournamentSchedule
          matches={matches}
          tournamentId={tournamentId}
          locale={locale}
          token={session}
        />
      )}
    </>
  );
}

export default TournamentSchedulePage;
