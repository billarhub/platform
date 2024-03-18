'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useMenuGroupOptions } from '@/hooks/useMenuGroupOptions';
import Link from 'next/link';
import LocaleSwitcher from '../common/LocaleSwitcher';

interface IAuthButtonGroupProps {
  locale: string;
}

function AuthButtonGroup({ locale }: IAuthButtonGroupProps) {
  const t = useTranslations('AuthButtonGroup');
  const routeT = useTranslations('Route');
  const menuItemsOptions = useMenuGroupOptions();

  return (
    <div className="hidden md:flex h-full">
      <LocaleSwitcher />
      {menuItemsOptions
        .filter(
          (item) =>
            item.text === routeT('login') || item.text === routeT('register')
        )
        .map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className="px-4 py-2 text-black font-bold uppercase bg-transparent border-none"
          >
            {item.text}
          </Link>
        ))}
    </div>
  );
}

export default AuthButtonGroup;
