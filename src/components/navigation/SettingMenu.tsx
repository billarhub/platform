import React from 'react';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import SettingIcon from '../icon/SettingIcon';
import { destroySession } from '@/app/actions';

interface ISettingMenuProps {
  locale: string;
}

function SettingMenu({ locale }: ISettingMenuProps) {
  const router = useRouter();
  const settingItemsOptions = [
    { text: 'Settings', href: 'settings', accent: false, as: '/settings' },
    { text: 'Logout', href: 'logout', accent: true },
  ];

  const logout = async () => {
    await destroySession();
    router.push(`/${locale}/login`);
  };

  return (
    <Menu as="div">
      <div>
        <Menu.Button className="flex justify-center items-center font-bold rounded-md bg-transparent border-none px-4 py-2 text-sm text-white">
          <SettingIcon
            className="h-6 w-6 text-lightGray-600"
            aria-hidden="true"
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
            {settingItemsOptions.map((item) => {
              if (item.accent) {
                return (
                  <Menu.Item key={item.href}>
                    {({ active }) => (
                      <div
                        onClick={logout}
                        className={`${
                          active ? 'bg-red-500 text-white' : 'text-red-600'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {item.text}
                      </div>
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

export default SettingMenu;
