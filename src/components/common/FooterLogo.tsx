import React from 'react';
import Image from 'next/image';
import BillarHubLogo from '../../../public/image/logo_new_billar.png';

function FooterLogo() {
  return (
    <div className="hidden md:flex justify-end items-center p-10 bg-transparent">
      <Image
        src={BillarHubLogo}
        alt="Billarhub Platform"
        placeholder="blur"
        width={272}
        height={49}
      />
    </div>
  );
}

export default FooterLogo;
