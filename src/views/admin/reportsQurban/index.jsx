import { useEffect, useState } from "react";
import Admin from "layouts/admin";
import QurbanProductsDailyCountsChart from "./components/QurbanProductsDailyCountsChart";
import QurbanProductsMonthlyChart from "./components/QurbanProductsMonthlyChart";
// import QurbanProductsTable from "./components/QurbanProductsTable";
import moment from "moment";
// import services from "services";
import QurbanProductsDailyTotalChart from "./components/QurbanProductsDailyTotalChart";
import services from "services";
import QurbanProductsTable from "./components/QurbanProductsTable";

const QurbanReports = () => {
  /* ----------------------------- Start variables ---------------------------- */
  // var tomorrowDate = new Date();
  // tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  // const [trxs, setTrxs] = useState([]);
  const [multiProducts, setMultiProducts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [lastPage, setLastPage] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedItems, setSearchedItems] = useState();
  const columnsDataProducts = [
    {
      Header: "Name",
      accessor: "first_name_billing",
    },
    // {
    //   Header: "Email",
    //   accessor: "email_billing",
    // },
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
    {
      Header: "Status",
      accessor: "payment_status",
    },
    // {
    //   Header: "Tax",
    //   accessor: "order_total_tax_amount",
    // }
  ];
  // let tempMultiProducts = [];
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getQurbanTransactions = async (searchs) => {
    setIsLoading(true);
    let tempSearch = {
      // page: searchs ? searchs.page : 1,
      // per_page: searchs ? searchs.per_page : 10,
      from: searchs ? searchs.from : new Date().toISOString().split('T')[0],
      to: searchs ? searchs.to : new Date().toISOString().split('T')[0],
    };
    if (moment(tempSearch.from).diff(moment(tempSearch.to), 'days') > 0) { tempSearch.to = tempSearch.from }
    try {
      const response = await services.getMultiQurbanProducts(tempSearch);
      console.log('response get getMultiQurbanProducts', response);
      // setTrxs(response.data.transactions.data);
      // response.data.transactions.data.map((item,index) => {
      //   let isLast = index === (response.data.transactions.data.length - 1) ? true : false
      //   getMultiProducts(item.order_id,item.payment_method_title.toLowerCase(),isLast)
      // })
      setMultiProducts(response.data.products);
      // setLastPage(response.data.transactions.last_page);
      // setPageSize(response.data.transactions.per_page);
      setPageSize(response.data.products.length);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  };
  // const getMultiProducts = async (id,gateway, isLast) => {
  //   setIsLoading(true);
  //   let temp = {
  //     order_id: id,
  //     payment_gateway: gateway,
  //   };
  //   try {
  //     const response = await services.getMultiQurbanProducts(temp);
  //     console.log('response get getMultiProducts', response);
  //     let tempMulti = multiProducts;
  //     response.data.products.map(item => tempMultiProducts.push(item))
  //     // tempMultiProducts.push(response.data.products)
  //     // setMultiProducts(tempMultiProducts);
  //     isLast && setMultiProducts(tempMultiProducts)
  //     console.log('response get getMultiProducts', response.data.products);
  //     setIsLoading(false)
  //   } catch (error) {
  //     setIsLoading(false)
  //     console.error('error========', error);
  //   }
  // };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    console.log("searchedItems=", searchedItems);
    // searchedItems && setCurrentPage(1);
    // searchedItems && getQurbanTransactions(searchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems]);
  // useEffect(() => {
  //   if (currentPage !== page) {
  //     setPage(currentPage)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage]);
  // useEffect(() => {
  //   console.log("multiProducts=", multiProducts);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [multiProducts]);
  useEffect(() => {
    getQurbanTransactions(searchedItems);
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Admin>
      <div className="mt-5 grid grid-cols-2 gap-5 overflow-x-scroll lg:overflow-hidden">
        <div className="col-span-2">
          <QurbanProductsDailyCountsChart />
        </div>
        <div className="col-span-2">
          <QurbanProductsDailyTotalChart />
        </div>
        <div className="col-span-2">
          <QurbanProductsMonthlyChart />
        </div>
        {/* <div className="col-span-2">
          <QurbanProductsTable
            columnsData={columnsDataProducts}
            tableData={multiProducts}
            // lastPage={lastPage}
            currentPage={searchedItems ? searchedItems.page : 1}
            pageSize={pageSize}
            isLoading={isLoading}
            onSearchItems={(e) => {setSearchedItems(e);getQurbanTransactions(e)}}
          />
        </div> */}
      </div>
    </Admin>
  );
};

export default QurbanReports;
