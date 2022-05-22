import { useState } from "react";
import { Chart2 } from "../d3-charts/chart2-l-2";
import { Chart4 } from "../d3-charts/chart4-l-1";
import { Chart7 } from "../d3-charts/chart7-l-3";
import { Chart0 } from "../d3-charts/chart0";

const data = {
  series: [
    {
      color: "#4CAF50",
      data: [
        3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764, 2385, 5912, 8323,
      ],
      name: "Organic",
    },
    {
      color: "#FF9800",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      name: "Referral",
    },
    {
      color: "#F44336",
      data: [100, 122, 50, 300, 250, 400, 312, 200, 10, 60, 90, 400],
      name: "Social Media",
    },
  ],
  xaxis: {
    dataPoints: [
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
export const CChart7 = () => {
  const [selectedSeries, setSelectedSeries] = useState([
    "Organic",
    "Referral",
    "Social Media",
  ]);
  const handleChange = (event, name) => {
    if (!event.target.checked) {
      setSelectedSeries(selectedSeries.filter((item) => item !== name));
    } else {
      setSelectedSeries([...selectedSeries, name]);
    }
  };
  const chartSeries = data.series.filter((item) =>
    selectedSeries.includes(item.name)
  );

  const chartOptions = {
    colors: chartSeries.map((item) => item.color),
    xaxis: {
      categories: data.xaxis.dataPoints,
    },
  };
  console.log(chartOptions)
  return (
    <div>
      <h2>Chart 7</h2>
      {data.series.map((item) => (
        <div key={item.name}>
          <input
            type="checkbox"
            checked={selectedSeries.some(
              (visibleItem) => visibleItem === item.name
            )}
            onChange={(event) => handleChange(event, item.name)}
          />
          <div
            sx={{
              backgroundColor: item.color,
              borderRadius: "50%",
              height: 8,
              ml: 1,
              mr: 2,
              width: 8,
            }}
          />
          <p variant="subtitle2">{item.name}</p>
        </div>
      ))}
      {chartSeries.length === 3 ? (
        <Chart7 height={300} options={chartOptions} series={chartSeries} />
      ) : chartSeries.length === 2 ? (
        <Chart2 height={300} options={chartOptions} series={chartSeries} />
      ) : chartSeries.length === 1 ? (
        <Chart4 height={300} options={chartOptions} series={chartSeries} />
      ) : (
        <Chart0 />
      )}
    </div>
  );
};
