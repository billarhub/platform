'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Transition } from '@headlessui/react';
import Accordion from '@/components/common/accordion/Accordion';
import ChevronDownIcon from '@/components/icon/ChevronDownIcon';
import { useTournamentBracket } from '@/hooks/api/tournament';
import SpinnerIcon from '../icon/SpinnerIcon';

interface TournamentScheduleProps {
  matches: any;
  tournamentId?: string;
}

function TournamentSchedule({
  matches,
  tournamentId,
}: TournamentScheduleProps) {
  const t = useTranslations('Common');

  const {
    data: bracketData,
    isLoading: bracketLoading,
    isError: bracketError,
  } = useTournamentBracket(tournamentId || '');

  const matchesResponse = bracketData?.data?.data?.brackets || matches;

  const groupedMatches: Record<string, any[]> = matchesResponse.reduce(
    (acc: Record<string, any[]>, match: any) => {
      (acc[match.tournamentRoundText] =
        acc[match.tournamentRoundText] || []).push(match);
      return acc;
    },
    {}
  );

  if (bracketLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] w-full">
        <SpinnerIcon className="m-auto w-16 h-16 text-primary-500 animate-spin fill-primary-300" />
      </div>
    );
  }

  if (bracketError || !bracketData) {
    return <div className="text-black">Error loading bracket data</div>;
  }

  return (
    <div className="mt-40 px-96 w-auto min-h-[1222px] bg-white flex flex-col justify-start items-center md:items-center">
      <div className="w-full flex justify-start items-center my-10">
        <h1 className="text-3xl font-bold text-black uppercase">Schedule</h1>
      </div>
      {Object.entries(groupedMatches).map(([round, matches]) => (
        <Accordion
          key={round}
          className="flex flex-col flex-wrap w-full bg-white mx-auto my-10 border-2 border-transparent border-b-primary-500"
        >
          {({ open }) => (
            <>
              <Accordion.Button className="flex justify-between items-center">
                <span className="text-black font-bold text-lg uppercase">
                  {round}
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
                <Accordion.Panel className="flex flex-col flex-wrap pt-10 w-full">
                  {matches.map((match: any) => {
                    if (match.participants.length === 0) {
                      return (
                        <div key={match.id} className="text-black">
                          No participants for this match
                        </div>
                      );
                    }
                    const [participant1, participant2] = match.participants;
                    const score1 = parseInt(participant1.resultText);
                    const score2 = parseInt(participant2.resultText);

                    return (
                      <div
                        key={match.id}
                        className="flex justify-between items-center text-black gap-5"
                      >
                        <p>{participant1.name}</p>
                        <input
                          type="number"
                          min="0"
                          value={Number.isNaN(score1) ? 0 : score1}
                          className="w-10"
                        />
                        <input
                          type="number"
                          min="0"
                          value={Number.isNaN(score2) ? 0 : score2}
                          className="w-10"
                        />
                        <p>{participant2.name}</p>
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
