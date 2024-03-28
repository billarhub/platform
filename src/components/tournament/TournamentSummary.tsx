import React from 'react';
import { useGetTournamentById } from '@/hooks/api/tournament';
import { useTranslations } from 'next-intl';
import Button from '../common/Button';
import SpinnerIcon from '../icon/SpinnerIcon';

interface TournamentSummaryProps {
  token: string;
  goNext: () => void;
}

function TournamentSummary({ token, goNext }: TournamentSummaryProps) {
  const tournmaentTranslation = useTranslations('Tournament');
  const commonTranslations = useTranslations('Common');
  const id = sessionStorage.getItem('currentTournamentId');
  const { data, isLoading, isError } = useGetTournamentById(token, id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading tournament data</div>;
  }

  const tournament = data.data.data.tournament;

  return (
    <div className="p-5 text-black w-full">
      <h2 className="text-2xl font-bold mb-5">
        {tournmaentTranslation('tournamentSummary')}
      </h2>
      <p>
        <strong>Name:</strong> {tournament.name}
      </p>
      <p>
        <strong>Players Quantity:</strong> {tournament.playersQuantity}
      </p>
      <p>
        <strong>Location:</strong> {tournament.location}
      </p>
      <p>
        <strong>Init Date:</strong> {tournament.initDate}
      </p>
      <p>
        <strong>End Date:</strong> {tournament.endDate}
      </p>
      <p>
        <strong>Player Mode:</strong> {tournament.playerMode}
      </p>
      <p>
        <strong>Game Mode:</strong> {tournament.gameMode}
      </p>
      <p>
        <strong>Qty Set Per Table:</strong> {tournament.qtySetPerTable}
      </p>
      <p>
        <strong>Qty Set Per Final:</strong> {tournament.qtySetPerFinal}
      </p>
      <p>
        <strong>Email Remember:</strong>{' '}
        {tournament.emailRemember ? 'Yes' : 'No'}
      </p>
      {/* <p>
        <strong>Access:</strong> {tournament.access ? 'Private' : 'Public'}
      </p> */}
      <p>
        <strong>Money Price:</strong> {tournament.moneyPrice}
      </p>

      <div className="flex justify-end items-center w-full">
        <Button
          className="w-full lg:w-auto"
          type="button"
          onClick={() => goNext()}
        >
          {isLoading ? (
            <SpinnerIcon className="m-auto w-10 h-10 text-gray-200 animate-spin fill-primary-300" />
          ) : (
            commonTranslations('saveAndFollow')
          )}
        </Button>
      </div>
    </div>
  );
}

export default TournamentSummary;
