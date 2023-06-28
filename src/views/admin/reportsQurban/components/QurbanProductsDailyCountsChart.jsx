// import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import services from "services";
// import Select from 'react-select';
import DateInput from "components/input/dateInput";
// import Moment from 'moment';
import NewBarChart from "components/charts/NewBarChart";
import moment from "moment";

const QurbanProductsDailyCountsChart = () => {
  /* ----------------------------- Start variables ---------------------------- */
  // const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(Moment(new Date()).format('YYYY/MM/DD'));
  const [productsCount, setProductsCount] = useState([]);
  const [productsName, setProductsName] = useState([]);
  const colorsFill = ["#0c187e","#08abc9","#3dc908","#ff007d","#ff9e00","#c71f00","#6a1100","#6a0058","#07f7b5","#4a7800","#314909","#0f7979","#d6c318","#b9629c","#101561","#8ca7b9","#4ac1dd","#ff7800","#784a00","#212acc","#f1cc44","#f15500","#ccf100","#6e5600"];
  const barChartDataMonthlyTotal = [
    {
      name: "Daily Qurban",
      data: productsCount,
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
      // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      categories: productsName,
      show: false,
      labels: {
        show: false,
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
  const [searchItems, setSearchItems] = useState({
    // product: '',
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  // const getProductCount = async (id) => {
  //   try {
  //     const response = await services.monthlyProductPurchaseReport({product_id: id});
  //     console.log("getProductCount", response)
  //   } catch (error) {
  //     console.error('error========', error);
  //   }
  // }
  const getDailyQurbanProductsCount = async (searchs) => {
    setIsLoading(true);
    let tempSearch = {
      from: searchs ? searchs.from : new Date().toISOString().split('T')[0],
      to: searchs ? searchs.to : new Date().toISOString().split('T')[0]
    };
    if (moment(tempSearch.from).diff(moment(tempSearch.to), 'days') > 0) { tempSearch.to = tempSearch.from }
    try {
      const response = await services.dailyQurbanProductsPurchaseReport(tempSearch);
      console.log("dailyQurbanProductsPurchaseReport", response);
      let temp = [];
      for (const key in response.data.data) {
        temp.push({
          value: response.data.data[key],
          label: key
        })
      }
      // console.log("setAllProducts", temp);
      let dataArray = [];
      temp.map((item,index) => {
        for (const key in item.value) {
          if(dataArray.length) {
            let isThere = false;
            dataArray.map((dataItem,dataIndex) => {
              if(dataItem.label === key) {
                isThere = true;
                dataArray[dataIndex].value += item.value[key]
              }
            });
            !isThere && dataArray.push({value: item.value[key],label: key})
          } else {
            dataArray.push({
              value: item.value[key],
              label: key
            })
          }
        }
        return null
      })
      console.log("dataArray", dataArray);
      let compare = ( a, b ) => {
        if ( a.value < b.value ){
          return -1;
        }
        if ( a.value > b.value ){
          return 1;
        }
        return 0;
      }
      let sortable2 = dataArray.sort(compare).reverse();
      console.log("sortable2", sortable2);
      let tempProductsCount = [];
      let tempProductsName = [];
      // let sortable = Object.entries(temp[temp.length - 1].value)
      //   .sort(([, a], [, b]) => a - b)
      //   .reverse()
      //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      // for (const key in temp[temp.length - 1].value) {
      //   console.log("in for=",temp[temp.length - 1])
      //   console.log("in for",key,temp[temp.length - 1].value[key])
      //   tempProductsCount.push(temp[temp.length - 1].value[key])
      //   tempProductsName.push(key)
      // }
      // for (const key in sortable) {
      //   // console.log("in for=", temp[temp.length - 1])
      //   // console.log("in for", key, sortable[key])
      //   tempProductsCount.push(sortable[key])
      //   tempProductsName.push(key)
      // }
      sortable2.map(item => {
        tempProductsCount.push(item.value)
        tempProductsName.push(item.label);
        return null
      })
      setProductsCount(tempProductsCount);
      setProductsName(tempProductsName);
      // console.log("compare", temp[0].label, selectedDate)
      setIsLoading(false);
      // setAllProducts(temp);
    } catch (error) {
      setIsLoading(false);
      console.error('error========', error);
    }
  }
  // const handleSelectProduct = (id, label) => {
  //   setSelectedProduct({ ...selectedProduct, value: id, label: label })
  //   // getProductCount(id)
  //   console.log("selected product", id, label)
  // }
  const handleSearch = (name, value) => {
    // let newdate = Moment(value, 'YYYY-MM-DD').format('YYYY/MM/DD')
    // let tempProductsCount = [];
    // let tempProductsName = [];
    // allProducts.map((item, index) => {
    //   if (item.label === newdate) {
    //     console.log("handle search", value, newdate, item);
    //     let sortable = Object.entries(item.value)
    //       .sort(([, a], [, b]) => a - b)
    //       .reverse()
    //       .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    //     for (const key in sortable) {
    //       tempProductsCount.push(item.value[key])
    //       tempProductsName.push(key)
    //     }
    //     // for (const key in item.value) {
    //     //   tempProductCount.push(item.value[key]);
    //     //   tempProductsName.push(key)
    //     // }
    //     setProductsName(tempProductsName);
    //     setProductsCount(tempProductsCount);
    //   }
    //   return null;
    // })
    // if (!tempProductsCount.length > 0) {
    //   setProductsName([]);
    //   setProductsCount([]);
    // }
    // setSelectedDate(newdate)
    let temp = searchItems;
    temp[name] = value;
    // getDailyQurbanProductsCount(temp);
    setSearchItems(temp)
  }
  const handleReset = () => {
    let temp = {
      from: new Date().toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    }
    setLoadingReset(true);
    setSearchItems(temp);
    getDailyQurbanProductsCount(temp)
    // getProductInfo(temp)
  }
  const handleCalculatePercentage = (index) => {
    let total = 0;
    productsCount.map(item => {
      return total += item
    })
    if (productsCount && productsCount[index]) {
      return `${((productsCount[index] / total) * 100).toFixed(2)}%`
    } else {
      return `0%`
    }
  }

  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    // getProductsByName('sheep');
    getDailyQurbanProductsCount(searchItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div className="min-w-[250px]">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Daily Qurban Products
          </h4>
        </div>

        <div className="mb-6 flex w-full items-center justify-end">
          {/* <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
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
          </div> */}
          <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
            <DateInput title='From' placeholder='Select Day' onSearch={(e) => { handleSearch('from', e); }} value={searchItems.from} className='w-full' />
          </div>
          <div className="basis-full sm:basis-1/2 md:basis-1/4 3xl:basis-1/6 mt-2 3xl:mt-0 px-1">
            <DateInput title='To' placeholder='To' onSearch={(e) => { handleSearch('to', e); }} value={searchItems.to} className='w-full' min={searchItems.from} />
          </div>
          <div className="basis-full md:basis-1/4 xl:basis-1/6 pl-1 flex items-end h-full justify-end mt-2 xl:mt-0">
            <button disabled={isLoading} onClick={() => getDailyQurbanProductsCount(searchItems)} className='flex justify-center items-center text-white text-md font-medium mr-1 rounded-md h-[42px] px-2 hover:bg-[#db346e] bg-[#49acea] transition-all duration-200'>
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
      </div>

      {/* <div className={`mb-auto flex- h-[520px] w-full- items-center- justify-center-`}> */}
      <div className={`w-full pt-10 pb-0 ${productsCount.length > 0 ? 'h-[600px]' : 'flex items-center justify-center h-[300px]'}`}>
        {/* <PieChart options={pieChartOptions} series={pieChartData} /> */}
        {!isLoading ?
          productsCount.length ?
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
      <div className="grid grid-cols-12 gap-2 md:gap-3 rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {productsCount.length && productsCount.map((item, index) => (
          <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 flex items-center" key={index}>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center">
                <div className="hidden bg-[#9400d3] bg-[#0c187e] bg-[#08abc9] bg-[#3dc908] bg-[#ff007d] bg-[#ff9e00] bg-[#c71f00] bg-[#6a1100] bg-[#6a0058] bg-[#07f7b5] bg-[#4a7800] bg-[#314909] bg-[#0f7979] bg-[#d6c318] bg-[#b9629c] bg-[#101561] bg-[#8ca7b9] bg-[#4ac1dd] bg-[#ff7800] bg-[#784a00] bg-[#212acc] bg-[#f1cc44]  bg-[#f15500] bg-[#ccf100] bg-[#6e5600]"></div>
                <div className={`h-2 w-2 rounded-full bg-[${colorsFill[index]}]`} />
                <p className="ml-1 text-sm font-normal text-gray-600">{productsName[index]}</p>
              </div>
              <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
                {handleCalculatePercentage(index)}
              </p>
              <p className="mt-px text-sm text-navy-700  dark:text-white">
                {item}
              </p>
            </div>
            <div className="h-11 w-px bg-gray-300 dark:bg-white/10 ml-1" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QurbanProductsDailyCountsChart;
