'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { ITournamentAddPlayer, Player } from '@/models';
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
import Button from '../common/Button';
import TrashIcon from '../icon/TrashIcon';

function TournamentCreateForm() {
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
      players: 0,
      sets: 0,
      finalSet: 0,
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

  const deletePlayer = (player: Player) => {
    setPlayers((prevPlayers) => prevPlayers.filter((p) => p !== player));
  };

  const columnHelper = createColumnHelper<Player>();
  const columns = [
    columnHelper.accessor('firstName', {
      header: commonTranslation('firstName'),
    }),
    columnHelper.accessor('lastName', {
      header: commonTranslation('lastName'),
    }),
    columnHelper.accessor('location', {
      header: commonTranslation('location'),
    }),
    columnHelper.accessor('email', {
      header: commonTranslation('email'),
    }),
    columnHelper.accessor('phone', {
      header: commonTranslation('phone'),
    }),
    columnHelper.accessor('active', {
      header: commonTranslation('active'),
    }),
    columnHelper.display({
      id: 'actions',
      header: commonTranslation('actions'),
      cell: (props) => (
        // <button >Delete</button>
        <div className="flex justify-center items-center">
          <Button
            className="rounded-full h-6 w-6 bg-red-600 px-0 py-0 flex justify-center items-center hover:bg-red-600/80"
            onClick={() => deletePlayer(props.row.original)}
          >
            <TrashIcon className="text-white h-[17px] w-[17px]" />
          </Button>
        </div>
      ),
    }),
  ];

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
        />
      ),
    },
    {
      label: tournmaentTranslation('players'),
      icon: UserGroupIcon,
      component: (
        <TournamentAddPlayer
          handleGoToPage={handleGoToPage}
          columns={columns}
          players={players}
          setPlayers={setPlayers}
          key="players"
          goNext={goNext}
          goBack={goBack}
        />
      ),
    },
    {
      label: tournmaentTranslation('confirmation'),
      icon: CheckCircleIcon,
      component: (
        <p className="text-black" key="confirmacion">
          Confirmación Content...
        </p>
      ),
    },
    {
      label: tournmaentTranslation('draw'),
      icon: BallEightIcon,
      component: (
        <p className="text-black" key="sorteo">
          Sorteo Content...
        </p>
      ),
    },
  ];

  return (
    <div className="mt-40 w-auto min-h-[1222px] bg-white flex gap-10 justify-stretch items-start md:items-center">
      <FormProvider {...form}>
        <Stepper
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          // panels={panels}
          steps={steps}
          ariaLabel="tournament-tabs"
          mainTitle={tournmaentTranslation('title')}
        />
      </FormProvider>
    </div>
  );
}

export default TournamentCreateForm;
