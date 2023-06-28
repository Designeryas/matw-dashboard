import PieChart from "components/charts/PieChart";
import Card from "components/card";
import services from "services";
import React, { useEffect, useState } from "react";
import { months } from "./MethodChart";
import Select from 'react-select';

const HostChart = () => {
  /* ----------------------------- Start variables ---------------------------- */
  const [totalHosts, setTotalHosts] = useState([]);
  const [hostsOfMonth, setHostsOfMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({ value: 5, label: 'June' });
  const colorsFill = ["#9400d3", "#0c187e", "#08abc9", "#3dc908", "#ff007d", "#ff9e00", "#c71f00", "#6a1100", "#6a0058", "#07f7b5", "#4a7800"];
  const pieChartOptions = {
    labels: ["Other", "matwcheckout.org", "matwproject.org", "matwproject.org.uk", "matwprojectca.org", "matwprojectfr.org", "matwprojectme.org", "matwprojectusa.org", "www.matwproject.org"],
    colors: ["#4D48EE", "#4D48EE", "#4D48EE", "#4D48EE", "#4D48EE", "#4D48EE", "#4D48EE"],
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
      // colors: ["#9400d3", "#0c187e", "#08abc9", "#3dc908", "#ff007d", "#ff9e00", "#c71f00"],
      colors: colorsFill,
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
  // const pieChartData = [34, 21, 11, 12, 25, 4, 3];
  const pieChartData = hostsOfMonth;
  // const pieChartData = [
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? Object.values(totalHosts[selectedMonth.value])[0] : 0,
  //   // (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value].Unknown : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwcheckout.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwproject.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwproject.org.uk'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwprojectca.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwprojectfr.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwprojectme.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://matwprojectusa.org'] : 0,
  //   (totalHosts.length && totalHosts[selectedMonth.value]) ? totalHosts[selectedMonth.value]['https://www.matwproject.org'] : 0,
  // ];
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */
  const getMonthlyHostReport = async () => {
    // setIsLoading(true);
    try {
      const response = await services.monthlyHostTypeReport();
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
      setTotalHosts(temp);
      let tempHostsOfMonth = [];
      for (const key in temp[selectedMonth.value]) {
        tempHostsOfMonth.push(temp[selectedMonth.value][key]);
      }
      setHostsOfMonth(tempHostsOfMonth)
      console.log("seted setTotalHosts=", temp)
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.error('error========', error);
    }
  };
  const handleSelectedMonth = (value, label) => {
    console.log("before change month", hostsOfMonth)
    let tempHostsOfMonth = [];
    for (const key in totalHosts[value]) {
      tempHostsOfMonth.push(totalHosts[value][key]);
    }
    setHostsOfMonth(tempHostsOfMonth)
    setSelectedMonth({ ...selectedMonth, value: value, label: label })
  }
  const handleCalculatePercentage = (index) => {
    let total = 0;
    for (const key in totalHosts[selectedMonth.value]) {
      total += totalHosts[selectedMonth.value][key];
    }
    if (totalHosts[selectedMonth.value] && Object.values(totalHosts[selectedMonth.value])[index]) {
      return `${((Object.values(totalHosts[selectedMonth.value])[index] / total) * 100).toFixed(2)}%`
    } else {
      return `0%`
    }
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    getMonthlyHostReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------------------------------------------------- */
  return (
    <Card extra="rounded-[20px] p-3 min-w-[500px]">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Hosts
          </h4>
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
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {totalHosts.length ?
          totalHosts[selectedMonth.value] ?
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
      <div className="grid grid-cols-12 gap-2 md:gap-3 rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {totalHosts.length && totalHosts[selectedMonth.value] && Object.keys(totalHosts[selectedMonth.value]).map((keyName, i) => (
          <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 flex items-center" key={i}>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center">
                <div className="hidden bg-[#9400d3] bg-[#0c187e] bg-[#08abc9] bg-[#3dc908] bg-[#ff007d] bg-[#ff9e00] bg-[#c71f00] bg-[#6a1100] bg-[#6a0058] bg-[#07f7b5] bg-[#4a7800]"></div>
                <div className={`h-2 w-2 rounded-full bg-[${colorsFill[i]}]`} />
                <p className="ml-1 text-sm font-normal text-gray-600">{keyName}</p>
              </div>
              <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
                {handleCalculatePercentage(i)}
              </p>
              <p className="mt-px text-sm text-navy-700  dark:text-white">
                {totalHosts[selectedMonth.value][keyName]}
              </p>
            </div>
            <div className="h-11 w-px bg-gray-300 dark:bg-white/10 ml-1" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HostChart;
