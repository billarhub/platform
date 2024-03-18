import React from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import FooterLogo from '@/components/common/FooterLogo';
import Header from '@/components/common/Header';
import { cookies } from 'next/headers';
import { IUser } from '@/models';

export default function ContentLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  const userCookie = cookies().get('user')?.value;
  const userName = userCookie ? (JSON.parse(userCookie) as IUser).firstname : '';
  const session = cookies().get('authToken')?.value;
  return (
    <NextIntlClientProvider messages={messages}>
      <Header userName={userName} session={session} locale={locale} />

      <main className="flex-grow ">
        <div className="flex flex-col h-full">{children}</div>
      </main>

      <FooterLogo />
    </NextIntlClientProvider>
  );
}
