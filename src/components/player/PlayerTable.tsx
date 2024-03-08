import React from 'react';
import Table from '../common/table';
import { tableDataExample } from '@/utils/tableDataExample';

interface IPlayerTableProps {
  handleGoToPage: (value: number) => void;
  columns: any;
  data?: any;
}

function PlayerTable({ handleGoToPage, columns, data }: IPlayerTableProps) {
  return (
    <div className="w-full">
      <Table
        data={data ? data : tableDataExample.items}
        columns={columns}
        manualPagination
      >
        <Table.TableContent />
        <Table.TableFooter />
        <Table.TablePagination
          paginationInfo={tableDataExample}
          handleGoToPage={handleGoToPage}
        />
      </Table>
    </div>
  );
}

export default PlayerTable;
