import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export const Chart1 = ({ height = 350, options, series }) => {
  // let [tooltip, setTooltip] = useState(false);

  let bottomAxis = useRef(),
    leftAxis = useRef(),
    toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();

  let margin = { left: 30, top: 40, right: 30, bottom: 40 },
    width = 800,
    { categories } = options.xaxis,
    { colors } = options;

  let yData = [].concat(...series.map((d, i) => d.data.map((value) => value)));

  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, width])
    .padding(0.4);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yData)])
    .range([height, 0]);
  const xSubgroup = d3
    .scaleBand()
    .domain(series.map((d) => d.name))
    .range([0, xScale.bandwidth()])
    .padding(0.1);

  let xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale);

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
  console.log(series);

  return (
    <>
      <svg
        viewBox={`0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`}
        style={{
          color: "grey",
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
          {categories.map((category, i) => {
            return (
              <g key={i} transform={`translate(${xScale(category)}, 0)`}>
                {series.map((serie, j) => (
                  <rect
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
                  ></rect>
                ))}
              </g>
            );
          })}
        </g>
      </svg>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline",
            marginRight: 8,
          }}
        >
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: 3,
              backgroundColor: colors[0],
              display: "inline-block",
              marginRight: 8,
            }}
          ></div>
          <span>{series[0].name}</span>
        </div>
        <div style={{ display: "inline", marginRight: 8 }}>
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: 3,
              backgroundColor: colors[1],
              display: "inline-block",
              marginRight: 8,
            }}
          ></div>
          <span>{series[1].name}</span>
        </div>
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
