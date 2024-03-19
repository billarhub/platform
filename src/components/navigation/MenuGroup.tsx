'use client';
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useMenuGroupOptions } from '@/hooks/useMenuGroupOptions';
import MenuIcon from '../icon/MenuIcon';
import Link from 'next/link';

interface IMenuGroupProps {
  locale: string;
  session?: string;
}

function MenuGroup({ locale, session }: IMenuGroupProps) {
  const isAuthenticated = session !== null;

  let menuItemsOptions = useMenuGroupOptions();
  if (isAuthenticated) {
    menuItemsOptions = menuItemsOptions.filter(
      (option) => option.href !== '/login' && option.href !== '/sign-up'
    );
  }

  return (
    <Menu as="div" className="md:hidden">
      <div>
        <Menu.Button className="flex justify-center items-center font-bold rounded-md bg-transparent border-none px-4 py-2 text-sm text-white">
          <MenuIcon
            className="-mr-1 ml-2 h-5 w-5 text-black hover:text-gray-600"
            aria-hidden="true"
            strokeWidth={3}
          />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menuItemsOptions.map((item) => {
              if (item.accent) {
                return (
                  <Menu.Item key={item.href}>
                    {({ active }) => (
                      <Link
                        href={`/${locale}/${item.href}`}
                        as={item.as}
                        className={`${
                          active
                            ? 'bg-primary-500 text-white'
                            : 'text-primary-600'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {item.text}
                      </Link>
                    )}
                  </Menu.Item>
                );
              }
              return (
                <Menu.Item key={item.href}>
                  {({ active }) => (
                    <Link
                      href={`/${locale}/${item.href}`}
                      as={item.as}
                      className={`${
                        active ? 'bg-primary-500 text-white' : 'text-black'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {item.text}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MenuGroup;
