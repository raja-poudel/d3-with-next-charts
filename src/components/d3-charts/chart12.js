import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

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

export const Chart12 = ({ height = 350, options, series }) => {
  let bottomAxis = useRef(),
    leftAxis = useRef(),
    toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();
  let [data] = useState(data1);
  let margin = { left: 30, top: 40, right: 30, bottom: 40 },
    width = 800,
    { categories } = options.xaxis;

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

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis);
  }, []);

  function handleMouseOver(e, title, name, value) {
    d3.select(toolRef.current)
      .style("visibility", "visible")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
    d3.select(toolTitleRef.current).text(title);
    d3.select(toolDescRef.current).text(`${name} : ${value}`);
  }

  function handleMouseMove(e, d) {
    d3.select(toolRef.current)
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
  }

  function handleMouseOut(e, d) {
    d3.select(toolRef.current).style("visibility", "hidden");
  }

  console.log(options);
  console.log(categories);
  console.log(series);
  return (
    <>
      <svg
        viewBox={`0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`}
        style={{
          color: "grey",
          overflow: "visible",
        }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            ref={bottomAxis}
            transform={`translate(0, ${height})`}
            style={{
              fontSize: "12px",
            }}
          />
          <g
            ref={leftAxis}
            style={{
              fontSize: "13px",
            }}
          />
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
                          handleMouseOver(
                            e,
                            value.data.group,
                            subgroups[i],
                            value[1]
                          );
                        }}
                        onMouseMove={handleMouseMove}
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
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          ref={toolRef}
          style={{
            width: 120,
            height: 60,
            borderRadius: 3,
            backgroundColor: "green",
            visibility: "hidden",
            position: "absolute",
          }}
        >
          <div
            ref={toolTitleRef}
            style={{
              backgroundColor: "lightgrey",
              height: 20,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            }}
          ></div>
          <div
            ref={toolDescRef}
            style={{
              height: 40,
              backgroundColor: "grey",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

{
  /* <rect
                      key={j}
                      fill={colors[j]}
                      x={xSubgroup(serie.name)}
                      y={yScale(serie.data[i])}
                      width={xSubgroup.bandwidth()}
                      height={height - yScale(serie.data[i])}
                      onMouseOver={(e) => {
                        handleMouseOver(e, category, serie.name, serie.data[i]);
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseOut={handleMouseOut}
                    /> */
}
