import { Chart12 } from "../d3-charts/chart12";

const data = {
  series: [
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
  ],
  categories: [
    "Capital One",
    "Ally Bank",
    "ING",
    "Ridgewood",
    "BT Transilvania",
    "CEC",
    "CBC",
  ],
};

export const CChart12 = () => {
  const chartOptions = {
    colors: ["#3C4693", "#5664D2", "#7783DB"],
    xaxis: {
      categories: data.categories,
    },
  };

  const chartSeries = data.series;

  return (
    <div>
      <h2>Chart 12</h2>
      <Chart12 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
