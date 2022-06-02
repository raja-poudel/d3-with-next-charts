import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { curveCardinal } from "d3";
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

export const ScatteredChart = () => {
  const xRef = useRef(),
    yRef = useRef();
  let width = 800,
    height = 350,
    margin = { left: 40, top: 40, right: 40, bottom: 40 };
  let xScale = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return new Date(d.date);
      })
    )
    .range([0, width]);

  let yScale = d3.scaleLinear().domain([8000, 9200]).range([height, 0]);

  let bottomAxis = d3.axisBottom(xScale);
  let leftAxis = d3.axisLeft(yScale);
  
  useEffect(() => {
    d3.select(xRef.current).call(bottomAxis);
    d3.select(yRef.current).call(leftAxis);
  }, []);
  let pathLine = d3
    .line()
    .x(function (d) {
      return xScale(new Date(d.date));
    })
    .y(function (d) {
      return yScale(d.value);
    })
    .curve(curveCardinal);

  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={xRef} transform={`translate(0, ${height})`} />
        <g ref={yRef} />
        <g>
          {data.map((value, i) => {
            return (
              <circle
                key={i.toString()}
                fill="#69b3a2"
                r="5"
                cx={xScale(new Date(value.date))}
                cy={yScale(value.value)}
              />
            );
          })}
          <path
            stroke="#69b3a2"
            strokeWidth={1.5}
            fill="none"
            d={pathLine(data)}
          />
        </g>
      </g>
    </svg>
  );
};
