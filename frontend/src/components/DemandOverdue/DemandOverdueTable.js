import React, { useMemo, useEffect, useState } from "react";
import "./DemandOverdueTable.css";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useBlockLayout,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS } from "./columns";
// import MOCK_DATA from "../MOCK_DATA.json";
import {
  CaretDownFill,
  CaretUpFill,
  ChevronBarExpand,
  CalendarWeek,
} from "react-bootstrap-icons";
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";

const API = "http://localhost:5000";

const DemandOverdueTable = (props) => {
  const info = props.details.data;
  const data = useMemo(() => info, []);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);

  // const getRequests = async () => {
  //   try {
  //     const res = await fetch(`${API}/dashboard`);
  //     if (!res.ok) {
  //       throw Error(res.statusText);
  //     }
  //     const data = await res.json();
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getRequests().then((data) => setRequestInformation(data));
  //   console.log(data);
  //   console.log(requestinformation);
  // }, []);

  // const data = useMemo(() => requestinformation, []);
  // console.log(data);

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
    // selectedFlatRows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    },
    useBlockLayout,
    useSticky
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return (
    <>
      <div className="upper">
        <div>
          <CalendarWeek />
        </div>
        <p className="title">demand overdue</p>
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="beforeTable">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className="order">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <CaretDownFill />
                        ) : (
                          <CaretUpFill />
                        )
                      ) : (
                        <ChevronBarExpand />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} data-key={row.id}>
                  {row.cells.map((cell) => {
                    return (
                      <td data-key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
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
      </div>
      <div className="pagination">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <span className="pages">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className="btn-previous"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>
        <button
          className="btn-next"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
      </div>
      {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
    </>
  );
};

export default DemandOverdueTable;
