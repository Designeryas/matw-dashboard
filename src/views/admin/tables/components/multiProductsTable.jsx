import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useDownloadExcel } from 'react-export-table-to-excel';
import Card from "components/card";
import ShowCurrencies from "utilities/showCurrencies";


const MultiProductsTable = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    columnsData,
    tableData,
    pageSize,
    isLoading,
    currency,
    onBackToHome
  } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Transactions',
    sheet: 'Transactions'
  })
  const [isDownloading, setIsDownloading] = useState(false);
  let total = 0;
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    state,
  } = tableInstance;
  initialState.pageSize = pageSize;
  state.pageSize = pageSize;
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    if (isDownloading) {
      onDownload();
      setIsDownloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloading])
  useEffect(() => {
    // !isLoading && setLoadingReset(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-2 md:px-4 2xl:px-6"}>
      <div className="bg-white rounded-md px-6- sm:overflow-auto">
        <header className="relative flex flex-col justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 w-full text-left py-4 border-b border-stone-200 flex flex-col justify-between md:flex-row">
            <h1>Dashboard</h1>
            <div className="flex mt-2 md:mt-0">
            <button className='flex justify-center items-center mr-2 text-white text-sm font-medium rounded-md h-10 px-4 bg-[#db346e] hover:bg-[#49acea] transition-all duration-200'
                onClick={() => onBackToHome()}>
                Back to Home
              </button>
            </div>
          </div>
        </header>
        <div className="mt-8 overflow-hidden pb-6">
          {isLoading ? <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[500px]'>
            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
            : <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
              <table
                {...getTableProps()}
                className="w-full min-w-max- 2xl:table-fixed"
                variant="simple"
                color="gray-500"
                mb="24px"
                ref={tableRef}
              >
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="border-b border-gray-200 pr-16 pb-[10px] text-start uppercase"
                          key={index}
                        >
                          <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs whitespace-nowrap">
                            {column.render("Header")}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, rowIndex) => {
                    // console.log("row==", row);
                    prepareRow(row);
                    total = row.original && total + row.original.order_subtotal_amount;
                    return (
                      <tr {...row.getRowProps()} key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-stone-100' : ''}`}>
                        {row.cells.map((cell, index) => {
                          let data = "";
                          if (cell.column.Header === "Product") {
                            data = (
                              <p className="text-xs text-left font-medium text-navy-700 px-1">
                                {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                              </p>
                            );
                          } else if (cell.column.Header === "On Behalf Of") {
                            data = (
                              <p className="text-sm text-left font-medium text-navy-700 pr-1 lowercase- overflow-hidden">
                                {cell.value ? cell.value : <span className="text-base font-normal text-stone-400">NULL</span>}
                              </p>
                            );
                          } else if (cell.column.Header === "Amount") {
                            data = (
                              <p className="text-sm text-left font-medium text-navy-700 pr-1 lowercase- overflow-hidden">
                                {cell.value ? Number(cell.value).toFixed(2) : <span className="text-base font-normal text-stone-400">NULL</span>}
                              </p>
                            );
                          } else if (cell.column.Header === "Quantity") {
                            data = (
                              <p className="text-sm text-left font-medium text-navy-700">
                                {cell.value ? cell.value : <span className="text-md font-normal text-stone-400">1</span>}
                              </p>
                            );
                          } else if (cell.column.Header === "Sub Total") {
                            data = (
                              <p className="text-sm text-left font-medium text-navy-700">
                                {cell.value ? Number(cell.value).toFixed(2) : <span className="text-md font-normal text-stone-400">1</span>}
                              </p>
                            );
                          } else if (cell.column.Header === "Tax") {
                            data = (
                              <div className="flex items-center max-w-[100px]">
                                <p className="text-xs font-medium text-navy-700 text-left overflow-hidden">
                                {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                                </p>
                              </div>
                            );
                          }
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={index}
                              className="pt-[14px] pb-[16px] sm:text-[14px] text-stone-500 font-normal max-w-max- w-[150px]- max-w-[120px]-"
                            >
                              {data}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          }
              <div className="border-t border-gray-200 pt-2 flex justify-end">
                <div className="px-4 py-2 rounded-md bg-gray-100- border-gray-900 text-gray-700 flex justify-center items-center">
                Total: <h2 className="font-bold ml-2 text-gray-900 text-xl">{ShowCurrencies(currency, total.toFixed(2))}</h2>
                </div>
              </div>
        </div>
      </div>
    </Card>
  );
};

export default MultiProductsTable;
