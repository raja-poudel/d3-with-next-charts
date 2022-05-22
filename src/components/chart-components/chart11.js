import { Chart11 } from "../d3-charts/chart11";
const data = {
  series: [
    {
      color: "#7783DB",
      category: "Email",
      data: 37530,
    },
    {
      color: "#7BC67E",
      category: "GDN",
      data: 52717,
    },
    {
      color: "#FFB547",
      category: "Instagram",
      data: 62935,
    },
    {
      color: "#F06191",
      category: "Facebook",
      data: 90590,
    },
    {
      color: "#64B6F7",
      category: "Google Ads Search",
      data: 13219,
    },
  ],
};

export const CChart11 = () => {
  const chartOptions = {
    colors: data.series.map((item) => item.color),
    tooltip: {
      y: {
        formatter: (value) => numeral(value).format("$0,0.00"),
      },
    },
    xaxis: {
      categories: data.series.map((item) => item.category),
    },
  };

  const chartSeries = [
    {
      data: data.series.map((item) => item.data),
      name: "Sales",
    },
  ];
  return (
    <div>
      <h2>Chart 11</h2>
      <Chart11 height={350} series={chartSeries} options={chartOptions} />
    </div>
  );
};
