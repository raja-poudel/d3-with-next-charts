import { Chart4 } from "../d3-charts/chart4-l-1";

const data = {
  series: [{ data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5] }],
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
};

export const CChart4 = () => {
  const chartOptions = {
    colors: ["#00ab57"],
    xaxis: {
      categories: data.categories,
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
      },
    },
  };

  const chartSeries = data.series;
  return (
    <div>
      <h2>Chart 4</h2>
      <Chart4 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
