import React from 'react';
import Table from '../common/table';
import { tableDataExample } from '@/utils/tableDataExample';

interface IPlayerTableProps {
  handleGoToPage: (value: number) => void;
  columns: any;
}

function PlayerTable({ handleGoToPage, columns }: IPlayerTableProps) {
  return (
    <Table data={tableDataExample.items} columns={columns}>
      <Table.TableContent />
      <Table.TableFooter />
      <Table.TablePagination
        paginationInfo={tableDataExample}
        handleGoToPage={handleGoToPage}
      />
    </Table>
  );
}

export default PlayerTable;
