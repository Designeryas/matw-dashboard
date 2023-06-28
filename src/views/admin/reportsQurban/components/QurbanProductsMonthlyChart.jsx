// import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import services from "services";
import Select from 'react-select';
// import DateInput from "components/input/dateInput";
// import Moment from 'moment';
import NewBarChart from "components/charts/NewBarChart";
import { months } from "views/admin/reports/components/MethodChart";

const QurbanProductsMonthlyChart = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [allProducts, setAllProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(Moment(new Date()).format('YYYY/MM/DD'));
  // const [productsCount, setProductsCount] = useState([]);
  // const [productsName, setProductsName] = useState([]);
  const colorsFill = ["#9400d3", "#0c187e", "#08abc9", "#3dc908", "#ff007d", "#ff9e00", "#c71f00", "#6a1100", "#6a0058", "#07f7b5", "#4a7800"];
  const barChartDataMonthlyTotal = [
    {
      name: "Monthly Qurban",
      data: totalAmount,
    },
  ];
  const barChartOptionsMonthlyTotal = {
    colors: colorsFill,
    chart: {
      type: 'bar',
      height: 600,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Count'
          }
        }
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      color: "black",

      labels: {
        show: true,
        style: {
          colors: "#7a7a7a",
          fontSize: "14px",
        },
      },
    },
    fill: {
      colors: colorsFill,
    },
    grid: {
      show: true,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
      textAnchor: 'start',
      style: {
        colors: ['#000']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + "Count:  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: false
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        columnWidth: "40px",
        distributed: true,
        borderRadius: 10,
        horizontal: false,
        dataLabels: {
          position: 'bottom',
          show: false
        },
      }
    },
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getProductsByName = async (name) => {
    try {
      const response = await services.getProductsByCategoryName(name);
      console.log('response get getProductsByCategoryName', response);
      // getDailyQurbanProductsCount();
      function compare(a, b) {
        if (a.name.trim() < b.name.trim()) {
            return -1;
        }
        if (a.name.trim() > b.name.trim()) {
            return 1;
        }
        return 0;
    }
    let temp = response.data.products.sort(compare);
    setSelectedProduct({value:temp[0].id, label:temp[0].name});
    getProductCount(temp[0].id);
    setAllProducts(temp)
    // setAllProducts(response.data.products);
    } catch (error) {
      console.error('error========', error);
    }
  };
  const getProductCount = async (id) => {
    setIsLoading(true)
    try {
      const response = await services.monthlyProductPurchaseReport({product_id: id});
      console.log("getProductCount", response);
      let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if(Object.keys(response.data.data).length) {
        for (const key in response.data.data) {
          months.map((item, index) => {
            if (item.label === `${key}`) {
              temp[index] = response.data.data[key][id];
            }
            return null;
          })
          // console.log(`${key}: ${response.data.data[key]}`);
        }
        setTotalAmount(temp);
      } else {
        setTotalAmount([]);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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
    getProductsByName('sheep');
    // getDailyQurbanProductsCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div className="min-w-[250px]">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Monthly Qurban Products
          </h4>
        </div>

        <div className="mb-6 flex w-full items-center justify-end">
          <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
            <div className="flex flex-col justify-start items-start w-full">
              <label className="text-sm text-stone-400" htmlFor="product">Product</label>
              <Select
                options={allProducts.map((item, index) => {
                  return { value: item.id, label: item.name };
                })}
                name="product"
                placeholder="Select product"
                value={selectedProduct}
                className='h-[42px]- [&>div]:min-h-[42px] [&>div]:border [&>div]:border-[#e9ecef] w-full'
                onChange={(e) => {
                  handleSelectProduct(e.value, e.label);
                }}
                isSearchable={true} />
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full pt-10 pb-0 ${totalAmount.length > 0 ? 'h-[520px]' : 'flex items-center justify-center h-[300px]'}`}>
        {!isLoading ?
          totalAmount.length ?
          <NewBarChart
          chartData={barChartDataMonthlyTotal}
          chartOptions={barChartOptionsMonthlyTotal}
        /> : <div>No Data</div>
          : <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[500px]-'>
            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        }

      </div>
    </Card>
  );
};

export default QurbanProductsMonthlyChart;
