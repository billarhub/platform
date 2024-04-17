'use client';
import React from 'react';
import Pagination from '../common/Pagination';
import { useTournamentsPagination } from '@/hooks/api/tournament';
import TournamentCard from './TournamentCard';
import Loading from '../common/Loading';

interface ITournamentListProps {
  locale: string;
}

function TournamentList({ locale }: ITournamentListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const perPage = 10;
  const { data, isLoading, isError } = useTournamentsPagination(
    currentPage,
    perPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[1222px] bg-white">
        <Loading isFixed={false} />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading tournaments</div>;
  }

  const tournaments = data?.data?.data?.tournaments || [];

  return (
    <div className="grid grid-flow-row-dense grid-rows-3 gap-5 md:gap-10 grid-cols-2 mt-40 w-auto min-h-[1222px] bg-white text-black">
      {/* <div className=' mt-40 min-h-[1222px] bg-white grid grid-flow-dense justify-center gap-[1rem] md:justify-start items-center  grid-cols-fill-15  h-full w-full'> */}
      {tournaments.map((tournament: any) => (
        <div key={tournament._id} className="flex items-center justify-center">
          <TournamentCard locale={locale} tournament={tournament} />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={data?.data?.data?.pageInfo?.pageCount}
        className="col-span-3"
      />
    </div>
  );
}

export default TournamentList;
{
  /* <div className="mt-40 w-auto min-h-[1222px] bg-white text-black">
<div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ">
  {tournaments.map((tournament: any) => (
    <div
      key={tournament._id}
      className="bg-purple-500 border w-auto h-auto"
    >
      {tournament.name}
    </div>
  ))}
</div>
<Pagination
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  totalPages={data?.data?.data?.pageInfo?.pageCount}
/>
</div> */
}
