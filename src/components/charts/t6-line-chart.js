import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T6LineChart = ({ data, height = 350 }) => {
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
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
        let parseTime = d3.timeParse("%d-%b-%y")
        let formatedData = data.map((d) => {
            return { ...d, date: parseTime(d.date) };
        })

        let xScale = d3.scaleTime().domain(d3.extent(formatedData.map((d) => d.date))).range([0, width]),
            yScale = d3.scaleLinear().domain([0, d3.max(formatedData.map((d) => d.close))]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale).ticks(13),
            yAxis = d3.axisLeft(yScale).ticks(5);

        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis
                .tickSize(-height)
            );
        main.append("g")
            .call(yAxis
                .tickSize(-width)
            );
        let valueLine = d3.line()
            .x(function (d) {
                return xScale(d.date) 
            })
            .y(function (d) { return yScale(d.close) })
        let g = main.append("g");

        g.append("path")
            .data([formatedData])
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr('stroke-width', 3)
            .attr("d", valueLine)

        g.selectAll("circle")
            .data(formatedData)
            .enter()
            .append("circle")
            .attr("fill", "green")
            .attr("cx", function (d) {
                return xScale(d.date)
            })
            .attr("cy", function (d) {
                return yScale(d.close);
            })
            .attr("r", 3.5)
            .on("mouseover", handleMouseOver)
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);
        let tooltip = d3.select(toolRef.current),
            format = d3.timeFormat("%d-%b-%y");
        function handleMouseOver(e, d) {
            d3.select(this)
                .transition()
                .delay(5)
                .attr("r", 8)
            tooltip
                .style("visibility", "visible")
                .style("left", e.pageX + 10 + "px")
                .style("top", e.pageY + 10 + "px")
                .text(`Date: ${format(d.date)}, Close At: ${d.close}`)
                ;
        }
        function handleMouseMove(e, d) {
            tooltip
                .style("left", e.pageX + 10 + "px")
                .style("top", e.pageY + 10 + "px")
        }
        function handleMouseOut(e, d) {
            d3.select(this)
                .transition()
                .delay(25)
                .attr("r", 3.5)
            tooltip
                .style("visibility", "hidden")

        }
    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{

                border: ".2px solid grey",
                boxShadow: "0.1px 0.1px .5px .8px grey",
                borderRadius: 4,
                margin: 20
            }} />
            <div
                ref={toolRef}
                style={{
                    backgroundColor: '#ccc',
                    width: 120,
                    height: 40,
                    border: ".5px solid grey",
                    visibility: "hidden",
                    position: 'absolute',
                    fontSize: ".75em"
                }}
            />
        </>
    )
}