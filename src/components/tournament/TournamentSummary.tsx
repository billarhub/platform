import React from 'react';

interface TournamentSummaryProps {
  data: any;
}

function TournamentSummary({ data }: TournamentSummaryProps) {
  return (
    <div className="p-5 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-5">Tournament Summary</h2>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Players Quantity:</strong> {data.playersQuantity}
      </p>
      <p>
        <strong>Location:</strong> {data.location}
      </p>
      <p>
        <strong>Init Date:</strong> {data.initDate}
      </p>
      <p>
        <strong>End Date:</strong> {data.endDate}
      </p>
      <p>
        <strong>Player Mode:</strong> {data.playerMode}
      </p>
      <p>
        <strong>Game Mode:</strong> {data.gameMode}
      </p>
      <p>
        <strong>Tournament Type Id:</strong> {data.tournamentTypeId}
      </p>
      <p>
        <strong>Qty Set Per Table:</strong> {data.qtySetPerTable}
      </p>
      <p>
        <strong>Qty Set Per Final:</strong> {data.qtySetPerFinal}
      </p>
      <p>
        <strong>Email Remember:</strong> {data.emailRemember ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Access:</strong> {data.access}
      </p>
      <p>
        <strong>Money Price:</strong> {data.moneyPrice}
      </p>
    </div>
  );
}

export default TournamentSummary;
