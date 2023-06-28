import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import services from "services";
import Select from 'react-select';

const ProductsChart = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const []
  const pieChartOptions = {
    labels: ["All Products", `${selectedProduct ? selectedProduct.label : ''}`],
    colors: ["#00008b", "#6AD2FF"],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#00008b", "#6AD2FF"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
    },
  };
  const pieChartData = [95, 5];
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  // const getAllProducts = async () => {
  //   try {
  //     const response = await services.getAllProducts();
  //     function compare(a, b) {
  //       if (a.name.trim() < b.name.trim()) {
  //         return -1;
  //       }
  //       if (a.name.trim() > b.name.trim()) {
  //         return 1;
  //       }
  //       return 0;
  //     }
  //     let temp = response.data.sort(compare);
  //     setSelectedProduct({value: temp[0].creator, label: temp[0].name});
  //     // getProductCount(122)
  //     setAllProducts(temp);
  //   } catch (error) {
  //     console.error('error========', error);
  //   }
  // }
    const getProductsByName = async (name) => {
    try {
      const response = await services.getProductsByCategoryName(name);
      console.log('response get getProductsByCategoryName', response);
      setSelectedProduct({value: response.data.products[0].id, label: response.data.products[0].name});
      getProductCount(response.data.products[0].id);
      setAllProducts(response.data.products);
    } catch (error) {
      console.error('error========', error);
    }
  };
  const getProductCount = async (id) => {
    try {
      const response = await services.monthlyProductPurchaseReport({product_id: id});
      console.log("getProductCount", response)
    } catch (error) {
      console.error('error========', error);
    }
  }
  const handleSelectProduct = (id, label) => {
    setSelectedProduct({ ...selectedProduct, value: id, label: label })
    getProductCount(id)
    console.log("selected product", id, label)
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    // getAllProducts();
    getProductsByName("sheep")
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Sold Qurban Products
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select> */}
          <Select
            options={allProducts.map((item, index) => {
              return { value: item.id, label: item.name };
            })}
            placeholder="Select product"
            value={selectedProduct}
            className='min-w-[250px]'
            onChange={(e) => {
              handleSelectProduct(e.value, e.label);
            }}
            isSearchable={true} />
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">{selectedProduct ? selectedProduct.label : ''}</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            5%
          </p>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />


        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#00008b]" />
            <p className="ml-1 text-sm font-normal text-gray-600">All Products</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            95%
          </p>
        </div>

      </div>
    </Card>
  );
};

export default ProductsChart;
