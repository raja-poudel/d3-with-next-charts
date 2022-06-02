import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T7LineChart = ({ data, height = 350 }) => {
    let svgRef = useRef(),
        toolRef = useRef(),
        width = 760,
        margin = { left: 60, top: 30, right: 60, bottom: 30 };
    useEffect(() => {
        d3.select(svgRef.current)
            .select("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`),
            tooltip = d3.select(toolRef.current);

        console.log(data)
        let xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]),
            yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
        let xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);
        let line = d3.line()
            .x(function (d, i) {
                return xScale(i)
            })
            .y(function (d) {
                return yScale(d);
            })
            .curve(d3.curveCatmullRom)
        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis
                .tickSize(-height)
            )
        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
        main.append("g")
            .call(yAxis
                .tickSize(-width)
            )
        main.append("g")
            .call(yAxis)

        let pathGroup = main.append("g")
        pathGroup
            .append("path")
            .attr("fill", "none")
            .attr("stroke-width", 3)
            .attr("stroke", "green")
            .attr("d", line(data));

        let circleGroup = pathGroup.selectAll("g")
            .data(data)
            .enter()
            .append("g")

        circleGroup
            .append("circle")
            .attr("fill", "white")
            .attr("cx", function (d, i) {
                return xScale(i)
            })
            .attr("cy", function (d) {
                return yScale(d)
            })
            .attr("r", 5.5)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        circleGroup
            .append("circle")
            .attr("fill", "green")
            .attr("cx", function (d, i) {
                return xScale(i)
            })
            .attr("cy", function (d) {
                return yScale(d)
            })
            .attr("r", 3.5)
            .on("mouseover", handleMouseOver1)
            .on("mouseout", handleMouseOut1);

        function handleMouseOver(e, d, i) {
            tooltip
                .style('visibility', 'visible')
                .style("left", e.pageX + 10 + "px")
                .style("top", e.pageY + 10 + "px")
                .text(`Value is ${d}.`)
            d3.select(this)
                .transition()
                .delay(25)
                .attr("r", 8)
        }
        function handleMouseOut(e, d) {
            tooltip
                .style("visibility", "hidden");
            d3.select(this)
                .transition()
                .delay(25)
                .attr("r", 5.5)
                .attr("fill", "white")
        }
        function handleMouseOver1(e, d, i) {
            d3.select(this)
                .transition()
                .delay(25)
                .attr("r", 4.5)
        }
        function handleMouseOut1(e, d) {
            tooltip
                .style("visibility", "hidden");
            d3.select(this)
                .transition()
                .delay(25)
                .attr("r", 3.5)
                .attr("fill", "green")
        }
    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{
                border: ".5px solid grey",
                boxShadow: "0.1px 0.1px .5px .8px grey",
                borderRadius: 4,
                margin: 20
            }} />
            <div
                ref={toolRef}
                style={{
                    background: "grey",
                    width: 120,
                    height: 40,
                    border: ".5px solid grey",
                    visibility: "hidden",
                    borderRadius: 10,
                    position: 'absolute',
                    padding: 8,
                    textAlign: 'center',
                    alignItems: 'center'
                }}
            />
        </>
    )
}