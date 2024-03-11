import React from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/cn';
import { Steps } from '@/models';

type TournamentTabProps = {
  steps: Steps[];
  panels: React.ReactNode[];
  ariaLabel: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TournamentTab: React.FC<TournamentTabProps> = ({
  steps,
  panels,
  ariaLabel,
  selectedIndex,
  setSelectedIndex,
}) => (
  <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
    <Tab.List
      className="flex rounded-t-xl bg-tabBackground w-[1053px] md:w-3/4 justify-center items-center"
      aria-label={ariaLabel}
    >
      {steps.map((step, index) => (
        <Tab
          key={step.label}
          className={({ selected }) =>
            cn(
              'flex max-w-[150px] items-center min-h-max',
              selected ? 'text-primary' : 'text-stepperText'
            )
          }
        >
          <div className="flex flex-col items-center mr-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                index < selectedIndex ? 'bg-primary' : 'bg-stepperText'
              }`}
            />
            {index < steps.length - 1 && (
              <div
                className={`w-px h-20 ml-4 ${
                  index < selectedIndex ? 'bg-primary' : 'bg-stepperText'
                }`}
              />
            )}
          </div>
          <div className="text-lg text-left font-medium">{step.label}</div>
        </Tab>
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
