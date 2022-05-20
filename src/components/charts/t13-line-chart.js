import * as d3 from "d3";
import { useRef, useEffect } from "react";

export const T13LineChart = ({ data, heigh = 350 }) => {
  let bottomAxis = useRef(),
    rightAxis = useRef();

  let width = 800,
    margin = { left: 40, top: 30, right: 40, bottom: 30 },
    colors = [
      "red",
      "green",
      "blue",
      "orange",
      "skyblue",
      "black",
      "teal",
      "steelblue",
      "salmon",
    ];

  console.log(data);
  let sumstat = Array.from(d3.group(data, (d) => d.name)); // nest function allows to group the calculation per level of a factor
  console.log(sumstat);

  let xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, width]),
    yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.n)])
      .range([heigh, 0]);
  let valueLine = d3
    .line()
    .x(function (d) {
      return xScale(d.year);
    })
    .y(function (d) {
      return yScale(d.n);
    });
  useEffect(() => {
    let xAxis = d3.axisBottom(xScale),
      yAxis = d3.axisRight(yScale);
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(rightAxis.current).call(yAxis);
  }, []);
  
  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        heigh + margin.top + margin.bottom
      }`}
      style={{
        border: "1px solid grey",
        margin: 20,
        borderRadius: 10,
      }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={bottomAxis} transform={`translate(0, ${heigh})`} />
        <g ref={rightAxis} transform={`translate(${width}, 0)`} />
        <g>
          {sumstat.map((d, i) => {
            return (
              <g key={i}>
                <path
                  key={i}
                  d={valueLine(d[1])}
                  stroke={colors[i]}
                  strokeWidth={1.5}
                  fill="none"
                />
                {d[1].map((circle, i) => {
                  return (
                    <circle cx={xScale(circle.year)} cy={yScale(circle.n)} r={1.5}/>
                  );
                })}
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};
