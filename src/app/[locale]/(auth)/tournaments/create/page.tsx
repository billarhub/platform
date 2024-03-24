import React from 'react';
import { cookies } from 'next/headers';
import Loading from '@/components/common/Loading';
import TournamentCreateForm from '@/components/tournament/TournamentCreateForm';

async function TorunamentCreate() {
  const session = cookies().get('authToken')?.value;
  return (
    <>{!session ? <Loading /> : <TournamentCreateForm token={session} />}</>
  );
}

export default TorunamentCreate;
