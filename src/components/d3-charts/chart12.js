import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const Chart12 = ({ height = 350, options, series }) => {
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

  let yData = [].concat(
    ...series.map((d, i) => {
      let data = 0;
      let values = d.data.map((value) => {
        data = data + value;
      });
      return data;
    })
  );

  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, width])
    .padding(0.4);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yData)])
    .range([height, 0]);

  let xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale).ticks(5);

  useEffect(() => {
    d3.select(bottomAxis.current).call(xAxis);
    d3.select(leftAxis.current).call(yAxis);
  }, []);

  function handleMouseOver(e, title, name, value) {
    tooltip
      .style("visibility", "visible")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
    d3.select(toolTitleRef.current).text(title);
    d3.select(toolDescRef.current).text(`${name} : ${value}`);
  }

  function handleMouseMove(e, d) {
    tooltip
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY + 10 + "px");
  }

  function handleMouseOut(e, d) {
    tooltip.style("visibility", "hidden");
  }

  console.log(options);
  console.log(categories);
  console.log(series);
  console.log(yData);
  console.log(yScale(23));
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
          <g>
            {categories.map((category, i) => {
              return (
                <g key={category}>
                  {series.map((serie, j) => {
                    let k = j + 1;
                    return (
                      <rect
                        key={j + 1}
                        x={xScale(category)}
                        y={yScale(serie.data[j])}
                        width={xScale.bandwidth()}
                        height={height - yScale(serie.data[j])}
                        fill={options.colors[j]}
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
