import { Chart9 } from "../d3-charts/chart9";
export const CChart9 = () => {
  const chartOptions = {
    colors: ["#ffb547", "#7783DB"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  const chartSeries = [
    {
      name: "New Customers",
      data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 42, 90, 140],
    },
    {
      name: "Up/Cross-Selling",
      data: [11, 32, 45, 32, 34, 52, 41, 80, 96, 140, 30, 100],
    },
  ];
  return (
    <div>
      <h2>Chart 2</h2>
      <Chart9 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
