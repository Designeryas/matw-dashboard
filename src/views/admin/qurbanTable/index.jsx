import { useEffect, useState } from "react";
import Admin from "layouts/admin";
import moment from "moment";
import services from "services";
import QurbanProductsTable from "./components/QurbanProductsTable";

const QurbanList = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [multiProducts, setMultiProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedItems, setSearchedItems] = useState();
  const columnsDataProducts = [
    {
      Header: "Name",
      accessor: "first_name_billing",
    },
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
  ];
  // let tempMultiProducts = [];
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getQurbanTransactions = async (searchs) => {
    setIsLoading(true);
    let tempSearch = {
      page: searchs ? searchs.page : 1,
      per_page: searchs ? searchs.per_page : 10,
      from: searchs ? searchs.from : new Date().toISOString().split('T')[0],
      to: searchs ? searchs.to : new Date().toISOString().split('T')[0],
    };
    if (moment(tempSearch.from).diff(moment(tempSearch.to), 'days') > 0) { tempSearch.to = tempSearch.from }
    try {
      const response = await services.getMultiQurbanProducts(tempSearch);
      console.log('response get getMultiQurbanProducts', response);
      setMultiProducts(response.data.products);
      setLastPage(Math.ceil(response.data.total / response.data.per_page));
      setPageSize(searchs.per_page ? searchs.per_page : 10);
      setPage(response.data.page);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    console.log("searchedItems=", searchedItems);
    // searchedItems && setCurrentPage(1);
    // searchedItems && getQurbanTransactions(searchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems]);
  useEffect(() => {
    // getQurbanTransactions(searchedItems);
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
          <QurbanProductsTable
            columnsData={columnsDataProducts}
            tableData={multiProducts}
            currentPage={searchedItems ? searchedItems.page : 1}
            pageSize={pageSize}
            isLoading={isLoading}
            lastPage={lastPage}
            onSearchItems={(e) => {setSearchedItems(e);getQurbanTransactions(e)}}
          />
        </div>
      </div>
    </Admin>
  );
};

export default QurbanList;
