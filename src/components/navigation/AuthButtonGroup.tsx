import React from 'react';
import { useTranslations } from 'next-intl';
import { useMenuGroupOptions } from '@/hooks/useMenuGroupOptions';
import Link from 'next/link';
import LocaleSwitcher from '../common/LocaleSwitcher';

function AuthButtonGroup() {
  const t = useTranslations('AuthButtonGroup');
  const routeT = useTranslations('Route');
  const menuItemsOptions = useMenuGroupOptions();

  return (
    <div className="hidden md:flex h-full">
      {menuItemsOptions
        .filter(
          (item) =>
            item.text === routeT('login') || item.text === routeT('register')
        )
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-black font-bold uppercase bg-transparent border-none"
          >
            {item.text}
          </Link>
        ))}
      <LocaleSwitcher />
    </div>
  );
}

export default AuthButtonGroup;
