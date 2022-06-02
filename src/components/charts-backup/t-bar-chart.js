import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const TBarChart = ({ data, height = 350 }) => {
  let svgRef = useRef(),
    toolRef = useRef(),
    width = 760,
    margin = { left: 60, top: 30, right: 60, bottom: 30 };
  console.log(data);
  useEffect(() => {
    d3.select(svgRef.current).select("g").remove();
    let svg = d3.select(svgRef.current),
      main = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // let parseTime = d3.timeParse("%Y-%m-%d"); //only one will work fine
    // var parseTime = d3.timeParse("%d-%b-%y");

    let xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.Country))
        .range([0, width]),
      yScale = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return d.Value;
          })
        )
        .range([height, 0]);
    let xAxis = d3.axisBottom(xScale),
      yAxis = d3.axisLeft(yScale);

    main.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    main.append("g").call(yAxis);

    main
      .append("g")
      .selectAll("mybar")
      .data(data)
      .append("rect")
      .attr("x", function (d) {
        console.log(d);
        return xScale(d.Country);
      })
      .attr("y", function (d) {
        return yScale(d.Value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - yScale(d.Value);
      })
      .attr("fill", "#69b3a2");
  }, [data.length]);
  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`}
        style={{
          border: ".5px solid grey",
          boxShadow: "0.1px 0.1px .5px .8px grey",
          borderRadius: 4,
          margin: 20,
        }}
      />
      <div
        ref={toolRef}
        style={{
          width: 120,
          height: 40,
          border: ".5px solid grey",
          visibility: "hidden",
          position: "absolute",
        }}
      />
    </>
  );
};
