import MethodChart from "views/admin/reports/components/MethodChart";
import MonthlyTrx from "views/admin/reports/components/MonthlyTrx";
import { useEffect, useState } from "react";
import Admin from "layouts/admin";
import CurrencyChart from "./components/CurrencyChart";
// import ProductsChart from "./components/ProductsChart";
import RecurringChart from "./components/RecurringChart ";
// import QurbanProductsChart from "./components/QurbanProductsChart";
import HostChart from "./components/HostChart";
import moment from "moment";
import services from "services";
import TransactionsAUDTable from "./components/TransactionsAUDTable";
import { months } from "./components/MethodChart";
// import QurbanProductsMonthlyChart from "./components/QurbanProductsMonthlyChart";
// import TotalSpent from "./components/TotalSpent";
// import WeeklyRevenue from "./components/WeeklyRevenue";

const Reports = () => {
  /* ----------------------------- Start variables ---------------------------- */
  // const [trxs, setTrxs] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalAmount, setTotalAmount] = useState([0, 0, 4497811.07, 17239066.25, 1805644.19, 0, 0, 0, 0, 0, 0, 0]);
  // const [totalTransactions, setTotalTransactions] = useState([0, 0, 6651, 61001, 11803, 0, 0, 0, 0, 0, 0, 0]);
  const [totalTransactionsHostsAud, setTotalTransactionsHostsAud] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsHostsOfMonth, setTransactionsHostsOfMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({ value: 6, label: 'July' });
  const columnsDataProducts = [
    {
      Header: "Host Name",
      accessor: "host_name",
    },
    {
      Header: "Transactions",
      accessor: "count",
    },
    {
      Header: "Value in AUD",
      accessor: "total",
    },
  ];
  var tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getHostTransactions = async (searchs) => {
    setIsLoading(true);
    try {
      const response = await services.monthlyHostTransactionsReport();
      console.log('response get monthlyHostTransactionsReport', response);
      let temp = [];
      for (const key in response.data.data) {
        months.map((item, index) => {
          if (item.label === `${key}`) {
            temp[index] = response.data.data[key];
          }
          return null;
        })
      }
      setTotalTransactionsHostsAud(temp);
      let tempHostsOfMonth = [];
      for (const key in temp[selectedMonth.value]) {
        let temp2 = temp[selectedMonth.value][key];
        temp2['host_name'] = key;
        tempHostsOfMonth.push(temp2);
      }
      setTransactionsHostsOfMonth(tempHostsOfMonth)
      console.log("seted setTotalHosts==", temp,tempHostsOfMonth)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  };
  const handleChangeMonth = (month) => {
    let tempHostsOfMonth = [];
    for (const key in totalTransactionsHostsAud[month.value]) {
      let temp = totalTransactionsHostsAud[month.value][key];
      temp['host_name'] = key;
      tempHostsOfMonth.push(temp);
    }
    setSelectedMonth(month)
    setTransactionsHostsOfMonth(tempHostsOfMonth)
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    getHostTransactions()
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Admin>
    <div>
      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-2 gap-5 overflow-x-scroll lg:overflow-hidden">
        <div className="col-span-2 ">
          <MonthlyTrx />
        </div>
        <div className="col-span-2 lg:col-span-1 overflow-x-scroll lg:overflow-hidden">
          <MethodChart />
        </div>
        <div className="col-span-2 lg:col-span-1 overflow-x-scroll lg:overflow-hidden">
          <CurrencyChart />
        </div>
        {/* <div className="col-span-2 lg:col-span-1">
          <ProductsChart />
        </div> */}
        <div className="col-span-2 lg:col-span-1 overflow-x-scroll lg:overflow-hidden">
          <RecurringChart />
        </div>
        <div className="col-span-2">
          <HostChart />
        </div>
        <div className="col-span-2">
        <TransactionsAUDTable
            columnsData={columnsDataProducts}
            tableData={transactionsHostsOfMonth}
            currentPage={1}
            pageSize={10}
            isLoading={isLoading}
            // lastPage={lastPage}
            onSearchItems={(e) => {handleChangeMonth(e);}}
          />
        </div>
        {/* <div className="col-span-2">
          <QurbanProductsChart />
        </div>
        <div className="col-span-2">
          <QurbanProductsMonthlyChart />
        </div> */}
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
    </Admin>
  );
};

export default Reports;
