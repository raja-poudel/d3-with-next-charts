import { useEffect, useRef } from "react";
import * as d3 from 'd3';

export const TTwoLineChart = ({ data, height = 350 }) => {
    console.log(data);
    let svgRef = useRef(),
        toolRef = useRef(),
        width = 800,
        margin = { left: 60, top: 30, right: 60, bottom: 30 };
    useEffect(() => {
        d3.select(svgRef.current)
            .select("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
        var parseTime = d3.timeParse("%Y-%m-%d");
        let newData = data.map(d => {
            return { ...d, date: parseTime(d.date) }
        })

        let xScale = d3.scaleTime().domain(d3.extent(newData, function (d) { return d.date })).range([0, width]),
            yScale = d3.scaleLinear().domain(d3.extent(newData, function (d) { return d.value })).range([height, 0]);
        let xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale).ticks(5);
        let valueLine = d3.line()
            .x(function (d) {
                console.log(d);
                return xScale(d.date)
            })
            .y(function (d) {
                return yScale(d.value)
            })
        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        main.append("g")
            .call(yAxis);
        let g = main.append("g");
        g.append("path")
            .data([newData])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", valueLine);

    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{
                margin: 10,
                borderRadius: 10,
                border: '.5px solid grey',
                boxShadow: "1px 1px .8px .8px grey"
            }} />
            <div ref={toolRef} />
        </>
    )
}