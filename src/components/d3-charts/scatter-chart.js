import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export default function ScatterPlot({ data }) {
  let svgContainer = useRef();
  let width = 500,
    height = 400,
    margin = { left: 80, top: 50, right: 80, bottom: 50 }
  useEffect(() => {
    d3.select(svgContainer.current)
      .select('g')
      .remove()

    let svg = d3.select(svgContainer.current)
      .attr("visibility", "visible")
    // .style("background-color", 'grey')

    let g = svg.append("g")
      .attr("transform", `translate(${margin.top}, ${margin.left})`)

    let xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
      yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);
    const xAxisGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat('').ticks(10);
    const yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat('').ticks(10);
    g.append('text')
      .attr('x', margin.left + 150)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text('Scatter Plot');
    g.append('text')
      .attr('x', margin.left + 150)
      .attr('y', height - 15)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Independant');
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(' + -40 + ' ,' + (margin.top + 150) + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Dependant');
    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisGrid)
      .style("color", 'lightgrey')
    g.append('g')
      .attr('class', 'y axis-grid')
      .call(yAxisGrid)
      .style("color", 'lightgrey')
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale));
    let tooltip = g.append("div")
      .style('position', 'absolute')
      .style("width", 100)
      .style("background-color", "red")
      .style("visibility", "hidden")

    g.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d[0]); })
      .attr("cy", function (d) { return yScale(d[1]); })
      .attr("r", 2)
      .style("fill", "#CC0000")
      .on("mouseover", function (e, d) {
        console.log(e);
        console.log(d)
        tooltip
          .style("visibility", "visible")
          .style("top", e.pageX)
          .style("left", e.pageY) 
      })
  }, [data]);

  return (
    <svg ref={svgContainer} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}>

    </svg>
  )
}