import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T8PieChart = ({ data, height = 250 }) => {
    let svgRef = useRef(),
        toolRef = useRef(),
        width = 200,
        margin = { left: 20, top: 10, right: 20, bottom: 10 },
        radius = Math.min(width, height) / 2;

    console.log(data);
    useEffect(() => {
        d3.select(svgRef.current)
            .select("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`),
            tooltip = d3.select(toolRef.current);

        let color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

        let circleGroup = main.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let pie = d3.pie();
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        let arcs = circleGroup.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .on("mouseover", handleMouseOver)
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(e, d) {
            d3.select(this)
                .style("opacity", .8)
            tooltip
                .style("visibility", "visible")
                .style("left", e.pageX + 10 + 'px')
                .style("top", e.pageY + 10 + "px")
                .text(`Value is ${d.value}`)

        }
        function handleMouseMove(e, d) {
            tooltip.style("left", e.pageX + 10 + 'px')
                .style("top", e.pageY + 10 + "px")

        }

        function handleMouseOut(e, d) {
            d3.select(this)
                .style('opacity', 1)
            tooltip
                .style("visibility", "hidden");
        }

    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} style={{
                border: ".5px solid grey",
                boxShadow: "0.1px 0.1px .5px .8px grey",
                borderRadius: 4,
                margin: 20, width: width + margin.left + margin.right,
                height: height + margin.top + margin.bottom
            }} />
            <div
                ref={toolRef}
                style={{
                    width: 120,
                    height: 40,
                    border: ".5px solid grey",
                    visibility: "hidden",
                    position: 'absolute',
                    borderRadius: 10,
                    boxShadow: ".5px .5px 2px .8px green"
                }}
            />
        </>
    )
}