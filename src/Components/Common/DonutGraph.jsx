import { Fragment } from "react";
import getChartColorsArray from "./ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";

const DonutGraph = ({ dataColors, categories, data }) => {
  var barchartCountriesColors = getChartColorsArray(dataColors);
  const series = data;
  var options = {
    labels: categories,
    chart: {
      height: 333,
      type: "donut",
    },
    legend: {
      position: "bottom",
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: barchartCountriesColors,
  };
  //   var options = {
  //     chart: {
  //       type: "bar",
  //       height: 436,
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 4,
  //         horizontal: true,
  //         distributed: true,
  //         dataLabels: {
  //           position: "top",
  //         },
  //       },
  //     },
  //     colors: barchartCountriesColors,
  //     dataLabels: {
  //       enabled: true,
  //       offsetX: 32,
  //       style: {
  //         fontSize: "12px",
  //         fontWeight: 400,
  //         colors: ["#adb5bd"],
  //       },
  //     },

  //     legend: {
  //       show: false,
  //     },
  //     grid: {
  //       show: false,
  //     },
  //     xaxis: {
  //       categories,
  //     },
  //   };
  return (
    <Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="436"
        className="apex-charts"
      />
    </Fragment>
  );
};

export default DonutGraph;
