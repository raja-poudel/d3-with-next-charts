import * as d3 from "d3";

export const T10BarChart = ({ data }) => {
  let width = 800,
    height = 350,
    margin = { left: 30, top: 15, right: 30, bottom: 15 };

  let xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([0, width])
    .padding(.4)
    ;
  let yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ])
    .range([height, 0]);

  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
      style={{
        border: "1px solid black",
      }}
    >
      {data.map((d, index) => {
        return (
          <rect
            key={index}
            x={xScale(d.year)}
            y={yScale(d.value)}
            height={height - yScale(d.value)}
            width={xScale.bandwidth()}
            stroke="#ccc"
            fill="steelblue"
          />
        );
      })}
    </svg>
  );
};
