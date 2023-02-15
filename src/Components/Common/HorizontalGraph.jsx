import { Fragment } from "react";
import getChartColorsArray from "./ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";

const HorizontalGraph = ({ dataColors, categories, data }) => {
  var chartAudienceColumnChartsColors = getChartColorsArray(dataColors);
  const series = [
    {
      data,
      name: "Sessions",
    },
  ];
  var options = {
    chart: {
      type: "bar",
      height: 309,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
      fontSize: "8px",
      offsetX: 0,
      offsetY: 0,
      markers: {
        width: 9,
        height: 9,
        radius: 4,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      show: false,
    },
    colors: chartAudienceColumnChartsColors,
    xaxis: {
      categories,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        strokeDashArray: 1,
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="436"
        className="apex-charts"
      />
    </Fragment>
  );
};

export default HorizontalGraph;
