import React from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';
import { unstable_setRequestLocale } from 'next-intl/server';
import { IUser } from '@/models';
import { NotifyProvider } from '@/contexts/NotifyContext';
import 'react-toastify/dist/ReactToastify.css';
import FooterLogo from '@/components/common/FooterLogo';
import Header from '@/components/common/Header';
import Provider from '@/components/common/Provider';

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
  const userName = userCookie
    ? (JSON.parse(userCookie) as IUser).firstname
    : '';
  const session = cookies().get('authToken')?.value;

  return (
    <NextIntlClientProvider messages={messages}>
      <NotifyProvider>
        <Provider>
          <Header userName={userName} session={session} locale={locale} />

          <main className="flex-grow">
            <div className="flex flex-col h-full">{children}</div>
          </main>

          <FooterLogo />
          <ToastContainer />
        </Provider>
      </NotifyProvider>
    </NextIntlClientProvider>
  );
}
