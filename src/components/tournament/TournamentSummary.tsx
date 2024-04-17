import React from 'react';
import { useTranslations } from 'next-intl';
import { useGetTournamentById } from '@/hooks/api/tournament';
import TournamentVisualizer from './TournamentVisualizer';
import SpinnerIcon from '../icon/SpinnerIcon';
import PlayerList from '../player/PlayerList';

interface TournamentSummaryProps {
  token: string;
  goNext: () => void;
  summaryTitle?: string;
}

function TournamentSummary({
  token,
  goNext,
  summaryTitle,
}: TournamentSummaryProps) {
  const [selectedTab, setSelectedTab] = React.useState('players');
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslations = useTranslations('Common');
  const id = sessionStorage.getItem('currentTournamentId');
  const loading = false;
  const tabOptions = [
    { label: tournmaentTranslation('players'), key: 'players' },
    // { label: tournmaentTranslation('bracket'), key: 'bracket' },
  ];
  const { data, isLoading, isError } = useGetTournamentById(token, id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] w-full">
        <SpinnerIcon className="m-auto w-16 h-16 text-primary-500 animate-spin fill-primary-300" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-black">Error loading tournament data</div>;
  }

  const tournament = data?.data.data.tournament
    ? data.data.data.tournament
    : {
        name: 'Test Tournament',
        playersQuantity: 10,
        location: 'Test Location',
        initDate: '2022-01-01',
        endDate: '2022-01-31',
        playerMode: 'Single',
        gameMode: 'Test Game Mode',
        qtySetPerTable: 3,
        qtySetPerFinal: 5,
        emailRemember: true,
        moneyPrice: 1000,
        players: [],
      };

  return (
    <TournamentVisualizer
      goNext={goNext}
      summaryTitle={summaryTitle}
      isLoading={loading}
      tournament={tournament}
      handleNext={true}
    >
      <></>
      <TournamentVisualizer.Tabs
        options={tabOptions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === 'players' && (
        <PlayerList players={tournament.players} handleGoToPage={() => {}} />
      )}
    </TournamentVisualizer>
  );
}

export default TournamentSummary;
