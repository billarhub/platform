import React from 'react';
import Image from 'next/image';
import BillarHubLogo from '../../../public/image/logo_svg.svg';
import NavButtonGroup from '../navigation/NavButtonGroup';
import AuthButtonGroup from '../navigation/AuthButtonGroup';
import MenuGroup from '../navigation/MenuGroup';

interface IHeaderProps {
  locale: string;
}

function Header({ locale }: IHeaderProps) {
  return (
    <header className="flex justify-between items-center w-full bg-white px-5 py-2">
      <Image src={BillarHubLogo} alt="Billarhub Platform" width={198} height={36} />
      <NavButtonGroup />
      <AuthButtonGroup />
      <MenuGroup locale={locale} />
    </header>
  );
}

export default Header;
