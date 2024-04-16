import React from 'react';
import Button from '../common/Button';
import { useFormContext } from 'react-hook-form';
import { ITournamentAddPlayer } from '@/models';
import Accordion from '../common/accordion/Accordion';
import ChevronDownIcon from '../icon/ChevronDownIcon';
import { Input } from '../common/Input';
import { useTranslations } from 'next-intl';
import InputSubtitle from '../common/InputSubtitle';
import ControlledPhoneInput from '../common/controlled/ControlledPhoneInput';
import { Transition } from '@headlessui/react';
import LeftArrowIcon from '../icon/LeftArrowIcon';
import PlayerList from '../player/PlayerList';
import { playerRoleId } from '@/static/roles';
import {
  useAddPlayerToTournament,
  useGetTournamentById,
} from '@/hooks/api/tournament';
import SpinnerIcon from '../icon/SpinnerIcon';

interface IPlayerTableProps {
  handleGoToPage: (value: number) => void;
  goNext: () => void;
  goBack: () => void;
  token: string;
}

function TournamentAddPlayer({
  handleGoToPage,
  goNext,
  goBack,
  token,
}: IPlayerTableProps) {
  const t = useTranslations('Common');
  const {
    control,
    register,
    formState: { errors },
    trigger,
    reset,
    getValues,
    handleSubmit,
  } = useFormContext<ITournamentAddPlayer>();

  const tournamentId = sessionStorage.getItem('currentTournamentId');
  const [players, setPlayers] = React.useState<ITournamentAddPlayer[]>([]);
  const { data, isLoading, isError } = useGetTournamentById(
    token,
    tournamentId || ''
  );

  React.useEffect(() => {
    if (data?.data.data.tournament?.players) {
      setPlayers(data.data.data.tournament.players);
    } else {
      setPlayers([]);
    }
  }, [data]);

  const { mutate } = useAddPlayerToTournament(token, tournamentId || '');

  const [key, setKey] = React.useState(0);
  const [addPlayerLoading, setAddPlayerLoading] = React.useState(false);

  const onAddPlayer = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      const newPlayer = {
        firstname: getValues('firstname'),
        lastname: getValues('lastname'),
        documentId: getValues('documentId'),
        role: playerRoleId,
        email: getValues('email'),
        phone: getValues('phone'),
      };
      setAddPlayerLoading(true);
      mutate(newPlayer, {
        onSuccess: () => {
          setPlayers([...players, newPlayer]);
          reset({
            firstname: '',
            lastname: '',
            documentId: '',
            email: '',
            phone: '',
          });
          setKey((prevKey) => prevKey + 1);
          setAddPlayerLoading(false);
        },
        onError: (error) => {
          console.error('Error adding player:', error);
          setAddPlayerLoading(false);
        },
      });
    }
  };

  const deleteAllPlayers = () => {
    setPlayers([]);
  };

  const onSubmit = () => {
    goNext();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading tournament data</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
    >
      <Accordion
        defaultOpen
        className="flex flex-col flex-wrap w-full bg-white rounded-md mx-auto my-10"
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
                    <InputSubtitle subtitle={t('firstname')}>
                      <Input
                        {...register(`firstname`)}
                        name="firstname"
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.firstname?.message}
                      />
                    </InputSubtitle>
                    <InputSubtitle subtitle={t('lastname')}>
                      <Input
                        {...register(`lastname`)}
                        name={`lastname`}
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.lastname?.message}
                      />
                    </InputSubtitle>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-start items-center md:gap-10">
                    <InputSubtitle subtitle={t('documentId')}>
                      <Input
                        {...register(`documentId`)}
                        name="documentId"
                        className="w-full"
                        inputClassName="placeholder:font-base uppercase"
                        error={errors?.documentId?.message}
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

                  <div className="w-full py-10 flex justify-end items-center">
                    <Button
                      className="w-full lg:w-auto"
                      type="button"
                      onClick={onAddPlayer}
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
      {/* <PlayerTable
        data={players}
        handleGoToPage={handleGoToPage}
        columns={columns}
      /> */}
      <PlayerList players={players} handleGoToPage={handleGoToPage} />

      <div className="flex w-full flex-col lg:flex-row justify-between items-center gap-5 py-10">
        <div className="flex justify-between items-center gap-2">
          <Button
            className="w-10 h-10 lg:w-auto bg-black hover:bg-black/80 focus:bg-black"
            onClick={goBack}
          >
            <LeftArrowIcon className="w-6 h-6 text-white font-bold" />
          </Button>
          <Button
            onClick={deleteAllPlayers}
            type="button"
            className="w-full lg:w-auto bg-deleteButtonBackground text-deleteButtonText hover:bg-deleteButtonBackground/80 duration-150 ease-in-out focus:bg-deleteButtonBackground"
          >
            {t('erase')}
          </Button>
        </div>
        <Button className="w-full lg:w-auto" type="button" onClick={onSubmit}>
          {t('saveAndFollow')}
        </Button>
      </div>
    </form>
  );
}

export default TournamentAddPlayer;
