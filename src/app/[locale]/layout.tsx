import FooterLogo from '@/components/common/FooterLogo';
import Header from '@/components/common/Header';

export default function ContentLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <section>
      <Header locale={locale} />

      {children}
      <FooterLogo />
    </section>
  );
}
