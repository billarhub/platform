import React from 'react';
import PlayerTable from '../player/PlayerTable';
import Button from '../common/Button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ITournamentAddPlayer } from '@/models';
import Accordion from '../common/accordion/Accordion';
import ChevronDownIcon from '../icon/ChevronDownIcon';
import { Input } from '../common/Input';
import { useTranslations } from 'next-intl';
import InputSubtitle from '../common/InputSubtitle';
import { PhoneInputModel } from '../common/PhoneInput';
import ControlledPhoneInput from '../common/controlled/ControlledPhoneInput';
import { Transition } from '@headlessui/react';

interface IPlayerTableProps {
  handleGoToPage: (value: number) => void;
  columns: any;
  players: ITournamentAddPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<ITournamentAddPlayer[]>>;
}

function TournamentAddPlayer({
  handleGoToPage,
  columns,
  players,
  setPlayers,
}: IPlayerTableProps) {
  const t = useTranslations('Common');
  const {
    control,
    register,
    formState: { errors },
    trigger,
    reset,
    getValues,
  } = useFormContext<ITournamentAddPlayer>();

  const [key, setKey] = React.useState(0);

  const onAddPlayer = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setPlayers([
        ...players,
        {
          firstName: getValues('firstName'),
          lastName: getValues('lastName'),
          location: getValues('location'),
          email: getValues('email'),
          phone: getValues('phone'),
          active: true,
        },
      ]);
      reset({
        firstName: '',
        lastName: '',
        location: '',
        email: '',
        phone: '',
      });
      setKey((prevKey) => prevKey + 1);
    }
  };

  const deleteAllPlayers = () => {
    setPlayers([]);
  };

  const onSubmit = () => {
    console.log(players);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center"
    >
      <Accordion
        defaultOpen
        className="flex flex-col flex-wrap w-full bg-white rounded-md mx-auto px-6 pt-4 pb-8 mt-10"
      >
        {({ open }) => (
          <>
            <Accordion.Button className="flex justify-between items-center">
              <span className="text-black font-bold text-lg uppercase">
                {t('addPlayer')}
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
                    <InputSubtitle subtitle={t('firstName')}>
                      <Input
                        {...register(`firstName`)}
                        name="firstName"
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.firstName?.message}
                      />
                    </InputSubtitle>
                    <InputSubtitle subtitle={t('lastName')}>
                      <Input
                        {...register(`lastName`)}
                        name={`lastName`}
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.lastName?.message}
                      />
                    </InputSubtitle>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
                    <InputSubtitle subtitle={t('location')}>
                      <Input
                        {...register(`location`)}
                        name="location"
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.location?.message}
                      />
                    </InputSubtitle>
                    <InputSubtitle subtitle={t('email')}>
                      <Input
                        {...register(`email`)}
                        name={`email`}
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.email?.message}
                      />
                    </InputSubtitle>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
                    <InputSubtitle subtitle={t('phone')}>
                      <ControlledPhoneInput
                        inputKey={key}
                        label={t('phone')}
                        control={control}
                        name={'phone'}
                        labelClassName="w-full"
                        error={errors?.phone?.message}
                      />
                    </InputSubtitle>
                  </div>

                  <div className="w-full p-4 flex justify-end items-center">
                    <Button
                      className="w-full lg:w-auto"
                      type="button"
                      onClick={onAddPlayer}
                    >
                      {t('addPlayer')}
                    </Button>
                  </div>
                </div>
              </Accordion.Panel>
            </Transition>
          </>
        )}
      </Accordion>
      <PlayerTable handleGoToPage={handleGoToPage} columns={columns} />
      <div className="flex w-full flex-col lg:flex-row justify-between items-center gap-5 py-10">
        <Button
          onClick={deleteAllPlayers}
          type="button"
          className="w-full lg:w-auto bg-deleteButtonBackground text-deleteButtonText hover:bg-deleteButtonBackground/80 duration-150 ease-in-out focus:bg-deleteButtonBackground"
        >
          {t('erase')}
        </Button>
        <Button className="w-full lg:w-auto" type="button" onClick={onSubmit}>
          {t('saveAndFollow')}
        </Button>
      </div>
    </form>
  );
}

export default TournamentAddPlayer;
