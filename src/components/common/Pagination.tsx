import React from 'react';
import ChevronDoubleLeftIcon from '../icon/ChevronDoubleLeftIcon';
import ChevronLeftIcon from '../icon/ChevronLeftIcon';
import ChevronRightIcon from '../icon/ChevronRightIcon';
import ChevronDoubleRightIcon from '../icon/ChevronDoubleRightIcon';
import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  className,
}) => {
  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <div
      className={cn(
        `w-full flex justify-center md:justify-end items-center `,
        className
      )}
    >
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        <ChevronDoubleLeftIcon className="w-4 h-4" />
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
      <button onClick={handleLastPage} disabled={currentPage === totalPages}>
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
