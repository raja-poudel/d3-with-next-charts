import * as d3 from "d3";
import { useRef } from "react";

export const T13LineChart = ({ data, heigh = 300 }) => {
  let bottomAxis = useRef(),
    rightAxis = useRef();

  let width = 800,
    margin = { left: 40, top: 30, right: 40, bottom: 30 };
  console.log(data);
  let parseTime = d3.timeParse("%y-%b-%d");
  let newData = data.map((d) => {
    return { ...d, date: parseTime(d.date) };
  });
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
        <g></g>
      </g>
    </svg>
  );
};
