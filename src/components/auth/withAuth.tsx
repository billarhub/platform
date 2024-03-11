'use client';
import React from 'react';
import { redirect } from 'next/navigation';

function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const session = sessionStorage.getItem('session');
    React.useEffect(() => {
      if (session !== 'authenticated') {
        redirect('/login');
      }
    }, []);
    if (session !== 'authenticated') {
      return null;
    }
    return <Component {...props} />;
  };
}

export default withAuth;
