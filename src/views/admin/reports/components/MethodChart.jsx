import PieChart from "components/charts/PieChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import Select from 'react-select';
import services from "services";

export const months = [
  {value: 0, label: 'January'},
  {value: 1, label: 'February'},
  {value: 2, label: 'March'},
  {value: 3, label: 'April'},
  {value: 4, label: 'May'},
  {value: 5, label: 'June'},
  {value: 6, label: 'July'},
  {value: 7, label: 'August'},
  {value: 8, label: 'September'},
  {value: 9, label: 'October'},
  {value: 10, label: 'November'},
  {value: 11, label: 'December'},
]

const MethodChart = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const [totalPaymentMethod, setTotalPaymentMethod] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({value: 5, label: 'June'});
  const pieChartOptions = {
    labels: ["Stripe", "PayPal"],
    colors: ["#4318FF", "#6AD2FF"],
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
      colors: ["#db346e", "#6AD2FF"],
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

  const pieChartData = [totalPaymentMethod.length ? totalPaymentMethod[selectedMonth.value].Stripe : 0, totalPaymentMethod.length ? totalPaymentMethod[selectedMonth.value].Paypal : 0];
  // const pieChartData = [750,250];

  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  // const handleSelectedMonth = (month) => {
  //   console.log("selected month",totalPaymentMethod[month]);
  //   setSelectedMonth(month)
  // }
  const handleSelectedMonth = (value, label) => {
    setSelectedMonth({ ...selectedMonth, value: value, label: label })
    console.log("selected month", totalPaymentMethod[value])
  }
  const handleCalculatePercentage = (value_one,value_two) => {
    let total = value_one + value_two;
    if(value_one && value_two) {
      // return `%${Math.round((value_one / total) * 100)}`
      // return `%${Math.round((value_one / total) * 100)}`
      return `${((value_one / total) * 100).toFixed(2)}%`
    } else {
      return `0%`
    }
  }
  const getMonthlyPaymentMethodReport = async () => {
    // setIsLoading(true);
    try {
      const response = await services.monthlyPaymentMethodReport();
      console.log("response monthly",response);
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
      setTotalPaymentMethod(temp);
      console.log("seted setTotalPaymentMethod",temp)
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.error('error========', error);
    }
  };
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start Hooks ------------------------------- */
  useEffect(()=>{
    // console.log("totalAmount",props.totalMethod)
    // setTotalPaymentMethod(props.totalMethod);
    getMonthlyPaymentMethodReport();
  },[])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="rounded-[20px] p-3 min-w-[500px]">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Payment Methods
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white" onChange={(e) => handleSelectedMonth(e.target.value)}>
            {months.map((item,index) => {
              return <option key={`monthes${index}`} value={item.value}>{item.label}</option>
            })}
          </select> */}
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
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {totalPaymentMethod.length ?
          (totalPaymentMethod[selectedMonth.value].Stripe && totalPaymentMethod[selectedMonth.value].Paypal) ?
          <PieChart options={pieChartOptions} series={pieChartData} /> : <div>No Data</div>
        : <div role="status" className='w-full col-span-12 flex justify-center items-center min-h-[500px]-'>
        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-[#49acea]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
        }

      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#db346e]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Stripe</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
          {totalPaymentMethod.length && totalPaymentMethod[selectedMonth.value] ? handleCalculatePercentage(totalPaymentMethod[selectedMonth.value].Stripe,totalPaymentMethod[selectedMonth.value].Paypal) : 0}
          </p>
          <p className="mt-px text-sm text-navy-700  dark:text-white">
            {totalPaymentMethod.length && totalPaymentMethod[selectedMonth.value] ? totalPaymentMethod[selectedMonth.value].Stripe.toFixed() : 0}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">PayPal</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {totalPaymentMethod.length && totalPaymentMethod[selectedMonth.value] ? handleCalculatePercentage(totalPaymentMethod[selectedMonth.value].Paypal,totalPaymentMethod[selectedMonth.value].Stripe) : 0}
          </p>
          <p className="mt-px text-sm text-navy-700  dark:text-white">
          {totalPaymentMethod.length && totalPaymentMethod[selectedMonth.value] ? totalPaymentMethod[selectedMonth.value].Paypal.toFixed() : 0}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MethodChart;
