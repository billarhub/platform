'use client';
import React, { use } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Card from '../common/Card';
import TournamentTab from './TournamentTab';
import { useTranslations } from 'next-intl';
import TournamentConfiguration from './TournamentConfiguration';

function TournamentCreateForm() {
  const tournmaentTranslation = useTranslations('Tournament');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const form = useForm({
    defaultValues: {
      players: 0,
      sets: 0,
      finalSet: 0,
    },
  });

  const tabs = [
    tournmaentTranslation('configuration'),
    tournmaentTranslation('players'),
    tournmaentTranslation('confirmation'),
    tournmaentTranslation('draw'),
  ];
  const panels = [
    <TournamentConfiguration
      setSelectedIndex={setSelectedIndex}
      key="configuration"
    />,
    <p className="text-black" key="jugadores">
      Jugadores Content...
    </p>,
    <p className="text-black" key="confirmacion">
      Confirmación Content...
    </p>,
    <p className="text-black" key="sorteo">
      Sorteo Content...
    </p>,
  ];

  return (
    <div className="flex flex-grow flex-col justify-center items-center w-full h-screen">
      <h1 className="pb-5 md:pb-12 font-bold uppercase md:text-4xl text-lg mt-10 md:mt-28">
        {tournmaentTranslation('title')}
      </h1>
      <Card className="rounded-xl md:h-auto lg:w-[1053px] w-full max-h-[1015px] overflow-x-auto md:overflow-visible overflow-y-auto">
        <FormProvider {...form}>
          <TournamentTab
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            options={tabs}
            panels={panels}
            ariaLabel="tournament-tabs"
          />
        </FormProvider>
      </Card>
    </div>
  );
}

export default TournamentCreateForm;
