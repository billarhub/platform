import React from 'react';
import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server';
import LoginForm from '@/components/auth/LoginForm';

async function Login() {
  const t = await getTranslations('Index');
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm  />
    </section>
  );
}

export default Login;
