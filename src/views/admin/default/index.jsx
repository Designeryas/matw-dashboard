// import MiniCalendar from "components/calendar/MiniCalendar";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import TotalSpent from "views/admin/default/components/TotalSpent";
// import PieChartCard from "views/admin/default/components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
// import { IoDocuments } from "react-icons/io5";
import {
  MdBarChart,
  // MdPeople
} from "react-icons/md";
import moment from "moment";
import {
  // columnsDataDonor,
  // columnsDataComplex
} from "./variables/columnsData";
import SubscriptionTable from "components/Stripe_paypal/SubscriptionTable";
import Subscription from "components/Stripe_paypal/Subscription";
import Widget from "components/widget/Widget";
// import DonorsTable from "views/admin/default/components/donorsTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";
// import tableDataDonor from "./variables/tableDataDonor.json";
import TrxsTable from "../tables/components/trxsTable";
import { useEffect, useState } from "react";
import services from "services";
import ShowCurrencies from "utilities/showCurrencies";
import MultiProductsTable from "../tables/components/multiProductsTable";
import Admin from "layouts/admin";
import AllTrxsTableForExport from "../tables/components/allTrxsTableForExport";
// import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [trxs, setTrxs] = useState([]);
  const [allTrxs, setAllTrxs] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState('AUD')
  const [multiProducts, setMultiProducts] = useState([]);
  const [multiProductsCurrency, setMultiProductsCurrency] = useState('AUD');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchedItems, setSearchedItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTrxs, setTotalTrxs] = useState({ count: 0, amount: [], totalAmountAud: 0 });
  const [lastPage, setLastPage] = useState();
  const [showMultiProducts, setShowMultiProducts] = useState(false);
  const columnsDataTrxs = [
    {
      Header: "Name",
      accessor: "first_name_billing",
    },
    {
      Header: "Email",
      accessor: "email_billing",
    },
    {
      Header: "Phone",
      accessor: "phone_billing",
    },
    // {
    //   Header: "Product",
    //   accessor: "item_name",
    // },
    {
      Header: "Amount",
      accessor: "order_total_amount",
    },
    // {
    //   Header: "Amount",
    //   accessor: "order_total_amount" || "AUD" || "USD" || "EUR" || "GBP" || "CAD" || "SGD" || "MYR",
    // },
    // {
    //   Header: "Amount",
    //   accessor: currentCurrency,
    //   // accessor: "AUD" || "USD" || "EUR" || "GBP" || "CAD" || "SGD" || "MYR",
    // },
    {
      Header: "Rate",
      accessor: "currency_rate",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Method",
      accessor: "payment_method_title",
    },
    {
      Header: "Mode",
      accessor: "mode",
    },
    {
      Header: "Status",
      accessor: "payment_status",
    },
    {
      Header: "Recurring",
      accessor: "recurring",
    },
    {
      Header: "Transaction Id",
      accessor: "payment_gateway_transaction_id",
    },
    {
      Header: "Website",
      accessor: "host",
    },
    {
      Header: "Referral",
      accessor: "referal",
    },
    {
      Header: "Date",
      accessor: "order_date",
    },
    {
      Header: "Actions",
      accessor: 'receipt_url',
    },

  ];
  const columnsDataProducts = [
    {
      Header: "Product",
      accessor: "item_name",
    },
    {
      Header: "On Behalf Of",
      accessor: "plaque_name",
    },
    {
      Header: "Amount",
      accessor: "item_cost",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Sub Total",
      accessor: "order_subtotal_amount",
    },
    // {
    //   Header: "Tax",
    //   accessor: "order_total_tax_amount",
    // }
  ];
  var tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  // const getFailedTrx = async (page, pageSize = 10) => {
  const getAllTransactions = async (searchs) => {
    setIsLoading(true);
    let tempSearch = {
      page: searchs ? searchs.page : 1,
      per_page: searchs ? searchs.per_page : 10,
      from: searchs ? searchs.from : new Date().toISOString().split('T')[0],
      to: searchs ? searchs.to : new Date().toISOString().split('T')[0]
      // from: searchs ? searchs.from : '2023-03-15',
      // to: searchs ? searchs.to : tomorrowDate.toISOString().split('T')[0]
    };
    if (searchs && searchs.status) { tempSearch.status = searchs.status; }
    if (searchs && searchs.referal) { tempSearch.referal = searchs.referal; }
    if (searchs && searchs.host) { tempSearch.host = searchs.host; }
    if (searchs && searchs.mode) { tempSearch.mode = searchs.mode; }
    if (searchs && searchs.email) { tempSearch.email = searchs.email; }
    if (searchs && searchs.phone) { tempSearch.phone = searchs.phone; }
    if (moment(tempSearch.from).diff(moment(tempSearch.to), 'days') > 0) { tempSearch.to = tempSearch.from }
    try {
      const response = await services.getAllTrxs(tempSearch);
      // console.log('response get getSubCategoryByName', response,response.data.transactions.total,tempSearch);
      setAllTrxs([])
      getAllTransactionsForExport(tempSearch,response.data.transactions.total);
      // let temp = response.data.transactions.data;
      // temp[0]["EUR"] = 123;
      // temp[0]["AUD"] = 700;
      // temp[0]["USD"] = null;
      // temp[1]["AUD"] = 565;
      // temp[1]["EUR"] = 4201;
      // setCurrentCurrency("EUR")
      // setTrxs(temp);
      setTrxs(response.data.transactions.data);
      setLastPage(response.data.transactions.last_page);
      setPageSize(response.data.transactions.per_page);
      let tempArray = [];
      for (const key in response.data.transactions_total) {
        // console.log("in for=", temp[temp.length - 1])
        // console.log("in for", key, sortable[key])
       tempArray.push({currency:key,order_total_amount:response.data.transactions_total[key]});
     }
     setTotalTrxs({
      ...totalTrxs,
      count: response.data.transactions.total,
      // amount: response.data.transactions_total.length ? response.data.transactions_total : [],
      amount: tempArray,
      totalAmountAud: response.data.sum_of_all_currencies_in_aud
    })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  };
  const getAllTransactionsForExport = async (searchs,_per_Page) => {
    let tempSearch = searchs;
    tempSearch.page = 1;
    tempSearch.per_page = _per_Page ? _per_Page : 10;
    // console.log("in method",tempSearch,)
    try {
      const response = await services.getAllTrxs(tempSearch);
      // console.log("response of getAllTransactionsForExport",response.data.transactions.data,response.data.transactions.data.length);
      // let temp = allTrxs;
      // if(response.data.transactions.data.length > 0) {
      //   console.log("temp=",temp);
      //   temp = response.data.transactions.data;
      //   console.log("temp=",temp);
      // }
      setAllTrxs(response.data.transactions.data);
    } catch (error) {
      console.error('error========', error);
    }
  };
  const getMultiProducts = async (id,gateway) => {
    setIsLoading(true);
    let temp = {
      // order_id: 68376,
      order_id: id,
      payment_gateway: gateway,
    };
    try {
      const response = await services.getMultiProducts(temp);
      console.log('response get getMultiProducts', response);
      setMultiProducts(response.data.products);
      console.log('response get getMultiProducts', response.data.products);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  };
  const handleShowMultiProducs = (id,method,currency) => {
    setShowMultiProducts(true);
    setMultiProductsCurrency(currency)
    let methodType = method ? 'stripe' : 'paypal';
    getMultiProducts(id,methodType)
    console.log("id",id, method,currency)
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    console.log("trxs useEffect", trxs.length)
    // trxs.length === 0 && getFailedTrx(searchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (currentPage !== page) {
      // getFailedTrx(currentPage,pageSize)
      // getFailedTrx(searchedItems)
      setPage(currentPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    console.log("searchedItems", searchedItems);
    searchedItems && setCurrentPage(1);
    searchedItems && getAllTransactions(searchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems]);
  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Admin>
    <div>
      <div className="items-start mb-4 mt-3 grid grid-cols-10 md:grid-cols-9 3xl:grid-cols-10 gap-2 md:gap-4">
        <div className="col-span-5 md:col-span-3 3xl:col-span-2">
          <Widget
            icon={<MdBarChart className="h-5 w-5 md:h-7 md:w-7" />}
            title={"Total Transactions:"}
            subtitle={totalTrxs.count.toLocaleString()}
          />
        </div>
        <div className="col-span-5 md:col-span-3 3xl:col-span-2">
          <Widget
            icon={<MdBarChart className="h-5 w-5 md:h-7 md:w-7" />}
            title={"Total Transactions in AUD:"}
            subtitle={ShowCurrencies('AUD', totalTrxs.totalAmountAud, false)}
            currency={'AUD'}
          />
        </div>
        {

        }
        {totalTrxs.amount.map((item, index) => {
          // console.log("totalTrxs.amount",item)
          return <div className="col-span-5 md:col-span-3 3xl:col-span-2" key={`total${index}`}>
            <Widget
              icon={<MdBarChart className="h-5 w-5 md:h-7 md:w-7" />}
              title={"Total Amount:"}
              subtitle={ShowCurrencies(item.currency, item.order_total_amount, false)}
              currency={item.currency}
            />
          </div>
        })}
      </div>
      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div className="col-span-2">
          {/* <DonorsTable
            columnsData={columnsDataDonor}
            tableData={tableDataDonor}
          /> */}
          {showMultiProducts
            ? <MultiProductsTable
              columnsData={columnsDataProducts}
              tableData={multiProducts}
              isLoading={isLoading}
              lastPage={lastPage}
              currentPage={searchedItems ? searchedItems.page : 1}
              pageSize={pageSize}
              totalTrxs={totalTrxs}
              currency={multiProductsCurrency}
              onBackToHome={() => setShowMultiProducts(false)}
            />
            : <TrxsTable
              columnsData={columnsDataTrxs}
              tableData={trxs}
              lastPage={lastPage}
              currentPage={searchedItems ? searchedItems.page : 1}
              pageSize={pageSize}
              isLoading={isLoading}
              totalTrxs={totalTrxs}
              onShowMultiProducts={(id,method,currency) => handleShowMultiProducs(id,method,currency)}
              onSearchItems={(e) => setSearchedItems(e)}
              onDownloadFile={() => setIsDownloading(true)}
            />
          }

        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="col-span-2 hidden">
          {/* {console.log("in html",allTrxs.length)} */}
          {allTrxs.length > 0 && <AllTrxsTableForExport
              columnsData={columnsDataTrxs}
              tableData={allTrxs.length > 0 ? allTrxs : []}
              // lastPage={lastPage}
              // currentPage={1}
              pageSize={totalTrxs.count}
              isDownloading={isDownloading}
              // totalTrxs={totalTrxs}
              onShowMultiProducts={(id,method,currency) => handleShowMultiProducs(id,method,currency)}
              handleDownloadFile={() => setIsDownloading(false)}
            />}
          {/* <DailyTraffic /> */}
          {/* <PieChartCard /> */}
        </div>

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
     <SubscriptionTable/>
     <Subscription/>
    </Admin>
   
  );
};

export default Dashboard;
