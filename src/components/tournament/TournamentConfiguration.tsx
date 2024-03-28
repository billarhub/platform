'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../common/Input';
import { ITournamentConfiguration, OptionType } from '@/models';
import InputSubtitle from '../common/InputSubtitle';
import Button from '../common/Button';
import ControlledRadioGroup from '../common/controlled/ControlledRadioGroup';
import { Select } from '../common/Select';
import { numberOfPlayers } from '@/static/numberOfPlayers';
import {
  useCreateTournament,
} from '@/hooks/api/tournament';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinnerIcon from '../icon/SpinnerIcon';
import TournamentTypeSelect from './TournamentTypeSelect';
interface TournamentConfigurationProps {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  goNext: () => void;
  token: string;
}

function TournamentConfiguration({
  setSelectedIndex,
  goNext,
  token,
}: TournamentConfigurationProps) {
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslations = useTranslations('Common');
  const notify = (type: 'success' | 'error') => {
    if (type === 'success') {
      toast.success(tournmaentTranslation('tournamentCreated'));
    } else if (type === 'error') {
      toast.error('Error');
    }
  };
  const emailReminderOptions = [
    { id: 1, value: true, label: commonTranslations('yes') },
    { id: 2, value: false, label: commonTranslations('no') },
  ];
  const accessOptions = [
    { id: 1, value: 'public', label: tournmaentTranslation('public') },
    { id: 2, value: 'private', label: tournmaentTranslation('private') },
  ];

  const {
    mutateAsync,
    isLoading,
    isError: isCreateTournamentError,
    error: createTournamentError,
  } = useCreateTournament(token);

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useFormContext<ITournamentConfiguration>();

  const resetForm = () => {
    reset({
      name: '',
      playersQuantity: 0,
      location: '',
      initDate: '',
      endDate: '',
      playerMode: '',
      gameMode: '',
      tournamentTypeId: '',
      qtySetPerTable: 1,
      qtySetPerFinal: 1,
      emailRemember: false,
      access: '',
      moneyPrice: '0',
    });
  };

  const onSubmit = async (data: ITournamentConfiguration) => {
    try {
      
      const response = await mutateAsync(data);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.tournamentId
      ) {
        sessionStorage.setItem(
          'currentTournamentId',
          response.data.data.tournamentId
        );
        notify('success');
        goNext();
      }
      // console.log(response);
    } catch (error) {
      notify('error');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-5 flex flex-col gap-4"
    >
      <ToastContainer />
      <InputSubtitle subtitle={tournmaentTranslation('TournamentName')}>
        <Input
          {...register('name')}
          name="name"
          className="w-full"
          inputClassName="placeholder:font-base uppercase"
          error={errors?.name?.message}
        />
      </InputSubtitle>

      <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('playersNumber')}
        >
          <Select options={numberOfPlayers} />
        </InputSubtitle>
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('place')}
        >
          <Input
            {...register('location')}
            name="location"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.location?.message}
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-full"
          subtitleClassName="whitespace-pre"
          subtitle={tournmaentTranslation('startDate')}
        >
          <Input
            {...register('initDate')}
            name="initDate"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.initDate?.message}
            type="date"
            // pattern="\d{2}-\d{2}-\d{4}"
            min={new Date().toISOString().slice(0, 16)}
            max="9999-12-31T23:59"
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-full"
          subtitleClassName="whitespace-pre"
          subtitle={tournmaentTranslation('endDate')}
        >
          <Input
            placeholder={tournmaentTranslation('TournamentName')}
            {...register('endDate')}
            name="endDate"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.endDate?.message}
            type="date"
            // pattern="\d{2}-\d{2}-\d{4}"
            min={watch('initDate')}
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('playerMode')}
        >
          <Input
            {...register('playerMode')}
            name="playerMode"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.playerMode?.message}
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('gameMode')}
        >
          <Input
            {...register('gameMode')}
            name="gameMode"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.gameMode?.message}
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('tournamentType')}
        >
          <TournamentTypeSelect
            token={token}
            error={errors?.tournamentTypeId?.message}
            setValue={setValue}
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('sets')}
        >
          <Input
            {...register('qtySetPerTable', {
              setValueAs: (value) => parseInt(value),
            })}
            name="qtySetPerTable"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.qtySetPerTable?.message}
            type="number"
            min="1"
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-full"
          subtitle={tournmaentTranslation('finalSet')}
        >
          <Input
            {...register('qtySetPerFinal', {
              setValueAs: (value) => parseInt(value),
            })}
            name="qtySetPerFinal"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.qtySetPerFinal?.message}
            type="number"
            min="1"
          />
        </InputSubtitle>
      </div>
      <ControlledRadioGroup
        control={control}
        name="emailRemember"
        label={tournmaentTranslation('emailReminder')}
        options={emailReminderOptions}
        error={errors?.emailRemember}
      />
      <ControlledRadioGroup
        control={control}
        name="access"
        label={tournmaentTranslation('access')}
        options={accessOptions}
        error={errors?.access}
      />
      <InputSubtitle
        className="w-full"
        subtitle={tournmaentTranslation('tournamentValue')}
        descriptionSubtitle={tournmaentTranslation(
          'tournamentValueDescription'
        )}
      >
        <Input
          {...register('moneyPrice', {
            setValueAs: (value) => parseInt(value),
          })}
          name="moneyPrice"
          className="w-full"
          inputClassName="placeholder:font-base uppercase"
          error={errors?.moneyPrice?.message}
          leftIcon="$"
          type="number"
          min="0"
        />
      </InputSubtitle>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 py-10">
        <Button
          onClick={resetForm}
          className="w-full lg:w-auto bg-deleteButtonBackground text-deleteButtonText hover:bg-deleteButtonBackground/80 duration-150 ease-in-out focus:bg-deleteButtonBackground"
        >
          {commonTranslations('erase')}
        </Button>
        <Button className="w-full lg:w-auto" type="submit">
          {isLoading ? (
            <SpinnerIcon className="m-auto w-10 h-10 text-gray-200 animate-spin fill-primary-300" />
          ) : (
            commonTranslations('saveAndFollow')
          )}
        </Button>
      </div>
    </form>
  );
}

export default TournamentConfiguration;
