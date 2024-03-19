import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

function Home({ params: { locale } }: { params: { locale: string } }) {
  const session = cookies().get('authToken')?.value;
  if (!session) {
    redirect(`/${locale}/login`);
  }
  return <div>Home</div>;
}

export default Home;
