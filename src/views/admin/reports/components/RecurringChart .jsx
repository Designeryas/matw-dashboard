import Card from "components/card";
import { useEffect, useState } from "react";
import NewBarChart from "components/charts/NewBarChart";
import services from "services";
import { months } from "./MethodChart";
import Select from 'react-select';

const RecurringChart = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const [recurringData, setRecurringData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({ value: 5, label: 'June' });
  // const barChartData1 = [
  //   {
  //     name: "Recurring",
  //     data: recurringData,
  //   },
  // ];
  const barChartData = [
    {
      name: 'Count',
      data: [
        (recurringData.length && recurringData[selectedMonth.value]) ? recurringData[selectedMonth.value]["one-off"] : 0,
        (recurringData.length && recurringData[selectedMonth.value]) ? recurringData[selectedMonth.value].day : 0,
        (recurringData.length && recurringData[selectedMonth.value]) ? recurringData[selectedMonth.value].week : 0,
        (recurringData.length && recurringData[selectedMonth.value]) ? recurringData[selectedMonth.value].month : 0,
      ]
    }
  ];
  const barChartOptions = {
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
      categories: ["One-off", "Daily", "Weekly", "Monthly"],
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
          return `${val.toLocaleString()}`
          // return `${(val.toLocaleString()).toLocaleString()} AUD`
        },
      },
    },
    // colors: ["#4D48EE", "#E91E63", "#9C27B0", "#9C27B0"],
    // fill: {
    //   colors: ['#F44336', '#E91E63', '#9C27B0', '#E91E63']
    // },
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
      enabled: true,
      textAnchor: 'center',
      offsetY: -30,
      offsetX: -12,
      position: 'top',
      style: {
        colors: ['#333']
    },
      formatter: function (val, opt) {
        return val
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
        distributed: true,
        dataLabels: {
          position: 'top',
          offsetX: 15,
        },
        // formatter: function (val, opt) {
        //   return `val=${val}`
        // },
      },
      dataLabels: {
        enabled: true,
        style: {
            colors: ['#333']
        },
        offsetX: 30
      },
    },
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getMonthlySubscriptionTypeReport = async () => {
    // setIsLoading(true);
    try {
      const response = await services.monthlySubscriptionTypeReport();
      console.log("response monthly", response);
      let temp = [];
      for (const key in response.data.data) {
        months.map((item, index) => {
          if (item.label === `${key}`) {
            temp[index] = response.data.data[key];
          }
          return null;
        })
      }
      setRecurringData(temp);
      console.log("seted setRecurringData=", temp)
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.error('error========', error);
    }
  };
  const handleSelectedMonth = (value, label) => {
    setSelectedMonth({ ...selectedMonth, value: value, label: label })
  }
  // const handleCalculatePercentage = (currency) => {
  //   let total = 0;
  //   for (const key in totalCurrencies[selectedMonth.value]) {
  //     total += totalCurrencies[selectedMonth.value][key];
  //   }
  //   if(totalCurrencies[selectedMonth.value] && totalCurrencies[selectedMonth.value][currency]) {
  //     // return `%${Math.round((totalCurrencies[selectedMonth.value][currency] / total) * 100)}`
  //     return `%${((totalCurrencies[selectedMonth.value][currency] / total) * 100).toFixed(2)}`
  //   } else {
  //     return `%0`
  //   }
  // }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    getMonthlySubscriptionTypeReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="pb-7 p-[20px] min-w-[500px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Recurring
          </p>
          {/* <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {grandTotal}{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              Visitors
            </span>
          </p> */}
        </div>
        <div className="mb-6 flex items-center justify-center">
          <Select
            options={months.map((item, index) => {
              return { value: item.value, label: item.label };
            })}
            placeholder="Select Month"
            value={selectedMonth}
            className='min-w-[250px]'
            onChange={(e) => {
              handleSelectedMonth(e.value, e.label);
            }}
            isSearchable={false} />
        </div>
        {/* <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div> */}
      </div>

      <div className="h-[300px] w-full pt-10 pb-0 flex- items-center- justify-center-">
        {recurringData.length ?
          (recurringData[selectedMonth.value]) ?
            <NewBarChart
              chartData={barChartData}
              chartOptions={barChartOptions}
            /> : <div className="w-full h-full flex justify-center items-center">No Data</div>
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

export default RecurringChart;
