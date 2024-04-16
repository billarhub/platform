import React from 'react';
import Accordion from '../common/accordion/Accordion';
import ChevronDownIcon from '../icon/ChevronDownIcon';
import { Transition } from '@headlessui/react';
import InputSubtitle from '../common/InputSubtitle';
import { useTranslations } from 'next-intl';
import PlayerSelector from './PlayerSelector';
import Button from '../common/Button';
import SpinnerIcon from '../icon/SpinnerIcon';
import { UseFormSetValue } from 'react-hook-form';
import { ITournamentAddPlayer } from '@/models';

interface IPlayerSelectAccordionProps {
  players: any;
  playersQty: number;
  addPlayerLoading: boolean;
  token: string;
  setValue: UseFormSetValue<ITournamentAddPlayer>;
  onAddExistingPlayer: () => Promise<void>;
}

function PlayerSelectAccordion({
  players,
  token,
  playersQty,
  setValue,
  addPlayerLoading,
  onAddExistingPlayer,
}: IPlayerSelectAccordionProps) {
  const t = useTranslations('Common');
  return (
    <Accordion
      className="flex flex-col flex-wrap w-full bg-white rounded-md mx-auto my-5"
    >
      {({ open }) => (
        <>
          <Accordion.Button className="flex justify-between items-center">
            <span className="text-black font-bold text-lg uppercase">
              {t('addExistingPlayer')}
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
              <div className="w-full">
                <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
                  <InputSubtitle subtitle={t('firstname')}>
                    <PlayerSelector selectedPlayers={players} token={token} setValue={setValue} />
                  </InputSubtitle>
                </div>

                <div className="w-full py-10 flex justify-end items-center">
                  <Button
                    type="button"
                    onClick={onAddExistingPlayer}
                    className={`${
                      players.length >= playersQty
                        ? 'bg-gray-300 hover:bg-gray-300 focus:bg-gray-300'
                        : ''
                    } w-full lg:w-auto`}
                    // disabled={players.length >= playersQty}
                  >
                    {addPlayerLoading ? (
                      <SpinnerIcon className="m-auto w-10 h-10 text-gray-200 animate-spin fill-primary-300" />
                    ) : (
                      t('addPlayer')
                    )}
                  </Button>
                </div>
              </div>
            </Accordion.Panel>
          </Transition>
        </>
      )}
    </Accordion>
  );
}

export default PlayerSelectAccordion;
