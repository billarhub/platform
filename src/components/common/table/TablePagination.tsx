import React from 'react';
import { useTable } from './Table';
import { Pagination } from '@/models';
import { calculatePagination } from '@/utils/calculatePagination';
import ChevronDoubleLeftIcon from '@/components/icon/ChevronDoubleLeftIcon';
import ChevronLeftIcon from '@/components/icon/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icon/ChevronRightIcon';
import ChevronDoubleRightIcon from '@/components/icon/ChevronDoubleRightIcon';


interface TablePaginationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  handleGoToPage?: (value: number) => void;
  paginationInfo?: Partial<Pagination>;
}

export default function TablePagination({
  className = '',
  handleGoToPage = () => {},
  paginationInfo = {},
  ...props
}: TablePaginationProps) {
  const table = useTable();

  const [isManualPagination] = React.useState(
    table?.options.manualPagination ?? false
  );

  const paginationRange = React.useMemo(
    () =>
      table?.options.manualPagination
        ? calculatePagination(paginationInfo)
        : {
            current: 0,
            limit: 0,
            total: 0,
          },
    [paginationInfo]
  );

  const handleGoToFirstPage = () => {
    if (isManualPagination) {
      handleGoToPage(1);
    } else {
      table?.setPageIndex(0);
    }
  };

  const handleGoToLastPage = () => {
    if (paginationInfo && paginationInfo.pageInfo) {
      const { pageInfo } = paginationInfo;
      if (isManualPagination) handleGoToPage(pageInfo?.pageCount);
      else if (!isManualPagination) {
        table?.setPageIndex(table?.getPageCount() - 1);
      }
    }
  };

  const handleGoToNextPage = () => {
    const { pageInfo } = paginationInfo;
    if (isManualPagination && pageInfo?.hasNextPage)
      handleGoToPage(pageInfo?.currentPage + 1);
    else if (!isManualPagination) {
      table?.nextPage();
    }
  };

  const handleGoToPrevPage = () => {
    const { pageInfo } = paginationInfo;
    if (isManualPagination && pageInfo?.hasPreviousPage)
      handleGoToPage(pageInfo?.currentPage - 1);
    else if (!isManualPagination) {
      table?.previousPage();
    }
  };

  if (table?.getRowModel().rows.length === 0) return null;

  return (
    <div className={`py-2 flex justify-end items-center ${className}`} {...props}>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap items-center text-slate-500">
          {table?.options.manualPagination ? (
            <li className="text-slate-500">
              {paginationRange?.current} al {paginationRange?.limit} de{' '}
              {paginationRange?.total}
            </li>
          ) : null}
          <li className="">
            <button
              type="button"
              aria-label="Go to first page"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-slate-500"
              onClick={handleGoToFirstPage}
              disabled={
                isManualPagination
                  ? !paginationInfo.pageInfo?.hasPreviousPage
                  : !table?.getCanPreviousPage()
              }
            >
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </button>
          </li>
          <li className="">
            <button
              type="button"
              aria-label="Go to previous page"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0  items-center justify-center leading-tight relative  text-slate-500"
              onClick={handleGoToPrevPage}
              disabled={
                isManualPagination
                  ? !paginationInfo.pageInfo?.hasPreviousPage
                  : !table?.getCanPreviousPage()
              }
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
          </li>
          <li className="">
            <button
              type="button"
              aria-label="Go to next page"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0  items-center justify-center leading-tight relative  text-slate-500 "
              onClick={handleGoToNextPage}
              disabled={
                isManualPagination
                  ? !paginationInfo.pageInfo?.hasNextPage
                  : !table?.getCanNextPage()
              }
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </li>
          <li className="">
            <button
              type="button"
              aria-label="Go to last page"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative  text-slate-500"
              onClick={handleGoToLastPage}
              disabled={
                isManualPagination
                  ? !paginationInfo.pageInfo?.hasNextPage
                  : !table?.getCanNextPage()
              }
            >
              <ChevronDoubleRightIcon className="w-4 h-4" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
