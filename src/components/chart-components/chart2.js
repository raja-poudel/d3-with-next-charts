import { Chart2 } from "../d3-charts/chart2-l-2";
export const CChart2 = () => {
  const chartOptions = {
    colors: ["#1f87e6", "#ff5c7c"],
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
  };

  const chartSeries = [
    {
      data: [
        3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764, 2385, 5912, 8323,
      ],
      name: "Page Views",
    },
    {
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      name: "Session Duration",
    },
  ];
  return (
    <div>
      <h2>Chart 2</h2>
      <Chart2 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
