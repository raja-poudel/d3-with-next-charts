import * as d3 from "d3";
import { useRef, useEffect } from "react";

export const Chart0 = () => {
  let bottomAxis = useRef(),
    leftAxis = useRef(),
    rightAxis = useRef();

  let width = 800,
    height = 350,
    margin = { left: 40, top: 30, right: 40, bottom: 30 };

  let series = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let options = {
    yaxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  let xScale = d3.scaleLinear().domain(d3.extent(series)).range([0, width]),
    yScale = d3
      .scaleLinear()
      .domain(d3.extent(options.yaxis))
      .range([height, 0]),
    yRightScale = d3
      .scaleLinear()
      .domain(d3.extent(options.yaxis))
      .range([height, 0]);

  let xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale).ticks(5),
    yRightAxis = d3.axisRight(yRightScale).ticks(5);

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis);
    d3.select(rightAxis.current).call(yRightAxis);
  }, []);
  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={bottomAxis} transform={`translate(0, ${height})`} />
        <g ref={leftAxis} />
        <g ref={rightAxis} transform={`translate(${width}, 0)`} />
      </g>
    </svg>
  );
};
