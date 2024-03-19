'use client';
import React from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/cn';

type TournamentTabProps = {
  options: string[];
  panels: React.ReactNode[];
  ariaLabel: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TournamentTab: React.FC<TournamentTabProps> = ({
  options,
  panels,
  ariaLabel,
  selectedIndex,
  setSelectedIndex,
}) => (
  <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
    <Tab.List
      className="flex rounded-t-xl bg-tabBackground w-[1053px] md:w-full"
      aria-label={ariaLabel}
    >
      {options.map((tab, index) => (
        <div key={tab} className="flex w-full items-center">
          <Tab
            className={({ selected }) =>
              cn(
                'border-b-[3px] flex justify-center items-center w-full focus:outline-none font-bold text-black text-lg uppercase min-h-[84px]',
                !selected ? ' border-tabBorderBottom' : 'border-primary-600'
              )
            }
          >
            {tab}
          </Tab>
          {index < options.length - 1 && (
            <div className="border-r-[3px] h-5 w-px border-lightGray-400" />
          )}
        </div>
      ))}
    </Tab.List>
    <Tab.Panels className="mt-2">
      {panels.map((panel, index) => (
        <Tab.Panel key={index}>{panel}</Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
);

export default TournamentTab;
