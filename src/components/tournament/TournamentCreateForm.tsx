'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { Player } from '@/models';
import TournamentConfiguration from './TournamentConfiguration';
import PlayerTable from '../player/PlayerTable';
import Stepper from '../common/Stepper';
import BallEightIcon from '../icon/BallEightIcon';
import PencilIcon from '../icon/PencilIcon';
import UserGroupIcon from '../icon/UserGroupIcon';
import CheckCircleIcon from '../icon/CheckCircleIcon';

function TournamentCreateForm() {
  const tournmaentTranslation = useTranslations('Tournament');
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    perPage: 10,
  });
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

  const columnHelper = createColumnHelper<Player>();
  const columns = [
    columnHelper.accessor('firstName', {
      header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
      header: 'Last Name',
    }),
    columnHelper.accessor('location', {
      header: 'Location',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
    }),
    columnHelper.accessor('active', {
      header: 'Active',
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
        />
      ),
    },
    {
      label: tournmaentTranslation('players'),
      icon: UserGroupIcon,
      component: (
        <PlayerTable
          handleGoToPage={handleGoToPage}
          columns={columns}
          key="players"
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
    <div className="mt-40 md:h-auto w-auto min-h-[1222px] bg-white flex gap-10 justify-stretch items-center">
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
