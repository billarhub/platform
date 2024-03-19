'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../common/Input';
import { ITournamentConfiguration } from '@/models';
import InputSubtitle from '../common/InputSubtitle';
import Button from '../common/Button';
import ControlledRadioGroup from '../common/controlled/ControlledRadioGroup';
interface TournamentConfigurationProps {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

function TournamentConfiguration({
  setSelectedIndex,
}: TournamentConfigurationProps) {
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslations = useTranslations('Common');
  const emailReminderOptions = [
    { id: 1, value: true, label: commonTranslations('yes') },
    { id: 2, value: false, label: commonTranslations('no') },
  ];
  const accessOptions = [
    { id: 1, value: 'public', label: tournmaentTranslation('public') },
    { id: 2, value: 'private', label: tournmaentTranslation('private') },
  ];
  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormContext<ITournamentConfiguration>();
  const resetForm = () => {
    reset({
      name: '',
      players: 0,
      place: '',
      startDate: '',
      endDate: '',
      playerMode: '',
      gameMode: '',
      tournamentType: '',
      sets: 0,
      finalSet: 0,
      emailNotificacion: false,
      access: '',
      tournamentValue: '',
    });
  };
  const onSubmit = (data: ITournamentConfiguration) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-16 py-5 flex flex-col gap-4"
    >
      <InputSubtitle subtitle={tournmaentTranslation('TournamentName')}>
        <Input
          {...register('name')}
          name="name"
          className="w-full md:w-3/4"
          inputClassName="placeholder:font-base uppercase"
          error={errors?.name?.message}
        />
      </InputSubtitle>

      <div className="flex flex-col md:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-fit"
          subtitle={tournmaentTranslation('playersNumber')}
        >
          <Input
            {...register('players')}
            name="players"
            className="w-4/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.players?.message}
            type="number"
            min="0"
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-auto"
          subtitle={tournmaentTranslation('place')}
        >
          <Input
            {...register('place')}
            name="place"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.place?.message}
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-fit"
          subtitleClassName="whitespace-pre"
          subtitle={tournmaentTranslation('startDate')}
        >
          <Input
            {...register('startDate')}
            name="startDate"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.startDate?.message}
            type="date"
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-fit"
          subtitleClassName="whitespace-pre"
          subtitle={tournmaentTranslation('endDate')}
        >
          <Input
            placeholder={tournmaentTranslation('TournamentName')}
            {...register('endDate')}
            name="endDate"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.endDate?.message}
            type="date"
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-fit"
          subtitle={tournmaentTranslation('playerMode')}
        >
          <Input
            {...register('playerMode')}
            name="playerMode"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.playerMode?.message}
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-auto"
          subtitle={tournmaentTranslation('gameMode')}
        >
          <Input
            {...register('gameMode')}
            name="gameMode"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.gameMode?.message}
          />
        </InputSubtitle>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-center md:gap-10">
        <InputSubtitle
          className="w-fit"
          subtitle={tournmaentTranslation('tournamentType')}
        >
          <Input
            {...register('tournamentType')}
            name="tournamentType"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.tournamentType?.message}
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-fit"
          subtitle={tournmaentTranslation('sets')}
        >
          <Input
            {...register('sets')}
            name="sets"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.sets?.message}
            type="number"
            min="0"
          />
        </InputSubtitle>
        <InputSubtitle
          className="w-auto"
          subtitle={tournmaentTranslation('finalSet')}
        >
          <Input
            {...register('finalSet')}
            name="finalSet"
            className="w-full md:w-7/12"
            inputClassName="placeholder:font-base uppercase"
            error={errors?.finalSet?.message}
            type="number"
            min="0"
          />
        </InputSubtitle>
      </div>
      <ControlledRadioGroup
        control={control}
        name="emailNotificacion"
        label={tournmaentTranslation('emailReminder')}
        options={emailReminderOptions}
        error={errors?.emailNotificacion}
      />
      <ControlledRadioGroup
        control={control}
        name="access"
        label={tournmaentTranslation('access')}
        options={accessOptions}
        error={errors?.access}
      />
      <div className="flex justify-end items-center gap-5">
        <Button
          type="submit"
          // onClick={() => {
          //   setSelectedIndex(1);
          // }}
        >
          {commonTranslations('saveAndFollow')}
        </Button>
        <Button
          onClick={resetForm}
          className="bg-deleteButtonBackground text-deleteButtonText hover:bg-deleteButtonBackground/80 duration-150 ease-in-out focus:bg-deleteButtonBackground"
        >
          {commonTranslations('erase')}
        </Button>
      </div>
    </form>
  );
}

export default TournamentConfiguration;
