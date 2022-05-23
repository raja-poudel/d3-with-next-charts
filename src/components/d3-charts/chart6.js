import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const Chart6 = ({ height = 350, options, series }) => {
  let bottomAxis = useRef(),
    leftAxis = useRef(),
    toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();

  let tooltip = d3.select(toolRef.current);
  let margin = { left: 30, top: 40, right: 30, bottom: 40 },
    width = 800,
    { categories } = options.xaxis,
    { colors } = options;
  console.log(options);
  console.log(series);
  let yData = [].concat(...series.map((d, i) => d.data.map((value) => value)));
  console.log(yData);
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
    .domain(
      series.map((series, i) => {
        return i + 1;
      })
    )
    .range([0, xScale.bandwidth()])
    .padding(0.1);
  console.log(
    series.map((series, i) => {
      return i + 1;
    })
  );
  let xAxis = d3.axisBottom(xScale),
    yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(function (value) {
        return options.yaxis.labels.formatter(value);
      });

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis).attr("stroke-width", 0);
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
              fontSize: "12px",
            }}
          />
          {categories.map((category, i) => {
            return (
              <g key={i} transform={`translate(${xScale(category)}, 0)`}>
                {series.map((serie, j) => (
                  <rect
                    key={j}
                    fill={colors[j]}
                    x={xSubgroup(j + 1)}
                    y={yScale(serie.data[i])}
                    width={xSubgroup.bandwidth()}
                    height={height - yScale(serie.data[i])}
                    onMouseOver={(e) => {
                      handleMouseOver(
                        e,
                        category,
                        `series-${j + 1}`,
                        serie.data[i]
                      );
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                  />
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
