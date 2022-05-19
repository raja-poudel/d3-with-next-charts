import { useEffect, useRef } from "react"
import * as d3 from 'd3';
export const BarChart = ({ data, width, height }) => {
    const svgContainer = useRef();
    const tooltipRef = useRef();
    useEffect(() => {
        d3.select(svgContainer.current)
            .select('svg')
            .remove();
        let svg = d3.select(svgContainer.current)
            .append('svg')
            .attr("width", width + 100)
            .attr("height", height + 100)
            .style("margin", 10)
            .style("overflow", 'visible')
        let tooltip = d3.select(tooltipRef.current)
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("padding", "15px")
            .style("width", "80px")
            .style("background", "grey")
            .style("border-radius", "5px")
            .style("color", "#fff")
            .text("a simple tooltip");

        let xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        let g = svg.append("g")
            .attr("transform", "translate(" + 50 + ", " + 50 + ")")

        xScale.domain(data.map(d => d.label));
        yScale.domain([0, d3.max(data, function (d) { return d.value })]);

        g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale))

        g.append("g")
            .call(d3.axisLeft(yScale).ticks(10))

        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.label))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => {
                return height - yScale(d.value)
            })
            .on("mouseover", function (e, d) {
                let selectedName = d.label;
                d3.selectAll("rect")
                    .style("opacity", function (d) {
                        return d.label === selectedName ? 1 : 0.9
                    })
                // d3.selectAll("rect")
                //     .attr("y", function (d) {
                //         return d.label === selectedName ? 0 : null
                //     })
                tooltip
                    .style("top", (e.pageY - 10) + "px")
                    .style("left", (e.pageX + 30) + "px")
                    .style("visibility", "visible")
                    .append("text")
                    .text(`${d.label + " value is " + d.value}`)
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })

            .on("mouseout", function (e, d) {
                d3.selectAll("rect")
                    .style("opacity", 1)
                tooltip.html(``).style("visibility", "hidden");
            })
    }, [data.length]);
    return (
        <div ref={svgContainer}>
            <div ref={tooltipRef}></div>
            <svg>
            </svg>
        </div>
    )
}