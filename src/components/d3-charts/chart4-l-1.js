import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const Chart4 = ({ height = 350, options, series }) => {
  let bottomAxis = useRef(),
    leftAxis = useRef(),
    rightAxis = useRef(),
    toolRef = useRef(),
    toolTitleRef = useRef(),
    toolDescRef = useRef();

  let tooltip = d3.select(toolRef.current);
  let margin = { left: 40, top: 40, right: 40, bottom: 40 },
    width = 800,
    { categories } = options.xaxis,
    { colors } = options;
  console.log(options);
  console.log(series);

  const formattedData = series.map((serie, i) => {
    return {
      ...serie,
      data: serie.data.map((d, j) => {
        return { x: categories[j], y: d };
      }),
    };
  });
  const xScale = d3.scalePoint().domain(categories).range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(series[0].data, (d) => d)])
    .range([height, 0]);

  let xAxis = d3.axisBottom(xScale),
    yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(function (value) {
        return options.yaxis
          ? options.yaxis.labels.formatter(value)
          : `${value}K`;
      });

  let valueLine0 = d3
    .line()
    .x(function (d) {
      return xScale(d.x);
    })
    .y(function (d) {
      return yScale(d.y);
    })
    .curve(d3.curveCatmullRom);

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
          <g
            ref={rightAxis}
            transform={`translate(${width}, 0)`}
            style={{
              fontSize: "12px",
            }}
          />
          <g>
            {formattedData.map((data, i) => {
              return (
                <g key={i}>
                  <path
                    d={valueLine0(data.data)}
                    fill="none"
                    stroke={colors[i]}
                    strokeWidth={3}
                  />
                  {categories.map((category, j) => {
                    return (
                      <circle
                        key={j}
                        fill={colors[i]}
                        cx={xScale(data.data[j].x)}
                        cy={yScale(data.data[j].y)}
                        r={4.5}
                        style={{
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          handleMouseOver(
                            e,
                            category,
                            "series-1",
                            options.yaxis.labels.formatter(data.data[j].y)
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
