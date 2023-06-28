import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// import { useDownloadExcel } from 'react-export-table-to-excel';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DateInput from "components/input/dateInput";
import SearchInput from "components/input/searchInput";
import services from "services";
import Card from "components/card";


const TrxsTable = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    columnsData,
    tableData,
    currentPage,
    lastPage,
    pageSize,
    isLoading,
    onSearchItems,
    onDownloadFile,
    onShowMultiProducts
  } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableRef = useRef(null);
  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: 'Transactions',
  //   sheet: 'Transactions'
  // })
  const paidTypes = [
    { lable: 'All', value: 'All' },
    { lable: 'Paid', value: 'Paid' },
    { lable: 'Unpaid', value: 'Unpaid' },
  ];
  const modeTypes = [
    { lable: 'All', value: 'All' },
    { lable: 'Payment', value: 'payment' },
    { lable: 'Subscription', value: 'subscription' },
  ];
  const hosts = [
    { lable: 'All', value: 'All' },
    { lable: 'matwproject.org', value: 'matwproject.org' },
    { lable: 'matwproject.org.uk', value: 'matwproject.org.uk' },
    { lable: 'matwprojectca.org', value: 'matwprojectca.org' },
    { lable: 'matwprojectfr.org', value: 'matwprojectfr.org' },
    { lable: 'matwprojectme.org', value: 'matwprojectme.org' },
    { lable: 'matwprojectmys.org', value: 'matwprojectmys.org' },
    { lable: 'matwprojectsgp.org', value: 'matwprojectsgp.org' },
    { lable: 'matwprojectusa.org', value: 'matwprojectusa.org' },
  ];
  const referrals = [
    { lable: 'All', value: 'All' },
    { lable: 'google.com', value: 'google.com' },
    { lable: 'matwproject.org.uk', value: 'matwproject.org.uk' },
    { lable: 'matwcheckout.org', value: 'matwcheckout.org' },
    { lable: 'matwprojectusa.org', value: 'matwprojectusa.org' },
    { lable: 'matwprojectca.org', value: 'matwprojectca.org' },
    { lable: 'call.matwcheckout.org', value: 'call.matwcheckout.org' },
    { lable: 'rec.matwcheckout.org', value: 'rec.matwcheckout.org' },
    { lable: 'rev.matwcheckout.org', value: 'rev.matwcheckout.org' },
    { lable: 'matwp.org', value: 'matwp.org' },
    { lable: 'events.matwcheckout.org', value: 'events.matwcheckout.org' },
    { lable: 'matwproject.org', value: 'matwproject.org' },
    { lable: 'matwprojectfr.org', value: 'matwprojectfr.org' },
    { lable: 'matwprojectme.org', value: 'matwprojectme.org' },
    { lable: 'matwprojectmys.org', value: 'matwprojectmys.org' },
    { lable: 'matwprojectsgp.org', value: 'matwprojectsgp.org' },
  ];
  var tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const [searchItems, setSearchItems] = useState({
    page: 1,
    per_page: 10,
    status: 'Paid',
    mode: '',
    referal: '',
    host: '',
    email: '',
    phone: '',
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
    // from: '2023-03-15',
    // to: tomorrowDate.toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeRow, setActiveRow] = useState(-1);
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
  const handleReset = () => {
    let temp = {
      page: 1,
      per_page: 10,
      status: 'Paid',
      referal: '',
      host: '',
      mode: '',
      email: '',
      phone: '',
      from: new Date().toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    }
    setLoadingReset(true);
    setSearchItems(temp);
    onSearchItems(temp)
  }
  const handleSearch = (name, value) => {
    console.log("handle search", name, value);
    if (name === 'page') {
      setSearchItems({ ...searchItems, [name]: value })
    } else if(name === 'per_page') {
      let temp = searchItems;
      temp.per_page = value;
      temp.page = 1;
      setLoadingReset(true);
      onSearchItems(temp);
      setSearchItems({ ...searchItems, [name]: value, page: 1 })
    } else {
      setSearchItems({ ...searchItems, [name]: value, page: 1 })
    }
  }
  const handleFirstCharCapital = (text) => {
    if (text !== '') {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }
  const handleAddStarToPhone = (text) => {
    return text.substr(0, 6) + text.substr(6, text.length - 2).replace(/[0-9]/g, '*') + text.substr(text.length - 2, text.length)
  }
  const handleAddStarToEmail = (text) => {
    var a = text.split("@");
    var b = a[0];
    var newstr = "";
    for (var i in b) {
      if (i > 2 && i < b.length - 1) newstr += "*";
      else newstr += b[i];
    }
    return newstr + "@" + a[1];
  }
  const handleSendReceipt = (text, indexRow) => {
    setActiveRow(indexRow)
    setLoading(true);
    if (text !== '') {
      let tempObj = { gateway: '', currency: '', id: '', session_id: '' }
      let tempUrl = text.split('?')[1].split('&');
      tempUrl.map((item, index) => {
        return tempObj[item.split("=")[0]] = item.split("=")[1]
      })
      sendReceipt(tempObj)
      // console.log("tempobj", tempObj);
    }
  }
  const sendReceipt = async (receipt) => {
    let tempReceipt = {
      order_id: receipt.id ? receipt.id : receipt.session_id,
      currency: receipt.currency ? receipt.currency : 'AUD',
      gateway: receipt.gateway ? receipt.gateway : '',
    };
    try {
      const response = await services.sendReceipt(tempReceipt)
      // console.log('response get getSubCategoryByName', response);
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      setLoading(false)
      console.error('error========', error);
    }
  };
  // const handleDecimals = (number) => {
  //  return new Intl.NumberFormat('en-IN', {
  //     maximumFractionDigits: 2
  //   }).format(Number(number))
  // }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    console.log(searchItems);
    onSearchItems(searchItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItems.page])
  useEffect(() => {
    if (isDownloading) {
      //onDownload();
      onDownloadFile();
      setIsDownloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloading])
  useEffect(() => {
    !isLoading && setLoadingReset(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
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
                  setIsDownloading(true)
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
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <DateInput title='From' placeholder='From' onSearch={(e) => { handleSearch('from', e); }} value={searchItems.from} className='w-full' />
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <DateInput title='To' placeholder='To' onSearch={(e) => { handleSearch('to', e); }} value={searchItems.to} className='w-full' min={searchItems.from} />
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <SearchInput title='Email' placeholder='Email' onSearch={(e) => { handleSearch('email', e); }} value={searchItems.email} className='w-full' />
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <div className="flex flex-col items-start w-full">
                <label className="text-sm text-stone-400" htmlFor="host">Website</label>
                <select
                  name="host"
                  value={searchItems.host}
                  className='cursor-pointer focus:outline-none border border-stone-300 rounded px-2 text-sm h-[42px] w-full'
                  onChange={e => {
                    handleSearch('host', e.target.value === 'All' ? '' : e.target.value);
                  }}
                >
                  {hosts.map(type => (
                    <option key={type.lable} value={type.value} className='cursor-pointer'>
                      {type.lable}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <div className="flex flex-col items-start w-full">
                <label className="text-sm text-stone-400" htmlFor="referral">Referral</label>
                <select
                  name="referral"
                  value={searchItems.referal}
                  className='cursor-pointer focus:outline-none border border-stone-300 rounded px-2 text-sm h-[42px] w-full'
                  onChange={e => {
                    handleSearch('referal', e.target.value === 'All' ? '' : e.target.value);
                  }}
                >
                  {referrals.map(type => (
                    <option key={type.lable} value={type.value} className='cursor-pointer'>
                      {type.lable}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <div className="flex flex-col justify-start items-start w-full">
                <label className="text-sm text-stone-400" htmlFor="status">Status</label>
                <select
                  name="status"
                  value={searchItems.status}
                  className='cursor-pointer focus:outline-none border border-stone-300 rounded px-2 text-sm h-[42px] w-full'
                  onChange={e => {
                    handleSearch('status', e.target.value === 'All' ? '' : e.target.value);
                  }}
                >
                  {paidTypes.map(type => (
                    <option key={type.lable} value={type.value} className='cursor-pointer'>
                      {type.lable}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <div className="flex flex-col justify-start items-start w-full">
                <label className="text-sm text-stone-400" htmlFor="status">Mode</label>
                <select
                  name="status"
                  value={searchItems.mode}
                  className='cursor-pointer focus:outline-none border border-stone-300 rounded px-2 text-sm h-[42px] w-full'
                  onChange={e => {
                    handleSearch('mode', e.target.value === 'All' ? '' : e.target.value);
                  }}
                >
                  {modeTypes.map(type => (
                    <option key={type.lable} value={type.value} className='cursor-pointer'>
                      {type.lable}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="basis-full md:basis-1/4 xl:basis-1/6 pl-1 flex items-end mt-2 3xl:mt-2">
              <button disabled={isLoading} onClick={() => onSearchItems(searchItems)} className='flex justify-center items-center text-white text-md font-medium mr-1 rounded-md h-[42px] px-2 hover:bg-[#db346e] bg-[#49acea] transition-all duration-200'>
                {isLoading && !loadingReset ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ) : <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1 cursor-pointer">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg><span>Search</span>
                </>}
              </button>
              <button onClick={() => handleReset()} className='flex justify-center items-center text-white text-md font-medium rounded-md h-[42px] px-2 bg-[#db346e] hover:bg-[#49acea] transition-all duration-200'>
                {isLoading && loadingReset ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ) : <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer transition-all duration-300 hover:rotate-90">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg><span>Reset</span>
                </>}
              </button>
            </div>
          </div>
        </header>
        <div className="mt-8 overflow-hidden">
          {isLoading ? <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[500px]'>
            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
            : data.length ? <div className="w-full overflow-x-scroll">
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
                  // console.log("row==", row);
                  // let currency = row.cells[2] && row.cells[2].value.currency;
                  let currency = row.original && row.original.currency;
                  // let isSubscription = row.cells[6] && row.cells[6].value === 'subscription' ? true : false;
                  let receipt_url = row.original && row.original.receipt_url;
                  let isPaid = row.original && row.original.payment_status === 'unpaid' ? false : true;
                  let isStript = row.original && row.original.payment_method_title === 'Stripe' ? true : false;
                  let orderId = row.original && row.original.order_id;
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
                              {cell.value ? isDownloading ? (cell.value) : handleAddStarToEmail(cell.value) : <span className="text-xs font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Phone") {
                          data = (
                            <p className="text-xs text-left font-medium text-navy-700 pr-1 overflow-hidden">
                              {cell.value ? isDownloading ? cell.value : handleAddStarToPhone(cell.value) : <span className="text-xs font-normal text-stone-400">NULL</span>}
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
                              {cell.value ? cell.value.toFixed(2) : <span className="text-base font-normal text-stone-400">NULL</span>}
                            </p>
                          );
                        } else if (cell.column.Header === "Amount") {
                          // console.log("amount",cell)
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
                                <button
                                  className="bg-[#49acea] h-9 px-3 flex justify-center items-center mr-2 text-xs text-white rounded min-w-[100px] transition-all duration-200 hover:bg-[#db346e]"
                                  onClick={() => handleSendReceipt(receipt_url, rowIndex)}>
                                  {activeRow === rowIndex && loading ? (<>Sending...<svg className="animate-spin ml-4 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  </>)
                                    : 'Send Receipt'}
                                </button>
                                <button
                                  className="bg-[#49acea] h-9 px-3 flex justify-center items-center text-xs text-white rounded min-w-[80px] transition-all duration-200 hover:bg-[#db346e]"
                                  onClick={() => onShowMultiProducts(orderId,isStript,currency)}>
                                  Products
                                </button>
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
          </div> : <div className="w-full flex items-center justify-center">No Data</div>
          }
          <div className="pagination flex flex-col lg:flex-row items-start my-6 border-t border-stone-200 pt-4">
            {/* <div className="flex flex-col items-start mb-4 lg:mb-0 basis-full xl:basis-1/4">
            <p><span className="text-sm text-stone-400 mr-1 inline-block text-left min-w-[130px]">Total Transactions:</span>{totalTrxs.count}</p>
            {totalTrxs.amount.map((item, index) => {
              return <p key={`total${index}`}><span className="text-sm text-stone-400 mr-1 min-w-[130px] inline-block text-left">Total {item.currency} Amount:</span>{handleCurrency(item.order_total_amount)}</p>
            })}
          </div> */}
            <div className="flex items-center justify-center flex-col w-full md:flex-row basis-full xl:basis-2/4-">
              <div className="flex">
                <button onClick={() => handleSearch('page', 1)} disabled={currentPage <= 1} className={`${currentPage <= 1 ? 'text-slate-400 ' : 'text-stone-600 hover:bg-[#49acea] hover:text-white hover:border-[#49acea]'} border border-stone-200 rounded-md w-8 h-8 flex justify-center items-center transition-all duration-200 mr-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clipRule="evenodd" />
                  </svg>
                </button>{' '}
                <button onClick={() => handleSearch('page', currentPage - 1)} disabled={currentPage < 2} className={`${currentPage < 2 ? 'text-slate-400' : 'text-stone-600 hover:bg-[#49acea] hover:text-white hover:border-[#49acea]'} border border-stone-200 rounded-md w-8 h-8 flex justify-center items-center transition-all duration-200 mr-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>{' '}
                <button onClick={() => handleSearch('page', currentPage + 1)} disabled={currentPage >= lastPage} className={`${currentPage >= lastPage ? 'text-slate-400' : 'text-stone-600 hover:bg-[#49acea] hover:text-white hover:border-[#49acea]'} border border-stone-200 rounded-md w-8 h-8 flex justify-center items-center transition-all duration-200 mr-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>{' '}
                <button onClick={() => handleSearch('page', lastPage)} disabled={currentPage >= lastPage} className={`${currentPage >= lastPage ? 'text-slate-400' : 'text-stone-600 hover:bg-[#49acea] hover:text-white hover:border-[#49acea]'} border border-stone-200 rounded-md w-8 h-8 flex justify-center items-center transition-all duration-200 mr-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <span className="ml-4">
                Page{' '}
                <strong>
                  {currentPage} of {lastPage}
                </strong>{' '}
              </span>
              <span className="ml-2">
                | Go to page:{' '}
                <input
                  type="number"
                  defaultValue={currentPage}
                  className='w-[100px] border border-stone-200 rounded-md px-1 focus:outline-none'
                  onChange={e => {
                    const _page = e.target.value ? Number(e.target.value) : 0;
                    handleSearch('page', _page)
                    // onChangePage(page)
                  }}
                />
              </span>{' '}
              <select
                value={pageSize}
                className='cursor-pointer focus:outline-none'
                onChange={e => {
                  handleSearch('per_page', Number(e.target.value))
                  // onChangePageSize(Number(e.target.value))
                }}
              >
                {[10, 100, 500, 1000].map(pageSize => (
                  <option key={pageSize} value={pageSize} className='cursor-pointer'>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrxsTable;
