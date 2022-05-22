import { Chart6 } from "../d3-charts/chart6";

const data = {
  series: [
    { data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
    { data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
  ],
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

export const CChart6 = () => {
  const chartOptions = {
    colors: ["#00ab57", "red"],

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
      <h2>Chart 6</h2>
      <Chart6 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
