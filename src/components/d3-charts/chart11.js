import * as d3 from "d3";
import { useEffect, useRef } from "react";

export const Chart11 = ({ height = 350, series, options }) => {
  let bottomAxis = useRef(),
    leftAxis = useRef(),
    toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();

  let tooltip = d3.select(toolRef.current);

  let width = 800,
    margin = { left: 40, top: 35, right: 40, bottom: 35 };

  let xData = [].concat(...series.map((d, i) => d.data.map((value) => value)));

  let xScale = d3
    .scaleLinear()
    .domain([0, d3.max(xData)])
    .range([0, width]);

  let yScale = d3
    .scaleBand()
    .domain(options.xaxis.categories)
    .range([0, height])
    .padding(0.4);

  let xAxis = d3.axisBottom(xScale).ticks(5),
    yAxis = d3.axisLeft(yScale).tickValues([]);

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis);
  }, []);

  function handleMouseOver(e, title, name, value) {
    d3.select(e.currentTarget).style("opacity", 0.6);

    d3.select(toolRef.current)
      .style("visibility", "visible")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
    d3.select(toolTitleRef.current).text(title);
    d3.select(toolDescRef.current).text(`${name}: ${value}`);
  }

  function handleMouseMove(e) {
    d3.select(toolRef.current)
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
  }
  function handleMouseOut(e) {
    d3.select(e.currentTarget).style("opacity", 1);
    d3.select(toolRef.current).style("visibility", "hidden");
    d3.select(toolTitleRef.current).text("");
    d3.select(toolDescRef.current).text("");
  }

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
          <g ref={bottomAxis} transform={`translate(0, ${height})`} />
          <g
            ref={leftAxis}
            style={{
              fontSize: "14px",
            }}
          />
          <g>
            {options.xaxis.categories.map((category, i) => {
              console.log(category);
              return (
                <rect
                  key={i}
                  x={xScale(0)}
                  y={yScale(category)}
                  width={xScale(series[0].data[i])}
                  height={yScale.bandwidth()}
                  fill={options.colors[i]}
                  onMouseOver={(e) => {
                    handleMouseOver(
                      e,
                      category,
                      series[0].name,
                      series[0].data[i]
                    );
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
              );
            })}
          </g>
        </g>
      </svg>

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
    </>
  );
};

// .append("rect")
// .attr("x", x(0) )
// .attr("y", function(d) { return y(d.Country); })
// .attr("width", function(d) { return x(d.Value); })
// .attr("height", y.bandwidth() )
// .attr("fill", "#69b3a2")
