import React, { useMemo, useRef, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useDownloadExcel } from 'react-export-table-to-excel';
import Swal from "sweetalert2";
import Card from "components/card";


const AllTrxsTableForExport = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    columnsData,
    tableData,
    pageSize,
    isDownloading,
    handleDownloadFile,
  } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Transactions',
    sheet: 'Transactions'
  })
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
  const handleRecurring = (value) => {
    switch (value) {
      case 'day':
        return 'Daily';
      case 'month':
        return 'Monthly';
      case 'week':
        return 'Weekly';
      case 'one-off':
        return 'Single';
      default:
        return '';
    }
  }

  const handleFirstCharCapital = (text) => {
    if (text !== '') {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }

  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    if (isDownloading) {
      onDownload();
      handleDownloadFile();
      // onDownloadFile();
      // setIsDownloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloading])
  useEffect(() => {
    console.log("props", props)
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
              <button onClick={async () => {
                const { value: password } = await Swal.fire({
                  title: "Enter your password",
                  input: 'password',
                  inputLabel: 'Password',
                  inputPlaceholder: 'Enter your password',
                  inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                  }
                })
                if (password === '786365') {
                  // setIsDownloading(true)
                  // onDownload()
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'You entered wrong password!',
                  })
                }
              }}
                className='flex justify-center items-center text-white text-sm font-medium rounded-md h-10 px-4 bg-[#db346e] hover:bg-[#49acea] transition-all duration-200'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Export Excel
              </button>
            </div>
          </div>
          <div className="flex flex-wrap py-2">
          </div>
        </header>
        <div className="mt-8 overflow-hidden">
          <div className="w-full overflow-x-scroll">
            <table
              {...getTableProps()}
              className="w-full min-w-[2000px] 2xl:table-fixed"
              variant="simple"
              color="gray-500"
              mb="24px"
              ref={tableRef}
            >
              <colgroup>
                <col span="1" className="w-[9%]" />
                <col span="1" className="w-[11%]" />
                <col span="1" className="w-[8%]" />
                <col span="1" className="w-[5%]" />
                <col span="1" className="w-[5%]" />
                <col span="1" className="w-[6%]" />
                <col span="1" className="w-[6%]" />
                <col span="1" className="w-[6%]" />
                <col span="1" className="w-[5%]" />
                <col span="1" className="w-[7%]" />
                <col span="1" className="w-[15%]" />
                <col span="1" className="w-[12%]" />
                <col span="1" className="w-[12%]" />
                <col span="1" className="w-[9%]" />
                <col span="1" className="w-[7%]" />
              </colgroup>
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
                  let receipt_url = row.original && row.original.receipt_url;
                  let isPaid = row.original && row.original.payment_status === 'unpaid' ? false : true;
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-stone-100' : ''}`}>
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "Name") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 px-1">
                              {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Email") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 pr-1 lowercase overflow-hidden">
                              {/* {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>} */}
                              {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Phone") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 pr-1 overflow-hidden">
                              {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Product") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 pr-1 2xl:px-1">
                              {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                              {/* {cell.value[0].stripe_price_point.product.name ? cell.value[0].stripe_price_point.product.name : <span className="text-xs font-normal text-stone-400">NULL</span>} */}
                            </p>
                          );
                        } else if (cell.column.Header === "Rate") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 pr-1 lowercase overflow-hidden">
                              {cell.value ? Number(cell.value).toFixed(2) : <span className="text-base font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Amount") {
                          data = (
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-medium text-navy-700">
                                {/* {ShowCurrencies(currency, cell.value)} */}
                                {cell.value ? Number(cell.value).toFixed(2) : <span className="text-base font-normal text-stone-400">NULL</span>}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Currency") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 uppercase max-w-[68px]">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Method") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700">
                              {handleFirstCharCapital(cell.value)}
                            </p>
                          );
                        } else if (cell.column.Header === "Mode") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700">
                              {handleFirstCharCapital(cell.value)}
                            </p>
                          );
                        } else if (cell.column.Header === "Status") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700">
                              {handleFirstCharCapital(cell.value)}
                            </p>
                          );
                        } else if (cell.column.Header === "Recurring") {
                          data = (
                            <div className="flex items-center max-w-[100px]">
                              <p className="text-xs font-medium text-navy-700 text-left overflow-hidden">
                                {/* {isSubscription && handleRecurring(cell.value)} */}
                                {handleRecurring(cell.value)}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Transaction Id") {
                          data = (
                            <div className="flex items-center">
                              <p className="text-xs font-medium text-navy-700 max-w-[500px] text-left overflow-hidden mr-2">
                                {cell.value ? cell.value : <span className="text-xs font-normal text-stone-400">NULL</span>}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Website") {
                          data = (
                            <div className="flex items-center">
                              <p className="text-xs font-medium text-navy-700 max-w-[300px] text-left overflow-hidden mr-2">
                                {cell.value ? <a href={cell.value} rel="noreferrer" target='_blank' className='transition-all duration-150 text-stone-500 hover:text-[#49acea] text-[12px]'>{cell.value}</a> : <span className="text-xs font-normal text-stone-400">NULL</span>}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Referral") {
                          data = (
                            <div className="flex items-center">
                              <p className="text-xs font-medium text-navy-700 max-w-[300px] text-left overflow-hidden mr-2">
                                {cell.value ? <a href={cell.value} rel="noreferrer" target='_blank' className='transition-all duration-150 text-stone-500 hover:text-[#49acea] text-[12px]'>{cell.value}</a> : <span className="text-xs font-normal text-stone-400">NULL</span>}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Date") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700">
                              {/* {moment(cell.value, 'YYYY-MM-DD').format('MM-DD-YYYY')} */}
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Actions") {
                          data = (
                            <div className="flex">
                              {isPaid && <>
                                <a href={receipt_url} target='_blank' rel="noreferrer" className="bg-[#49acea] h-9 px-3 text-xs flex justify-center items-center mr-2 text-white rounded min-w-[100px] transition-all duration-200 hover:bg-[#db346e]">View Receipt</a>
                              </>}
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
          <div className="pagination flex flex-col lg:flex-row items-start my-6 border-t border-stone-200 pt-4">

          </div>
        </div>
      </div>
    </Card>
  );
};

export default AllTrxsTableForExport;
