import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T5LineChart = ({ data, height = 350 }) => {
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

        let y0Data = data.series[0],
            y1Data = data.series[1],
            y2Data = data.series[2];

        let newy0Data = y0Data.data.map((d, i) => {
            return { x: data.xaxis.dataPoints[i], y: d }
        }),
            newy1Data = y1Data.data.map((d, i) => {
                return { x: data.xaxis.dataPoints[i], y: d }
            }),
            newy2Data = y2Data.data.map((d, i) => {
                return { x: data.xaxis.dataPoints[i], y: d }
            });
        let x = d3.scalePoint().domain(data.xaxis.dataPoints).range([0, width]),
            y0 = d3.scaleLinear().domain([0, d3.max(y0Data.data, function (d) { return d })]).range([height, 0]),
            y1 = d3.scaleLinear().domain([0, d3.max(y1Data.data, function (d) { return d })]).range([height, 0]),
            y2 = d3.scaleLinear().domain([0, d3.max(y2Data.data, function (d) { return d })]).range([height, 0]);

        let xAxis = d3.axisBottom(x),
            yAxisLeft = d3.axisLeft(y0).ticks(5),
            y1AxisLeft = d3.axisLeft(y1).ticks(5),
            yAxisRight = d3.axisRight(y2).ticks(5);
        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        main.append("g")
            .call(yAxisLeft);
        main.append("g")
            .call(y1AxisLeft);
        main.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(yAxisRight);

        let valueLine0 = d3.line()
            .x(function (d) {
                return x(d.x)
            })
            .y(function (d) { return y0(d.y) })
            .curve(d3.curveCardinal)

        let valueLine1 = d3.line()
            .x(function (d) { return x(d.x) })
            .y(function (d) { return y1(d.y) })
            .curve(d3.curveCardinal)
        let valueLine2 = d3.line()
            .x(function (d) { return x(d.x) })
            .y(function (d) { return y2(d.y) })
            .curve(d3.curveCardinal);


        main.append("path")
            .style('stroke', "orange")
            .style("fill", "none")
            .style("stroke-width", 2)
            .attr("d", valueLine0(newy0Data))


        main.append("path")
            .style("stroke", "red")
            .style("fill", "none")
            .attr("d", valueLine1(newy1Data))
            .style('stroke-width', 2)

        // main.append("path")
        //     .style("stroke", "green")
        //     .style("fill", "none")
        //     .attr("d", valueLine2(newy2Data))
        //     .style('stroke-width', 2)

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