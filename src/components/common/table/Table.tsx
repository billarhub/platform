import React from 'react';
import {
  Table,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  RowData,
} from '@tanstack/react-table';
import TableAlert from './TableAlert';
import TableContent from './TableContent';
import TableFooter from './TableFooter';
import TablePagination from './TablePagination';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    lengthOfData: number;
  }
}

type TTableContext<T> = {
  hook: Table<T> | null;
};

function generateContext<T>() {
  return React.createContext<TTableContext<T>>({
    hook: null,
  });
}

interface TableContextProviderProps<T> {
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
  manualPagination?: boolean;
  visibility?: Record<string, boolean>;
}

let TableContext: React.Context<any> | null = null;

function TableContextProvider<T>({
  children,
  data,
  columns,
  manualPagination = false,
  visibility = {},
}: TableContextProviderProps<T>) {
  TableContext = generateContext<T>();
  const hook = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: visibility,
    },
    meta: {
      lengthOfData: data?.length ?? 0,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    manualPagination,
  });
  const value = React.useMemo(
    () => ({
      hook,
    }),
    [hook]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

interface TableProps<T> {
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
  manualPagination?: boolean;
  visibility?: Record<string, boolean>;
}

export function useTable<T>() {
  const { hook } = React.useContext(TableContext as React.Context<TTableContext<T>>);
  return hook;
}

export default function TableComponent<T>({
  children,
  data,
  columns,
  manualPagination = false,
  visibility = {},
}: TableProps<T>) {
  return (
    <TableContextProvider<T>
      data={data?.length > 0 ? data : []}
      columns={columns}
      visibility={visibility}
      manualPagination={manualPagination}
    >
      {children}
      <TableAlert
        title="No se encontraron resultados"
        text="No hemos encontrado resultados para la búsqueda solicitada"
        show={data?.length === 0}
      />
    </TableContextProvider>
  );
}

TableComponent.TableContent = TableContent;
TableComponent.TableFooter = TableFooter;
TableComponent.TablePagination = TablePagination;
