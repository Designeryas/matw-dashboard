import Card from "components/card";
import { useMemo, useState } from "react";
// import DateInput from "components/input/dateInput";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import Select from 'react-select';
import { months } from "./MethodChart";

const TransactionsAUDTable = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const [selectedMonth, setSelectedMonth] = useState({ value: 6, label: 'July' });
  const {
    columnsData,
    tableData,
    // currentPage,
    // lastPage,
    isLoading,
    pageSize,
    onSearchItems,
  } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
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
  // const [loadingReset, setLoadingReset] = useState(false);
  // const [searchItems, setSearchItems] = useState({
  //   page: 1,
  //   per_page: 10,
  //   from: new Date().toISOString().split('T')[0],
  //   to: new Date().toISOString().split('T')[0]
  // })
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  // const handleSearch = (name, value) => {
  //   // let temp = searchItems;
  //   // temp[name] = value;
  //   // setSearchItems(temp)
  //   console.log("handle search", name, value);
  //   if (name === 'page') {
  //     setSearchItems({ ...searchItems, [name]: value })
  //   } else if(name === 'per_page') {
  //     let temp = searchItems;
  //     temp.per_page = value;
  //     temp.page = 1;
  //     // setLoadingReset(true);
  //     onSearchItems(temp);
  //     setSearchItems({ ...searchItems, [name]: value, page: 1 })
  //   } else {
  //     setSearchItems({ ...searchItems, [name]: value, page: 1 })
  //   }
  // }
  // const handleReset = () => {
  //   let temp = {
  //     // page: 1,
  //     // per_page: 10,
  //     from: new Date().toISOString().split('T')[0],
  //     to: new Date().toISOString().split('T')[0]
  //   }
  //   setLoadingReset(true);
  //   setSearchItems(temp);
  //   onSearchItems(temp)
  // }
  const handleSelectedMonth = (value, label) => {
    onSearchItems({value: value, label: label})
    setSelectedMonth({ ...selectedMonth, value: value, label: label })
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  // useEffect(() => {
  //   console.log(searchItems);
  //   onSearchItems(searchItems)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchItems.page])
  // useEffect(() => {
  //   !isLoading && setLoadingReset(isLoading)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-2 md:px-4 2xl:px-6 p-3"}>
      <div className="flex flex-row justify-between px-3 pt-2">
        <div className="min-w-[300px]">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Transactions By Host Name in AUD
          </h4>
        </div>
        <div className="mb-6 flex w-full items-center justify-end">
          <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
            <Select
              options={months.map((item, index) => {
                return { value: item.value, label: item.label };
              })}
              placeholder="Select Month"
              value={selectedMonth}
              className='min-w-[250px]'
              onChange={(e) => {
                handleSelectedMonth(e.value, e.label);
              }}
              isSearchable={false} />
          </div>
        </div>
      </div>
      <div className="mt-8 overflow-hidden">
        {isLoading ? <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[500px]'>
          <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
          : data.length ? <div className="w-full">
            <table
              {...getTableProps()}
              className="w-full min-w-max- 2xl:table-fixed min-h-[300px]"
              variant="simple"
              color="gray-500"
              mb="24px"
            >
              <colgroup>
                <col span="1" className="w-[33%]" />
                <col span="1" className="w-[20%]" />
                <col span="1" className="w-[33%]" />
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
                  // console.log("row==", row);
                  prepareRow(row);
                  // total = row.original && total + row.original.order_subtotal_amount;
                  return (
                    <tr {...row.getRowProps()} key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : ''} transition-all duration-200 hover:bg-gray-100`}>
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "Host Name") {
                          data = (
                            <p className="text-sm text-left font-medium text-navy-700 px-1">
                              {cell.value ? cell.value : <span className="text-base font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Transactions") {
                          data = (
                            <p className="text-sm text-left font-medium text-navy-700 pr-1 lowercase- overflow-hidden">
                              {cell.value ? cell.value : <span className="text-base font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Value in AUD") {
                          data = (
                            <p className="text-sm text-left font-medium text-navy-700 pr-1 lowercase- overflow-hidden">
                              {cell.value ? Number(cell.value).toFixed(2) : <span className="text-base font-normal text-stone-400">NULL</span>}
                            </p>
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
          </div> : <div className="w-full flex items-center justify-center">No Data</div>
        }
      </div>

    </Card>
  );
};

export default TransactionsAUDTable;
