import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

const NewBarChart = (props) => {
  useEffect(() => {
    console.log("in new bar chart",props)
  },[props])

  return (
    <Chart
      options={props.chartOptions}
      series={props.chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
}

export default NewBarChart;
