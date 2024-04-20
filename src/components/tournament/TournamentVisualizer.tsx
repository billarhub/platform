import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '../common/Button';
import SpinnerIcon from '../icon/SpinnerIcon';
import InputSubtitle from '../common/InputSubtitle';
import SectionTab from '../common/SectionTab';
import ArrowBackIcon from '../icon/ArrowBackIcon';
import { useStartTournament } from '@/hooks/api/tournament';

type TTabOption = {
  label: string;
  key: string;
};

interface TournamentVisualizerProps {
  goNext?: () => void;
  summaryTitle?: string;
  isLoading: boolean;
  tournament: any;
  handleNext?: boolean;
}

interface TabsProps {
  options: TTabOption[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

function TournamentVisualizer({
  summaryTitle,
  goNext = () => {},
  children,
  isLoading,
  tournament,
  handleNext,
}: React.PropsWithChildren<TournamentVisualizerProps>) {
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslations = useTranslations('Common');
  const childrenArray = React.Children.toArray(children);
  const { mutateAsync: startTournament, isLoading: loadingStartTournament } =
    useStartTournament(tournament._id);

  const handleGoNext = async () => {
    try {
      await startTournament();
      goNext();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 text-black w-full">
      <div
        className="flex justify-stretch items-center gap-5 mb-7"
        id="backbutton"
      >
        {childrenArray[0]}
        <h2 className="text-4xl font-bold">
          {summaryTitle
            ? summaryTitle
            : tournmaentTranslation('tournamentSummary')}
        </h2>
      </div>

      {/* RESUMENT DEL TORNEO */}
      <div className="grid grid-flow-row-dense md:grid-cols-4 lg:grid-cols-5 grid-rows-3 gap-5">
        <InputSubtitle
          descriptionClassName="text-red-500"
          subtitle={tournmaentTranslation('TournamentName')}
        >
          <p className="text-lightGray-700">{tournament.name}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('playersNumber')}>
          <p className="text-lightGray-700">{tournament.playersQuantity}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('place')}>
          <p className="text-lightGray-700">{tournament.location}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('startDate')}>
          <p className="text-lightGray-700">{tournament.initDate}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('endDate')}>
          <p className="text-lightGray-700">{tournament.endDate}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('playerMode')}>
          <p className="text-lightGray-700">{tournament.playerMode}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('gameMode')}>
          <p className="text-lightGray-700">{tournament.gameMode}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('sets')}>
          <p className="text-lightGray-700">{tournament.qtySetPerTable}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('finalSet')}>
          <p className="text-lightGray-700">{tournament.qtySetPerFinal}</p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('emailReminder')}>
          <p className="text-lightGray-700">
            {tournament.emailRemember
              ? commonTranslations('yes')
              : commonTranslations('no')}
          </p>
        </InputSubtitle>
        <InputSubtitle subtitle={tournmaentTranslation('tournamentValue')}>
          <p className="text-lightGray-700">{tournament.moneyPrice}</p>
        </InputSubtitle>
      </div>

      {/* AQUI SE RENDERIZAN LAS TABS */}
      <div id="sectionTabs">{childrenArray[1]}</div>

      {/* AQUI SE RENDERIZA EL CONTENIDO DE LA TAB SELECCIONADA */}
      {childrenArray[2]}

      {handleNext ? (
        <div className="flex justify-end items-center w-full">
          <Button
            className="w-full lg:w-[200px]"
            type="button"
            onClick={handleGoNext}
          >
            {isLoading || loadingStartTournament ? (
              <SpinnerIcon className="m-auto w-7 h-7 text-gray-200 animate-spin fill-primary-300" />
            ) : (
              commonTranslations('saveAndFollow')
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

TournamentVisualizer.BackButton = function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.push('/tournaments');
  };
  return (
    <button
      onClick={() => goBack()}
      className="bg-black rounded-lg w-9 h-9 text-white flex justify-center items-center"
    >
      <ArrowBackIcon className="text-white w-7 h-7 font-bold" />
    </button>
  );
};

TournamentVisualizer.Tabs = function Tabs({
  options,
  selectedTab,
  setSelectedTab,
}: TabsProps) {
  return (
    <SectionTab
      selectedOption={selectedTab}
      setSelectedOption={setSelectedTab}
      options={options}
    />
  );
};

export default TournamentVisualizer;
