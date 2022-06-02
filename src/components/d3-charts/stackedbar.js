import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";

let data1 = [
  {
    group: "banana",
    Nitrogen: 12,
    normal: 1,
    stress: 13,
  },
  {
    group: "poacee",
    Nitrogen: 6,
    normal: 6,
    stress: 33,
  },
  {
    group: "sorgho",
    Nitrogen: 11,
    normal: 28,
    stress: 12,
  },
  {
    group: "triticum",
    Nitrogen: 19,
    normal: 6,
    stress: 1,
  },
];

export const StackedBarChart = ({ height = 300 }) => {
  let bottomAxis = useRef(),
    leftAxis = useRef();

  let width = 800,
    margin = { left: 40, top: 35, right: 40, bottom: 35 };
  let [data] = useState(data1);

  let groups = data.map((d) => d.group);
  let subgroups = ["Nitrogen", "normal", "stress"];

  let x = d3.scaleBand().domain(groups).range([0, width]).padding([0.4]);
  let y = d3.scaleLinear().domain([0, 60]).range([height, 0]);

  let xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis);
  }, []);

  let color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  let stackedData = d3.stack().keys(subgroups)(data);

  function handleMouseOver(e) {
    d3.select(e.currentTarget).style("opacity", 0.6);
  }
  function handleMouseOut(e) {
    d3.select(e.currentTarget).style("opacity", 1);
  }
  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
      style={{
        backgroundColor: "lightgrey",
        borderRadius: 4,
        margin: 12,
      }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={bottomAxis} transform={`translate(0, ${height})`} />
        <g ref={leftAxis} />
        <g>
          {stackedData.map((d, i) => {
            return (
              <g key={i} fill={color(d.key)}>
                {d.map((value, j) => {
                  return (
                    <rect
                      key={value}
                      x={x(value.data.group)}
                      y={y(value[1])}
                      width={x.bandwidth()}
                      height={y(value[0]) - y(value[1])}
                      style={{
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        handleMouseOver(e);
                      }}
                      onMouseOut={handleMouseOut}
                    />
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
