import React from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import FooterLogo from '@/components/common/FooterLogo';
import Header from '@/components/common/Header';

export default function ContentLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <section className="flex flex-col min-h-screen">
        <Header locale={locale} />

        <main className="flex-grow overflow-auto">
          <div className="flex flex-col h-full">{children}</div>
        </main>

        <FooterLogo />
      </section>
    </NextIntlClientProvider>
  );
}
