'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ITournamentAddPlayer } from '@/models';
import TournamentConfiguration from './TournamentConfiguration';
import Stepper from '../common/Stepper';
import BallEightIcon from '../icon/BallEightIcon';
import PencilIcon from '../icon/PencilIcon';
import UserGroupIcon from '../icon/UserGroupIcon';
import CheckCircleIcon from '../icon/CheckCircleIcon';
import TournamentAddPlayer from './TournamentAddPlayer';
import {
  createTournamentConfigSchema,
  createTournamentPlayerSchema,
} from '@/lib/schemas/tournamentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TournamentConfirmation from './TournamentConfirmation';
import TournamentSummary from './TournamentSummary';

interface ITournamentCreateFormProps {
  token: string;
}

function TournamentCreateForm({ token }: ITournamentCreateFormProps) {
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslation = useTranslations('Common');
  const tournamentConfigSchema =
    createTournamentConfigSchema(commonTranslation);
  const tournamentPlayerSchema =
    createTournamentPlayerSchema(commonTranslation);
  const validationSchema = [tournamentConfigSchema, tournamentPlayerSchema];
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    perPage: 10,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [players, setPlayers] = React.useState<ITournamentAddPlayer[]>([]);

  const form = useForm({
    resolver: zodResolver(validationSchema[selectedIndex]),
    defaultValues: {
      qtySetPerTable: 1,
      qtySetPerFinal: 1,
      playersQuantity: 8,
      phone: '',
    },
  });

  const goNext = () => {
    if (selectedIndex < steps.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goBack = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const deletePlayer = (player: ITournamentAddPlayer) => {
    setPlayers((prevPlayers) => prevPlayers.filter((p) => p !== player));
  };

  const handleGoToPage = React.useCallback(
    (value: number) => {
      setPagination({ ...pagination, currentPage: value });
    },
    [setPagination, pagination]
  );

  const steps = [
    {
      label: tournmaentTranslation('configuration'),
      icon: PencilIcon,
      component: (
        <TournamentConfiguration
          setSelectedIndex={setSelectedIndex}
          key="configuration"
          goNext={goNext}
          token={token}
        />
      ),
    },
    {
      label: tournmaentTranslation('players'),
      icon: UserGroupIcon,
      component: (
        <TournamentAddPlayer
          handleGoToPage={handleGoToPage}
          players={players}
          setPlayers={setPlayers}
          key="players"
          goNext={goNext}
          goBack={goBack}
          token={token}
        />
      ),
    },
    {
      label: tournmaentTranslation('confirmation'),
      icon: CheckCircleIcon,
      component: (
        <TournamentSummary token={token} goNext={goNext} />
      ),
    },
    {
      label: tournmaentTranslation('draw'),
      icon: BallEightIcon,
      component: <TournamentConfirmation />,
    },
  ];

  return (
    <div className="mt-40 w-auto min-h-[1222px] bg-white flex gap-10 justify-stretch items-start md:items-center">
      <FormProvider {...form}>
        <Stepper
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          steps={steps}
          ariaLabel="tournament-tabs"
          mainTitle={tournmaentTranslation('title')}
        />
      </FormProvider>
    </div>
  );
}

export default TournamentCreateForm;
