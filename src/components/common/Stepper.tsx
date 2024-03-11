import React from 'react';
import { Tab } from '@headlessui/react';
import { Steps } from '@/models';

interface IStepperProps {
  steps: Steps[];
  ariaLabel: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  mainTitle: string;
}

function Stepper({
  steps,
  selectedIndex,
  setSelectedIndex,
  ariaLabel,
  mainTitle,
}: IStepperProps) {
  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      vertical
    >
      <Tab.List className="md:flex flex-col space-y-2 hidden w-auto p-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-start">
            <Tab
              className={({ selected }) =>
                `flex items-start text-left ${
                  selected ? 'text-primary-600' : 'text-stepperText'
                }`
              }
            >
              <div className="flex flex-col justify-center items-center">
                <span
                  className={`w-6 h-6 block ${
                    index <= selectedIndex
                      ? 'text-primary-600'
                      : 'text-stepperText'
                  }`}
                >
                  <step.icon />
                </span>

                {index < steps.length - 1 && (
                  <div
                    className={`w-px h-12 ${
                      index <= selectedIndex
                        ? 'bg-primary-600'
                        : 'bg-stepperText'
                    }`}
                  />
                )}
              </div>
              <span
                className={`ml-4 text-xl ${
                  index <= selectedIndex
                    ? 'text-primary-600'
                    : 'text-stepperText'
                }`}
              >
                {step.label}
              </span>
            </Tab>
          </div>
        ))}
      </Tab.List>
      <Tab.Panels className="flex w-full mt-2 p-2 sm:p-5 md:p-10 overflow-x-auto h-full">
        {steps.map((step, index) => (
          <Tab.Panel key={index}>
            <div className="w-full mb-10">
              <h1 className="pb-5 md:pb-12 font-bold uppercase md:text-4xl text-lg text-black">
                {mainTitle}
              </h1>
              {step.component}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Stepper;
