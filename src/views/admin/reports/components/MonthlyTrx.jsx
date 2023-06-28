import Card from "components/card";
import { useEffect, useState } from "react";
import NewBarChart from "components/charts/NewBarChart";
import services from "services";
import { months } from "./MethodChart";
const MonthlyTrx = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const [totalAmount, setTotalAmount] = useState([]);
  const barChartDataMonthlyTotal = [
    {
      name: "Monthly Total Transactions",
      data: totalAmount,
    },
  ];
  const barChartOptionsMonthlyTotal = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        formatter: function (val, opt) {
          return 'hi'
        },
      },
      theme: "dark",
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
        show: false,
      },
      axisTicks: {
        show: false,
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
        formatter: function (val, opt) {
          // return `${(val/1000).toLocaleString()} K`
          // return `${(val.toLocaleString()).toLocaleString()} AUD`
          if (val) {
            return `${(val / 1000000).toLocaleString()}M  AUD`
          } else {
            return val
          }
        },
      },
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
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     type: "vertical",
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     colorStops: [
    //       [
    //         {
    //           offset: 0,
    //           color: "#4318FF",
    //           opacity: 1,
    //         },
    //         {
    //           offset: 100,
    //           color: "#4318FF",
    //           opacity: 1,
    //         },
    //       ],
    //     ],
    //   },
    // },
    dataLabels: {
      enabled: false,
      textAnchor: 'start',
      formatter: function (val, opt) {
        return val
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
        distributed: true,
      },
    },
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getMonthlyTotalReport = async () => {
    // setIsLoading(true);
    try {
      const response = await services.monthlyTotalReport();
      console.log("response monthly", response);
      let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      // temp[0] = response.data.data.January;
      // temp[1] = response.data.data.February;
      // temp[2] = response.data.data.March;
      // temp[3] = response.data.data.April;
      // temp[4] = response.data.data.May;
      // temp[5] = response.data.data.June;
      // temp[6] = response.data.data.July;
      // temp[7] = response.data.data.August;
      // temp[8] = response.data.data.September;
      // temp[9] = response.data.data.October;
      // temp[10] = response.data.data.November;
      // temp[11] = response.data.data.December;
      for (const key in response.data.data) {
        months.map((item, index) => {
          if (item.label === `${key}`) {
            temp[index] = response.data.data[key];
          }
          return null;
        })
        // console.log(`${key}: ${response.data.data[key]}`);
      }
      setTotalAmount(temp);
      console.log("seted setTotalAmount", temp)
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.error('error========', error);
    }
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    getMonthlyTotalReport();
    // console.log("totalAmount",props.totalAmount)
    // setTotalAmounts(props.totalAmount);
    // let temp = 0;
    // let tempTotal = props.totalAmount.map(obj => {
    //   temp += obj;
    //   return temp;
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="pb-7 p-[20px] min-w-[500px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          {/* <p className="text-sm font-medium leading-4 text-gray-600">
            Monthly Transactions
          </p> */}
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Monthly Transactions
          </h4>
          {/* <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {grandTotal}{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              Visitors
            </span>
          </p> */}
        </div>
        <div className="mb-6 flex items-center justify-center">
          {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select> */}
        </div>
        {/* <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div> */}
      </div>

      {/* <div className={`h-[300px] w-full pt-10 pb-0 ${totalAmount.length > 1 ? '' : 'flex items-center'}`}> */}
      <div className={`w-full pt-10 pb-0 ${totalAmount.length > 0 ? 'h-[600px]' : 'flex items-center justify-center h-[300px]'}`}>
        {totalAmount.length > 1 ? <NewBarChart
          chartData={barChartDataMonthlyTotal}
          chartOptions={barChartOptionsMonthlyTotal}
        />
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

export default MonthlyTrx;
