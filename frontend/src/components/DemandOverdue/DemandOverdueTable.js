import React, { useMemo } from 'react';
import './DemandOverdueTable.css';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import MOCK_DATA from '../MOCK_DATA.json';
import { COLUMNS } from './columns';
import { CaretDownFill, CaretUpFill, ChevronBarExpand, CalendarWeek } from 'react-bootstrap-icons';
import { GlobalFilter } from './GlobalFilter';
import { Checkbox } from './Checkbox';

export const DemandOverdueTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // We don't need it due to pagination
        // footerGroups,
        // rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        selectedFlatRows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    }, useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        })

    const { globalFilter } = state
    const { pageIndex, pageSize } = state

    return (
        <>
            <div className="upper">
                <div>
                    <CalendarWeek />
                </div>
                <p className="title">demand overdue</p>
            </div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span className="order">
                                        {column.isSorted ? (column.isSortedDesc ? <CaretDownFill /> : <CaretUpFill />) : <ChevronBarExpand />}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td{...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                {/* // We don't need it due to pagination
                // <tfoot>
                    //     {footerGroups.map(footerGroup => (
                //         <tr{...footerGroup.getFooterGroupProps()}>
                        //             {footerGroup.headers.map(column => (
                //                 <td {...column.getFooterProps}>
                            //                     {column.render('Footer')}
                //                 </td>
                //             ))}
                //         </tr>
                //     ))}
                // </tfoot> */}
            </table>
            <div className="pagination">
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                    }
                </select>
                <span className="pages">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button className="btn-previous" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <button className="btn-next" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}