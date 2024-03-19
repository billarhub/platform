import React from 'react';
import { getTranslations } from 'next-intl/server';
import LoginForm from '@/components/auth/LoginForm';

async function Login({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Index');
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm locale={locale} />
    </section>
  );
}

export default Login;
