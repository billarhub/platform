'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18nNavigation';
import { Listbox, Transition } from '@headlessui/react';
import { localesConfig } from '@/utils/localesConfig';
import ChevronDownIcon from '../icon/ChevronDownIcon';
import CheckIcon from '../icon/CheckIcon';

function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  console.log(locale);

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Listbox defaultValue={locale} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="uppercase relative w-auto cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate text-gray-900">{locale}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
      </div>
      <Transition
        as={React.Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {localesConfig.map((locale) => (
            <Listbox.Option
              key={locale}
              value={locale}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {locale}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

export default LocaleSwitcher;
