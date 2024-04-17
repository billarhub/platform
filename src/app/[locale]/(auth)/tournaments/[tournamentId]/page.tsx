import React from 'react';
import { cookies } from 'next/headers';
import TournamentDetail from '@/components/tournament/TournamentDetail';
import Loading from '@/components/common/Loading';

function TournamentDetailPage({
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
        <TournamentDetail tournamentId={tournamentId} token={session} locale={locale} />
      )}
    </>
  );
}

export default TournamentDetailPage;
