import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BillarHubLogo from '../../../public/image/logo_svg.svg';
import NavButtonGroup from '../navigation/NavButtonGroup';
import AuthButtonGroup from '../navigation/AuthButtonGroup';
import MenuGroup from '../navigation/MenuGroup';
import UserButtonGroup from '../navigation/UserButtonGroup';

interface IHeaderProps {
  locale: string;
  userName?: string;
  session?: string;
}

function Header({ locale, userName, session }: IHeaderProps) {
  return (
    <header className="flex justify-between items-center w-full bg-white px-5 py-2">
      <Link
        href={`/${locale}/dashboard`}
        className="relative w-[198px] h-[36px]"
      >
        <Image src={BillarHubLogo} alt="Billarhub Platform" fill />
      </Link>
      <NavButtonGroup locale={locale} />
      {!session ? <AuthButtonGroup locale={locale} /> : <UserButtonGroup locale={locale} username={userName} />}
      <MenuGroup locale={locale} />
    </header>
  );
}

export default Header;
