import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const Chart3 = ({ height = 350, options, series }) => {
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
    .innerRadius(Math.min(width, height) - 40)
    .outerRadius(radius);

  function handleMouseOver(e, title, name, value) {
    tooltip
      .style("visibility", "visible")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
    d3.select(toolTitleRef.current).text(title);
    d3.select(toolDescRef.current).text(`${name} : ${value}`);
    d3.select(e.currentTarget).style("r", 6.5);
  }

  function handleMouseMove(e, d) {
    tooltip
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
  }

  function handleMouseOut(e, d) {
    tooltip.style("visibility", "hidden");
    d3.select(e.currentTarget).style("r", 4.5);
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
          backgroundColor: "lightgrey",
        }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g></g>
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
              borderRadius: 10,
              backgroundColor: "red",
              display: "inline-block",
              marginRight: 8,
            }}
          ></div>
          <span>{series[0].name}</span>
        </div>
        <div
          ref={toolRef}
          style={{
            width: 120,
            height: 60,
            borderRadius: 8,
            backgroundColor: "green",
            visibility: "hidden",
            position: "absolute",
            fontSize: "14px",
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
