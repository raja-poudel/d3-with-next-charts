import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const T6LineChart = ({ data, height = 350 }) => {
  let svgRef = useRef(),
    toolRef = useRef(),
    width = 760,
    margin = { left: 60, top: 30, right: 60, bottom: 30 };

  useEffect(() => {
    d3.select(svgRef.current).select("g").remove();
    let svg = d3.select(svgRef.current),
      main = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let newData = data.series.map((d, i) => {
      return {
        ...d,
        data: d.data.map((d1, i1) => {
          return { x: data.xaxis.dataPoints[i1], y: d1 };
        }),
      };
    });
    let y0Data = data.series[0],
      y1Data = data.series[1],
      y2Data = data.series[2];

    let x = d3.scalePoint().domain(data.xaxis.dataPoints).range([0, width]),
      y0 = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(y0Data.data, function (d) {
            return d;
          }),
        ])
        .range([height, 0]),
      y1 = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(y1Data.data, function (d) {
            return d;
          }),
        ])
        .range([height, 0]),
      y2 = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(y2Data.data, function (d) {
            return d;
          }),
        ])
        .range([height, 0]);

    let xAxis = d3.axisBottom(x),
      y0Axis = d3.axisLeft(y0).ticks(5),
      y1Axis = d3.axisLeft(y1).ticks(5).tickValues([]),
      y2Axis = d3.axisRight(y2).ticks(5);

    main.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    main.append("g").call(y0Axis);
    main.append("g").call(y1Axis);
    main.append("g").attr("transform", `translate(${width}, 0)`).call(y2Axis);

    let g = main.append("g");

    let valueLine0 = d3
      .line()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y0(d.y);
      })
      .curve(d3.curveCardinal);

    let valueLine1 = d3
      .line()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y1(d.y);
      })
      .curve(d3.curveCardinal);
    let valueLine2 = d3
      .line()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y2(d.y);
      })
      .curve(d3.curveCardinal);

    g.selectAll("g")
      .data(newData)
      .enter()
      .append("g")
      .each((d, i, nodes) => {
        const element = nodes[i];
        d3.select(element)
          .append("path")
          .style("stroke", d.color)
          .style("fill", "none")
          .style("stroke-width", 3)
          .attr("d", function (d) {
            switch (i) {
              case 0:
                return valueLine0(d.data);
              case 1:
                return valueLine1(d.data);
              case 2:
                return valueLine2(d.data);
            }
          });
      });
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
