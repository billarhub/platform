import React from 'react';
import Link from 'next/link';

interface ITournamentCardProps {
  tournament: {
    _id: string;
    name: string;
    playersQuantity: number;
    location: string;
    initDate: string;
    endDate: string;
    playerMode: string;
    gameMode: string;
    moneyPrice: number;
  };
  locale: string;
}

function TournamentCard({ tournament, locale }: ITournamentCardProps) {
  return ( 
    <Link href={`/${locale}/tournaments/${tournament._id}`} className="bg-white shadow-md rounded-lg overflow-hidden col-span-3 md:col-span-1">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{tournament.name}</h2>
        <p className="text-gray-600">Players: {tournament.playersQuantity}</p>
        <p className="text-gray-600">Location: {tournament.location}</p>
        <p className="text-gray-600">Start Date: {tournament.initDate}</p>
        <p className="text-gray-600">End Date: {tournament.endDate}</p>
        <p className="text-gray-600">Player Mode: {tournament.playerMode}</p>
        <p className="text-gray-600">Game Mode: {tournament.gameMode}</p>
        <p className="text-gray-600">Price: {tournament.moneyPrice}</p>
      </div>
    </Link>
  );
}

export default TournamentCard;