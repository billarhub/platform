'use client';
import React from 'react';
import { ITournamentAddPlayer } from '@/models';
import AvatarLetter from '../common/AvatarLetter';

interface PlayerListProps {
  players: ITournamentAddPlayer[];
  handleGoToPage: (page: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, handleGoToPage }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const playersPerPage = 10; // Change this to your desired number of players per page

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(players.length / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </button>
    );
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleGoToPage(pageNumber);
  };

  return (
    <div className="w-full h-full">
      {currentPlayers.map((player, index) => (
        <div
          key={index}
          className="flex justify-stretch my-5 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] rounded-lg gap-5"
        >
          <AvatarLetter name={player.firstName} />
          <div className="text-left flex-1" id="player-info">
            <h2 className="text-black text-xl font-bold">
              {player.firstName} {player.lastName}
            </h2>
            <p className="text-black">{player.documentId}</p>
            <p className="text-black">{player.email}</p>
            <p className="text-black">
              +{player.phone.substring(0, 2)} {player.phone.substring(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="pagination">{renderPageNumbers}</div>
    </div>
  );
};

export default PlayerList;
