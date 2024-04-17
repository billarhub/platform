'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Transition } from '@headlessui/react';
import Accordion from '@/components/common/accordion/Accordion';
import ChevronDownIcon from '@/components/icon/ChevronDownIcon';
import {
  useTournamentBracket,
  useUpdateTournamentMatch,
} from '@/hooks/api/tournament';
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

  const {
    mutate: updateMatch,
    isLoading: isUpdating,
    isError: updateError,
  } = useUpdateTournamentMatch();

  const matchesResponse = bracketData?.data?.data?.brackets || matches;

  const [groupedMatches, setGroupedMatches] = React.useState<
    Record<string, any[]>
  >({});

  React.useEffect(() => {
    const grouped = matchesResponse.reduce(
      (acc: Record<string, any[]>, match: any) => {
        (acc[match.tournamentRoundText] =
          acc[match.tournamentRoundText] || []).push(match);
        return acc;
      },
      {}
    );
    setGroupedMatches(grouped);
  }, [matchesResponse]);

  const handleScoreChange = (
    matchId: string,
    participantId: string,
    newScore: number
  ) => {
    setGroupedMatches((prevState: any) => {
      const updatedState = { ...prevState };
      for (const round in updatedState) {
        updatedState[round] = updatedState[round].map((match: any) => {
          if (match.id === matchId) {
            match.participants = match.participants.map((participant: any) => {
              if (participant.id === participantId) {
                participant.resultText = newScore.toString();
              }
              return participant;
            });
          }
          return match;
        });
      }
      return updatedState;
    });
  };

  if (bracketLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] w-full">
        <SpinnerIcon className="m-auto w-16 h-16 text-primary-500 animate-spin fill-primary-300" />
      </div>
    );
  }

  if (bracketError || !bracketData || updateError) {
    return <div className="text-black">Error loading bracket data</div>;
  }

  return (
    <div className="mt-40 px-60 w-auto min-h-[1222px] bg-white flex flex-col justify-start items-center md:items-center">
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
                    const participant1 = match.participants[0];
                    const participant2 = match.participants[1];

                    const score1 = parseInt(participant1.resultText);
                    const score2 = participant2
                      ? parseInt(participant2.resultText)
                      : 0;

                    return (
                      <div
                        key={match.id}
                        className="flex justify-between items-center text-black gap-5"
                      >
                        <p>{participant1.name}</p>
                        {participant2 && (
                          <input
                            type="number"
                            min="0"
                            value={score1}
                            className="w-10"
                            onChange={(e) =>
                              handleScoreChange(
                                match.id,
                                participant1.id,
                                parseInt(e.target.value)
                              )
                            }
                          />
                        )}
                        {participant2 && (
                          <>
                            <input
                              type="number"
                              min="0"
                              value={score2}
                              className="w-10"
                              onChange={(e) =>
                                handleScoreChange(
                                  match.id,
                                  participant2.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <p>{participant2.name}</p>
                            <button
                              className="ml-2"
                              disabled={isUpdating}
                              onClick={() =>
                                updateMatch({
                                  id: match.id,
                                  playerOneScore: score1,
                                  playerTwoScore: score2,
                                })
                              }
                            >
                              Save
                            </button>
                          </>
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
