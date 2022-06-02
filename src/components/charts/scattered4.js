import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { curveCardinal } from "d3";

let allGroup = ["valueA", "valueB", "valueC"],
  data = [
    {
      time: 1,
      valueA: 2,
      valueB: 5,
      valueC: 13,
    },
    {
      time: 2,
      valueA: 3,
      valueB: 4,
      valueC: 14,
    },
    {
      time: 3,
      valueA: 1,
      valueB: 4,
      valueC: 16,
    },
    {
      time: 4,
      valueA: 7,
      valueB: 4,
      valueC: 12,
    },
    {
      time: 5,
      valueA: 8,
      valueB: 8,
      valueC: 7,
    },
    {
      time: 6,
      valueA: 8,
      valueB: 13,
      valueC: 9,
    },
    {
      time: 7,
      valueA: 5,
      valueB: 15,
      valueC: 3,
    },
    {
      time: 8,
      valueA: 4,
      valueB: 17,
      valueC: 2,
    },
    {
      time: 9,
      valueA: 9,
      valueB: 18,
      valueC: 1,
    },
    {
      time: 10,
      valueA: 11,
      valueB: 13,
      valueC: 1,
    },
  ];
export const ScatteredChart4 = () => {
  let bottomRef = useRef(),
    leftRef = useRef();
  const width = 800,
    height = 350,
    margin = { left: 40, top: 35, right: 40, bottom: 35 };

  let dataReady = allGroup.map(function (gName) {
    return {
      name: gName,
      value: data.map(function (d) {
        return { time: d.time, value: d[gName] };
      }),
    };
  });
  let myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);
  let xScale = d3.scaleLinear().domain([0, 10]).range([0, width]),
    yScale = d3.scaleLinear().domain([0, 30]).range([height, 0]);
  let bottomAxis = d3.axisBottom(xScale),
    leftAxis = d3.axisLeft(yScale);
  useEffect(() => {
    d3.select(bottomRef.current).call(bottomAxis);
    d3.select(leftRef.current).call(leftAxis);
  }, []);

  let valueLine = d3
    .line()
    .x(function (d) {
      return xScale(d.time);
    })
    .y(function (d) {
      return yScale(d.value);
    })
    .curve(curveCardinal);

  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={bottomRef} transform={`translate(0, ${height})`} />
        <g ref={leftRef} />
        <g>
          {dataReady.map((data, i) => {
            return (
              <g>
                <path
                  key={i.toString()}
                  strokeWidth={4}
                  stroke={myColor(data.name)}
                  d={valueLine(data.value)}
                  fill="none"
                />
                {data.value.map((d, i) => {
                  return (
                    <circle
                      cx={xScale(d.time)}
                      cy={yScale(d.value)}
                      r={4}
                      fill={myColor(data.name)}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};
