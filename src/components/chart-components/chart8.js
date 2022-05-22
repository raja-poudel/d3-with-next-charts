import { Chart8 } from "../d3-charts/chart8";
export const CChart8 = () => {
  const chartOptions = {
    colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"],
    labels: ["Linkedin", "Facebook", "Instagram", "Twitter", "Other"],
  };

  const chartSeries = [10, 10, 20, 10, 70];
  return (
    <div>
      <h2>Chart 8</h2>
      <Chart8 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
