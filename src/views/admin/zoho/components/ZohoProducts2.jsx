import Card from "components/card";
import { useEffect, useMemo, useRef, useState } from "react";
import DateInput from "components/input/dateInput";
import { useDownloadExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";

const ZohoProducts2 = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    columnsData,
    tableData,
    isLoading,
    onSearchItems,
  } = props;
  const data = useMemo(() => tableData, [tableData]);
  const [loadingReset, setLoadingReset] = useState(false);
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Zoho',
    sheet: 'Zoho'
  })
  const [searchItems, setSearchItems] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const handleSearch = (name, value) => {
    let temp = searchItems;
    temp[name] = value;
    setSearchItems(temp)
  }
  const handleReset = () => {
    let temp = {
      from: new Date().toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    }
    setLoadingReset(true);
    setSearchItems(temp);
    onSearchItems(temp);
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    !isLoading && setLoadingReset(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    console.log(searchItems);
    onSearchItems(searchItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItems])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-2 md:px-4 2xl:px-6"}>
      <div className="bg-white rounded-md px-6- sm:overflow-auto">
        <header className="relative flex flex-col justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 w-full text-left py-4 border-b border-stone-200 flex flex-col justify-between md:flex-row">
            <h1>Zoho Products</h1>
          </div>
          <div className="flex flex-wrap py-2">
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <DateInput title='From' placeholder='From' onSearch={(e) => { handleSearch('from', e); }} value={searchItems.from} className='w-full' />
            </div>
            <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
              <DateInput title='To' placeholder='To' onSearch={(e) => { handleSearch('to', e); }} value={searchItems.to} className='w-full' min={searchItems.from} />
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
      </div>
      <div className="mt-8 overflow-hidden">
          {isLoading ? <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[300px]'>
            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
            : data.length ? <div className="w-full flex justify-center overflow-x-scroll-">
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
                  onDownload()
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
                Ready For Export Excel
              </button>
            <table
              className="w-full min-w-max- 2xl:table-fixed hidden"
              color="gray-500"
              mb="24px"
              ref={tableRef}
            >
              <thead>
                <tr>
                  {columnsData.map((column, index) => (
                    <th
                      className="border-b border-gray-200 pr-16 pb-[10px] text-start uppercase"
                      key={index}
                    >
                      <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs whitespace-nowrap">
                        {column.Header}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => {
                  rowIndex === 0 && console.log("row========",row)
                  return (
                    <tr key={rowIndex}>
                      {columnsData.map((col,index) => {
                        return <td>{row[col.accessor]}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div> : <div className="w-full flex items-center justify-center">No Data</div>
          }
          <div className="pagination flex flex-col lg:flex-row items-start my-6 border-t border-stone-200 pt-4">

          </div>
        </div>
    </Card>
  );
};

export default ZohoProducts2;
