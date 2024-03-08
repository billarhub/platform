'use client';
import React from 'react';
import Image from 'next/image';
import BillarHubLogo from '../../../public/image/logo_svg.svg';
import NavButtonGroup from '../navigation/NavButtonGroup';
import AuthButtonGroup from '../navigation/AuthButtonGroup';
import MenuGroup from '../navigation/MenuGroup';
import UserButtonGroup from '../navigation/UserButtonGroup';
import Link from 'next/link';

interface IHeaderProps {
  locale: string;
}

function Header({ locale }: IHeaderProps) {
  const session = sessionStorage.getItem('session');
  const isAuthenticated = session !== null;

  return (
    <header className="flex justify-between items-center w-full bg-white px-5 py-2">
      <Link href='/dashboard' className="relative w-[198px] h-[36px]">
        <Image src={BillarHubLogo} alt="Billarhub Platform" fill />
      </Link>
      <NavButtonGroup />
      {!isAuthenticated ? <AuthButtonGroup /> : <UserButtonGroup />}
      <MenuGroup locale={locale} />
    </header>
  );
}

export default Header;
