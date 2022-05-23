import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const Chart8 = ({ height = 350, options, series }) => {
  let toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();

  let tooltip = d3.select(toolRef.current);

  let margin = { left: 40, top: 40, right: 40, bottom: 40 },
    width = 300,
    radius = Math.min(width, height) / 2;

  let pie = d3.pie();
  let arc = d3
    .arc()
    .innerRadius(radius - 50)
    .outerRadius(radius);

  function handleMouseOver(e, name, value, color) {
    d3.select(toolRef.current)
      .style("visibility", "visible")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
    d3.select(toolDescRef.current)
      .text(`${name} : ${value}`)
      .style("background-color", color);
    d3.select(e.currentTarget).style("opacity", 0.6);
  }

  function handleMouseMove(e, d) {
    d3.select(toolRef.current)
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
  }

  function handleMouseOut(e, d) {
    d3.select(toolRef.current).style("visibility", "hidden");
    d3.select(e.currentTarget).style("opacity", 1);
  }
  console.log(options);
  console.log(series);
  console.log("Radius is " + radius);
  return (
    <>
      <svg
        width={width}
        height={height}
        style={{
          color: "grey",
        }}
      >
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {pie(series).map((serie, i) => {
            return (
              <g>
                <path
                  d={arc(serie)}
                  fill={options.colors[i]}
                  onMouseOver={(e) => {
                    handleMouseOver(
                      e,
                      options.labels[i],
                      series[i],
                      options.colors[i]
                    );
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <div>
        {options.labels.map((label, i) => {
          return (
            <>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: options.colors[i],
                  display: 'inline-block'
                }}
              ></div>
              <li
                style={{
                  listStyleType: "none",
                }}
              >
                {label} : {series[i]}
              </li>
            </>
          );
        })}
      </div>
      <div>
        <div
          ref={toolRef}
          style={{
            width: 120,
            height: 40,
            borderRadius: 8,
            visibility: "hidden",
            position: "absolute",
            fontSize: "14px",
          }}
        >
          <div
            ref={toolDescRef}
            style={{
              backgroundColor: "grey",
              height: "100%",
              color: "white",
              borderRadius: 12,
              padding: 12,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
