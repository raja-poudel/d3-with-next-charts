import { Chart1 } from "../d3-charts/chart1";
export const CChart1 = () => {
  const chartOptions = {
    colors: ["#13affe", "#fbab49"],
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  };

  const chartSeries = [
    {
      data: [30, 40, 25, 50, 49, 21, 70, 51],
      name: "This week",
    },
    {
      data: [23, 12, 54, 61, 32, 56, 81, 19],
      name: "Last week",
    },
  ];
  return (
    <div>
      <h2>Chart 1</h2>
      <Chart1 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
