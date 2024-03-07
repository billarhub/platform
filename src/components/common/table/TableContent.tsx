import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { useTable } from './Table';

export interface MongooseModel {
  _id?: string;
  active?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface TableContentProps {
  onClickRow?: (event: React.MouseEvent<HTMLTableRowElement>, row: any) => void;
  onKeyDownOrUpRow?: (event: React.KeyboardEvent<HTMLTableRowElement>) => void;
}


export default function TableContent<T extends MongooseModel>({
  onClickRow: onClick,
  onKeyDownOrUpRow: onKeyDownOrUp,
}: TableContentProps) {
  const table = useTable<T>();

  if (table?.getRowModel().rows.length === 0) return null;

  return (
    <div className="block w-full overflow-x-auto  ">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead className="bg-table-headerBackground mb-5">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap text-left font-bold text-table-headers "
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              role="button"
              tabIndex={0}
              className="cursor-pointer border-b border-table-headerBackground hover:bg-table-headerBackground"
              data-id={row.original._id}
              onClick={(e) => onClick && onClick(e, row.original)}
              onKeyDown={onKeyDownOrUp}
              onKeyUp={onKeyDownOrUp}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-black text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}