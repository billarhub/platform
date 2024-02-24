'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Listbox, Transition } from '@headlessui/react';
import { usePathname, useRouter } from '@/lib/i18nNavigation';
import { localesConfig } from '@/utils/localesConfig';
import ChevronDownIcon from '../icon/ChevronDownIcon';
import CheckIcon from '../icon/CheckIcon';

function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Listbox value={locale} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="uppercase relative w-auto cursor-default rounded-lg bg-white py-[5px] pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate text-black font-bold">{locale}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-black"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {localesConfig.map((localeOption, localeIdx) => (
              <Listbox.Option
                key={localeIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  }`
                }
                value={localeOption}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {localeOption}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default LocaleSwitcher;
