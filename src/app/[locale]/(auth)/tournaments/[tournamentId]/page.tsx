import React from 'react';
import { cookies } from 'next/headers';
import TournamentDetail from '@/components/tournament/TournamentDetail';
import Loading from '@/components/common/Loading';
import { jwtDecode } from 'jwt-decode';
import { IDecodedJwt } from '@/models';

function TournamentDetailPage({
  params: { tournamentId, locale },
}: {
  params: { tournamentId: string; locale: string };
}) {
  const session = cookies().get('authToken')?.value;
  const userGuestId = session ? (jwtDecode(session) as IDecodedJwt).userId : null;
  const isGuest = userGuestId === process.env.NEXT_PUBLIC_GUEST_ID;
  return (
    <>
      {!session ? (
        <Loading />
      ) : (
        <TournamentDetail
          tournamentId={tournamentId}
          token={session}
          locale={locale}
          isGuest={isGuest}
        />
      )}
    </>
  );
}

export default TournamentDetailPage;
