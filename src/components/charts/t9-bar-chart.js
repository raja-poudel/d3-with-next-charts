import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T9BarChart = ({ data, height = 350 }) => {
    let svgRef = useRef(),
        toolRef = useRef(),
        width = 760,
        margin = { left: 60, top: 30, right: 60, bottom: 30 };
    console.log(data);
    useEffect(() => {
        d3.select(svgRef.current)
            .select("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        let xScale = d3.scaleBand().domain(data.map(function (d) {
            return d.year;
        })).range([0, width])
            .padding(.4)
            ;
        let yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d.value })]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisRight(yScale).ticks(5);
        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        main.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(yAxis);

        let rectGroup = main.append("g");

        rectGroup
            .selectAll("rect")
            .data(data)
            .enter()
            .append('rect')
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .attr("x", function (d) {
                return xScale(d.year);
            })
            .attr("y", function (d) {
                return yScale(d.value);
            })
            .transition()
            .delay(function (d, i) {
                return i * 250
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d.value)
            })


        function handleMouseOver(e, d) {
            d3.select(this)
                .transition()
                .delay(25)
                .style("fill", "orange")
        }
        function handleMouseOut(e, d) {
            d3.select(this)
                .transition()
                .delay(25)
                .style("fill", "black")
        }

    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{
                backgroundColor: 'lightgrey',
                border: ".5px solid grey",
                boxShadow: "0.1px 0.1px .5px .8px grey",
                borderRadius: 4,
                margin: 20
            }} />
            <div
                ref={toolRef}
                style={{
                    width: 120,
                    height: 40,
                    border: ".5px solid grey",
                    visibility: "hidden",
                    position: 'absolute'
                }}
            />
        </>
    )
}