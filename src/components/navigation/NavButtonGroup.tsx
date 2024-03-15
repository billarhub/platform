import React from 'react';
import { useTranslations } from 'next-intl';
import { useMenuGroupOptions } from '@/hooks/useMenuGroupOptions';
import Link from 'next/link';

interface INavButtonGroupProps {
  locale: string;
}

function NavButtonGroup({ locale }: INavButtonGroupProps) {
  const t = useTranslations('NavButtonGroup');
  const routeT = useTranslations('Route');
  const menuItemsOptions = useMenuGroupOptions();

  return (
    <div className="hidden md:flex h-full">
      {menuItemsOptions
        .filter(
          (item) =>
            item.text !== routeT('login') && item.text !== routeT('register')
        )
        .map((item, index, array) => (
          <React.Fragment key={item.href}>
            <Link
              href={`/${locale}/${item.href}`}
              className="px-4 py-2 text-black font-bold uppercase bg-transparent border-none"
            >
              {item.text}
            </Link>
            {index < array.length - 1 && (
              <div className="flex justify-center items-center">
                <div className="border-r-[3px] h-5 w-px border-lightGray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
    </div>
  );
}

export default NavButtonGroup;
