import { useRef, useEffect } from "react";
import * as d3 from "d3";

let data = [
  {
    date: "2018-04-14",
    value: 8140.71,
  },
  {
    date: "2018-04-15",
    value: 8338.42,
  },
  {
    date: "2018-04-16",
    value: 8371.15,
  },
  {
    date: "2018-04-17",
    value: 8285.96,
  },
  {
    date: "2018-04-18",
    value: 8197.8,
  },
  {
    date: "2018-04-19",
    value: 8298.69,
  },
  {
    date: "2018-04-20",
    value: 8880.23,
  },
  {
    date: "2018-04-21",
    value: 8997.57,
  },
  {
    date: "2018-04-22",
    value: 9001.64,
  },
  {
    date: "2018-04-23",
    value: 8958.55,
  },
];
export const ScatteredChart2 = () => {
  let xRef = useRef(),
    yRef = useRef();
  let width = 800,
    height = 350,
    margin = { left: 40, top: 30, right: 40, bottom: 30 };

  let xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([0, width]),
    yScale = d3.scaleLinear().domain([8000, 9200]).range([height, 0]);
  let axisBottom = d3.axisBottom(xScale),
    axisLeft = d3.axisLeft(yScale);
  useEffect(() => {
    d3.select(xRef.current).call(axisBottom);
    d3.select(yRef.current).call(axisLeft);
  }, []);
  let valueLine = d3
    .line()
    .x(function (value) {
      return xScale(new Date(value.date));
    })
    .y(function (value) {
      return yScale(value.value);
    });
  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g transform={`translate(0, ${height})`} ref={xRef} />
        <g ref={yRef} />
        <g>
          <path
            d={valueLine(data)}
            fill="none"
            stroke="green"
            stroke-width={3}
          />
          {data.map((d, i) => {
            return (
              <circle
                cx={xScale(new Date(d.date))}
                cy={yScale(new Date(d.value))}
                r={6}
                fill="green"
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};
