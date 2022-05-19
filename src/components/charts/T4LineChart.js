import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T4LineChart = ({ data, height = 350 }) => {
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
        // let parseTime = d3.timeParse("%Y-%m-%d"); //only one will work fine
        // var parseTime = d3.timeParse("%d-%b-%y");
        let newData = data.series.map((d, i) => {
            return {
                ...d, data: d.data.map((d, j) => {
                    return { x: data.xaxis.dataPoints[j], y: d }
                })
            }
        })
        console.log(newData);
        let xScale = d3.scalePoint().domain(data.xaxis.dataPoints).range([0, width]),
            yScale = d3.scaleLinear().domain([0, d3.max(newData[0].data, (d) => d.y)]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);

        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        main.append("g")
            .call(yAxis);
        let g = main.append("g");

        let valueLine = d3.line()
            .x(function (d) {
                return xScale(d.x)
            })
            .y(function (d) {
                return yScale(d.y)
            })
            .curve(d3.curveCardinal)

        let lines = g.selectAll("path")
            .data(newData)
            .enter()
            .append('path')
            .attr("fill", "none")
            .attr("stroke", d => d.color)
            .attr("stroke-width", 3)
            .attr("d", function (d) {
                return valueLine(d.data);
            })
        lines.each((d, i, nodes) => {
            console.log(d);
            console.log(i);
            console.log(nodes[i])
            d3.select(nodes[i])
                .on("mouseover", function () {
                    console.log('one of line is hovered');
                })
        })
        
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