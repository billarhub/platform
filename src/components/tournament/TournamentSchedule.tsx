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
import { useNotify } from '@/contexts/NotifyContext';
import ArrowBackIcon from '../icon/ArrowBackIcon';
import { useRouter } from 'next/navigation';
import DiskIcon from '../icon/DiskIcon';

interface TournamentScheduleProps {
  matches: any;
  tournamentId?: string;
  locale: string;
}

function TournamentSchedule({
  matches,
  tournamentId,
  locale,
}: TournamentScheduleProps) {
  const t = useTranslations('Common');
  const { notify } = useNotify();
  const router = useRouter();

  const {
    data: bracketData,
    isLoading: bracketLoading,
    isError: bracketError,
    refetch: refetchBracket,
  } = useTournamentBracket(tournamentId || '');

  const {
    mutateAsync: updateMatch,
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

  const handleSave = async (
    matchId: string,
    score1: number,
    score2: number
  ) => {
    try {
      await updateMatch({
        id: matchId,
        playerOneScore: score1,
        playerTwoScore: score2,
      });

      if (isUpdating) return;

      await refetchBracket();
      notify('Match score updated successfully', 'success');
    } catch (error) {
      notify('Failed to update match score', 'error');
    }
  };

  const goBackToTournamentDetail = () => {
    if (isUpdating) return;
    router.push(`/${locale}/tournaments/${tournamentId}`);
  };

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
    <div className="mt-40 md:px-60 px-5 w-auto min-h-[1222px] bg-white flex flex-col justify-start items-center md:items-center">
      <div className="w-full flex justify-stretch items-center my-10 gap-5">
        {/* AQUI SE RENDERIZA EL BOTON DE REGRESO */}

        <button
          onClick={() => goBackToTournamentDetail()}
          className="bg-black rounded-lg w-9 h-9 text-white flex justify-center items-center"
        >
          <ArrowBackIcon className="text-white w-7 h-7 font-bold" />
        </button>

        <h1 className="text-3xl font-bold text-black uppercase">Schedule</h1>
      </div>
      {Object.entries(groupedMatches).map(([round, matches]) => (
        <Accordion
          key={round}
          className="flex flex-col flex-wrap w-full overflow-auto bg-white mx-auto my-10 border-2 border-transparent border-b-primary-500"
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
                  {matches.map((match: any, index: number, array: any[])=> {
                    
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
                        className={`flex justify-between items-center text-black gap-5 py-5 ${index !== array.length - 1 ? 'border-b border-lightGray-100' : ''}`}
                      >
                        <div className="text-ellipsis overflow-hidden w-40 flex justify-between items-center">
                          {participant1.name}
                          <div className='rounded-md w-5 h-5 bg-primary-500' />
                        </div>
                        {participant2 && (
                          <div className="flex justify-center items-center w-20">
                            <input
                              type="number"
                              min="0"
                              value={score1}
                              className="w-7"
                              onChange={(e) =>
                                handleScoreChange(
                                  match.id,
                                  participant1.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <input
                              type="number"
                              min="0"
                              value={score2}
                              className="w-7"
                              onChange={(e) =>
                                handleScoreChange(
                                  match.id,
                                  participant2.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        )}

                        {participant2 && (
                          <>
                            <div className="text-ellipsis overflow-hidden w-40 flex justify-between items-center">
                            <div className='rounded-md w-5 h-5 bg-[#1A1C20]' /> 
                              {participant2.name}
                            </div>
                            <button
                              className="ml-2"
                              disabled={isUpdating || match.finish}
                              onClick={() =>
                                handleSave(match.id, score1, score2)
                              }
                            >
                              <DiskIcon className={`w-4 h-4 ${match.finish ? "text-lightGray-100" : "text-lightGray-900"}`} />
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
