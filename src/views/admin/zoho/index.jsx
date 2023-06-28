import { useEffect, useState } from "react";
import Admin from "layouts/admin";
import moment from "moment";
import services from "services";
import ZohoProducts2 from "./components/ZohoProducts2";

const ZohoReports = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [allTrxs, setAllTrxs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedItems, setSearchedItems] = useState();
  var tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const columnsDataTrxs = [
    {
      Header: "Address Billing",
      accessor: "Address Billing",
    },
    {
      Header: "Address Shipping",
      accessor: "Address Shipping",
    },
    {
      Header: "Cart Discount Amount",
      accessor: "Cart Discount Amount",
    },
    {
      Header: "City Billing",
      accessor: "City Billing",
    },
    {
      Header: "City Shipping",
      accessor: "City Shipping",
    },
    {
      Header: "Company Billing",
      accessor: "Company Billing",
    },
    {
      Header: "Country Code Billing",
      accessor: "Country Code Billing",
    },
    {
      Header: "Country Code Shipping",
      accessor: "Country Code Shipping",
    },
    {
      Header: "Currency",
      accessor: "Currency",
    },
    {
      Header: "Customer Note",
      accessor: "Customer Note",
    },
    {
      Header: "Discount Amount",
      accessor: "Discount Amount",
    },
    {
      Header: "Discount Tax Amount",
      accessor: "Discount Tax Amount",
    },
    {
      Header: "Email Billing",
      accessor: "Email Billing",
    },
    {
      Header: "First Name Billing",
      accessor: "First Name Billing",
    },
    {
      Header: "First Name Shipping",
      accessor: "First Name Shipping",
    },
    {
      Header: "Host",
      accessor: "Host",
    },
    {
      Header: "Item #",
      accessor: "Item #",
    },
    {
      Header: "Item Cost",
      accessor: "Item Cost",
    },
    {
      Header: "Item Name",
      accessor: "Item Name",
    },
    {
      Header: "Last Name Billing",
      accessor: "Last Name Billing",
    },
    {
      Header: "Last Name Shipping",
      accessor: "Last Name Shipping",
    },
    {
      Header: "Mode",
      accessor: "Mode",
    },
    {
      Header: "Order Date",
      accessor: "Order Date",
    },
    {
      Header: "Order Id",
      accessor: "Order Id",
    },
    {
      Header: "Order Refund Amount",
      accessor: "Order Refund Amount",
    },
    {
      Header: "Order Shipping Amount",
      accessor: "Order Shipping Amount",
    },
    {
      Header: "Order Status",
      accessor: "Order Status",
    },
    {
      Header: "Order Total Amount",
      accessor: "Order Total Amount",
    },
    {
      Header: "Order Total Tax Amount",
      accessor: "Order Total Tax Amount",
    },
    {
      Header: "Payment Method Title",
      accessor: "Payment Method Title",
    },
    {
      Header: "Phone Billing",
      accessor: "Phone Billing",
    },
    {
      Header: "Plaque Name",
      accessor: "Plaque Name",
    },
    {
      Header: "Postcode Billing",
      accessor: "Postcode Billing",
    },
    {
      Header: "Postcode Shipping",
      accessor: "Postcode Shipping",
    },
    {
      Header: "Quantity",
      accessor: "Quantity",
    },
    {
      Header: "Receipt Url",
      accessor: "Receipt Url",
    },
    {
      Header: "Recurring",
      accessor: "Recurring",
    },
    {
      Header: "Referal",
      accessor: "Referal",
    },
    {
      Header: "Row Subtotal Amount",
      accessor: "Row Subtotal Amount",
    },
    {
      Header: "Row Total Amount",
      accessor: "Row Total Amount",
    },
    {
      Header: "SKU",
      accessor: "SKU",
    },
    {
      Header: "Shipping Method Title",
      accessor: "Shipping Method Title",
    },
    {
      Header: "Source",
      accessor: "Source",
    },
    {
      Header: "State Code Billing",
      accessor: "State Code Billing",
    },
    {
      Header: "State Code Shipping",
      accessor: "State Code Shipping",
    },
    {
      Header: "Transaction Id",
      accessor: "Transaction Id",
    },

  ];
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getZohoProducts = async (searchs) => {
    setIsLoading(true)
    let tempSearch = {
      from: searchs ? searchs.from : new Date().toISOString().split('T')[0],
      to: searchs ? searchs.to : new Date().toISOString().split('T')[0]
    };
    if (moment(tempSearch.from).diff(moment(tempSearch.to), 'days') > 0) { tempSearch.to = tempSearch.from }
    try {
      const response = await services.zohoReport(tempSearch);
      console.log("zohoReport", response);
      setAllTrxs(response.data.transactions)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('error========', error);
    }
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    console.log("searchedItems for zoho products", searchedItems);
    // searchedItems && getZohoProducts(searchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems]);
  /* -------------------------------------------------------------------------- */
  return (
    <Admin>
      <div className="mt-5 grid grid-cols-2 gap-5 overflow-x-scroll lg:overflow-hidden">
        <div className="col-span-2">
          <ZohoProducts2
              columnsData={columnsDataTrxs}
              tableData={allTrxs}
              isLoading={isLoading}
              pageSize={allTrxs.length ? allTrxs.length : 10}
              onSearchItems={(e) => {setSearchedItems(e);console.log("setSearchedItems(e)",e);getZohoProducts(e)}}
            />
        </div>
      </div>
    </Admin>
  );
};

export default ZohoReports;
