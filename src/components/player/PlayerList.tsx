'use client';
import React from 'react';
import { ITournamentAddPlayer } from '@/models';

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
    <div>
      {currentPlayers.map((player, index) => (
        <div key={index} className="card flex justify-between items-center gap-5">
          <h2 className="text-black">
            {player.firstName} {player.lastName}
          </h2>
          <p className="text-black">{player.address}</p>
          <p className="text-black">{player.email}</p>
          <p className="text-black">{player.phone}</p>
        </div>
      ))}
      <div className="pagination">{renderPageNumbers}</div>
    </div>
  );
};

export default PlayerList;
