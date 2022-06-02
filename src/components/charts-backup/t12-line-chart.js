import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const T12LineChart = ({ data, heigh = 350 }) => {
  let width = 800,
    margin = { left: 40, top: 30, right: 40, bottom: 30 },
    bottomAxis = useRef(),
    rightAxis = useRef();

  let parseTime = d3.timeParse("%Y-%m-%d");
  let newData = data.map((d) => {
    return { ...d, date: parseTime(d.date) };
  });
  let xScale = d3
      .scaleTime()
      .domain(
        d3.extent(newData, function (d) {
          return d.date;
        })
      )
      .range([0, width]),
    yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(newData, function (d) {
          return d.value;
        }),
      ])
      .range([heigh, 0]);
  let valueLine = d3
    .line()
    .x(function (d) {
      return xScale(d.date);
    })
    .y(function (d) {
      return yScale(d.value);
    });
  let xaxis = d3.axisBottom(xScale),
    yaxis = d3.axisRight(yScale);
  useEffect(() => {
    d3.select(bottomAxis.current).call(xaxis);
    d3.select(rightAxis.current).call(yaxis);
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
          <path
            d={valueLine(newData)}
            stroke="steelblue"
            strokeWidth={1.5}
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};
