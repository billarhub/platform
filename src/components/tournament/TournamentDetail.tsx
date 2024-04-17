'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import {
  useGetTournamentById,
  useTournamentBracket,
} from '@/hooks/api/tournament';
import TournamentVisualizer from './TournamentVisualizer';
import SpinnerIcon from '../icon/SpinnerIcon';
import PlayerList from '../player/PlayerList';
import TournamentSingleBracket from './TournamentSingleBracket';

interface TournamentDetailProps {
  token: string;
  goNext?: () => void;
  summaryTitle?: string;
  tournamentId: string;
  locale: string;
}

function TournamentDetail({
  token,
  goNext,
  summaryTitle,
  tournamentId,
  locale,
}: TournamentDetailProps) {
  const [selectedTab, setSelectedTab] = React.useState('players');
  const tournmaentTranslation = useTranslations('Tournament');
  const loading = false;
  const tabOptions = [
    { label: tournmaentTranslation('players'), key: 'players' },
    { label: tournmaentTranslation('bracket'), key: 'bracket' },
  ];
  const { data, isLoading, isError } = useGetTournamentById(
    token,
    tournamentId || ''
  );
  const {
    data: bracketData,
    isLoading: bracketLoading,
    isError: bracketError,
  } = useTournamentBracket(tournamentId || '');

  if (isLoading || bracketLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] w-full">
        <SpinnerIcon className="m-auto w-16 h-16 text-primary-500 animate-spin fill-primary-300" />
      </div>
    );
  }

  if (isError || !data || bracketError || !bracketData) {
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

  const matches = bracketData?.data?.data?.brackets || [];

  function renderTabContent(selectedTab: string, tournament: any) {
    switch (selectedTab) {
      case 'players':
        return (
          <PlayerList players={tournament.players} handleGoToPage={() => {}} />
        );
      case 'bracket':
        return <TournamentSingleBracket locale={locale} matches={matches} tournamentIdProp={tournamentId} />;
      default:
        return null;
    }
  }

  return (
    <div className="mt-40 w-auto min-h-[1222px] bg-white">
      <TournamentVisualizer
        goNext={goNext}
        summaryTitle={summaryTitle}
        isLoading={loading}
        tournament={tournament}
        handleNext={false}
      >
        <TournamentVisualizer.BackButton />
        <TournamentVisualizer.Tabs
          options={tabOptions}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {renderTabContent(selectedTab, tournament)}
      </TournamentVisualizer>{' '}
    </div>
  );
}

export default TournamentDetail;
