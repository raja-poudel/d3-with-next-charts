import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const T11BarChart = ({ data }) => {
  let width = 800,
    height = 350,
    margin = { left: 30, top: 15, right: 30, bottom: 15 };
  let bottomAxis = useRef(),
    rightAxis = useRef();
  let xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.4),
    yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ])
      .range([height, 0]);
  useEffect(() => {
    let xAxis = d3.axisBottom(xScale),
      yAxis = d3.axisRight(yScale);
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(rightAxis.current).call(yAxis);
  }, []);   

  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
      style={{
        border: "1px solid grey",
      }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={bottomAxis} transform={`translate(0, ${height})`} />
        <g ref={rightAxis} transform={`translate(${width}, 0)`} />
        <g>
          {data.map((d, index) => {
            return (
              <rect
                key={index}
                x={xScale(d.year)}
                y={yScale(d.value)}
                width={xScale.bandwidth()}
                height={height - yScale(d.value)}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};
