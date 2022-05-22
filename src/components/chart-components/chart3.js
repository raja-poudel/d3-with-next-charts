import { Chart3 } from "../d3-charts/chart3";
export const CChart3 = () => {
  const chartOptions = {
    colors: ["#27c6db"],
    labels: ["System Health"],
  };

  const chartSeries = [83];
  return (
    <div>
      <h2>Chart 3</h2>
      <Chart3 height={300} options={chartOptions} series={chartSeries} />
    </div>
  );
};
