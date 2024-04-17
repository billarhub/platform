'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Transition } from '@headlessui/react';
import Accordion from '@/components/common/accordion/Accordion';
import ChevronDownIcon from '@/components/icon/ChevronDownIcon';

interface TournamentScheduleProps {
  matches: any;
}

function TournamentSchedule({ matches }: TournamentScheduleProps) {
  const t = useTranslations('Common');
    const groupedMatches = matches.reduce((acc: any, match: any) => {
    (acc[match.tournamentRoundText] = acc[match.tournamentRoundText] || []).push(match);
    return acc;
  }, {});

  return (
    <div className="mt-40 px-96 w-auto min-h-[1222px] bg-white flex flex-col justify-start items-center md:items-center">
      <div className="w-full flex justify-start items-center my-10">
        <h1 className="text-3xl font-bold text-black uppercase">Schedule</h1>
      </div>
      {matches.map((match: any) => (
        <Accordion
          key={match.id}
          className="flex flex-col flex-wrap w-full bg-white mx-auto my-10 border-2 border-transparent border-b-primary-500"
        >
          {({ open }) => (
            <>
              <Accordion.Button className="flex justify-between items-center">
                <span className="text-black font-bold text-lg uppercase">
                  {match.name}
                </span>
                <ChevronDownIcon
                  className={`w-6 h-6 text-gray-600 text-lg font-semibold ${
                    open ? '-rotate-180' : 'rotate-0'
                  }`}
                />
              </Accordion.Button>
              <Transition
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <Accordion.Panel className="flex flex-row flex-wrap pt-10  w-full">
                  {match.participants.map((participant: any, index: number) => {
                    const initialValue = parseInt(participant.resultText);
                    return (
                      <div
                        key={participant.id}
                        className="flex justify-between items-center text-black gap-5"
                      >
                        {index === 1 && (
                          <input
                            type="number"
                            min="0"
                            value={
                              Number.isNaN(initialValue) ? 0 : initialValue
                            }
                            className="w-10"
                          />
                        )}
                        <p>{participant.name}</p>
                        {index === 0 && (
                          <input
                            type="number"
                            min="0"
                            value={
                              Number.isNaN(initialValue) ? 0 : initialValue
                            }
                            className="w-10"
                          />
                        )}
                      </div>
                    );
                  })}
                </Accordion.Panel>
              </Transition>
            </>
          )}
        </Accordion>
      ))}
    </div>
  );
}

export default TournamentSchedule;
