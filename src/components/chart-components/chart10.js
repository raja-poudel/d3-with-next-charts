import { Chart10 } from "../d3-charts/chart10";

const data = {
  series: [
    {
      color: "#FFB547",
      data: 14859,
      label: "Strategy",
    },
    {
      color: "#7BC67E",
      data: 35690,
      label: "Outsourcing",
    },
    {
      color: "#7783DB",
      data: 45120,
      label: "Marketing",
    },
  ],
};

export const CChart10 = () => {
  const chartOptions = {
    colors: data.series.map((item) => item.color),
    labels: data.series.map((item) => item.label),
  };

  const chartSeries = data.series.map((item) => item.data);
  return (
    <div>
      <h2>Chart 10</h2>
      <Chart10 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
