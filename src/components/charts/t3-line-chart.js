import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T3LineChart = ({ data, height = 350 }) => {
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

        var parseTime = d3.timeParse("%d-%b-%y");
        let newData = data.map(d => {
            return { ...d, date: parseTime(d.date) }
        })
        console.log(newData)
        let xScale = d3.scaleTime().domain(d3.extent(newData, function (d) {
            return d.date
        })).range([0, width]),
            y0Scale = d3.scaleLinear().domain([0, d3.max(newData, function (d) {
                return d.open;
            })]).range([height, 0]),
            y1Scale = d3.scaleLinear().domain([0, d3.max(newData, function (d) {
                return d.close;
            })]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale),
            y0Axis = d3.axisLeft(y0Scale),
            y1Axis = d3.axisRight(y1Scale);

        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        main.append("g")
            .call(y0Axis);
        main.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(y1Axis)

        let valueLine0 = d3.line()
            .x(function (d) {
                return xScale(d.date)
            })
            .y(function (d) {
                return y0Scale(d.open);
            });
        let valueLine1 = d3.line()
            .x(function (d) {
                return xScale(d.date);
            })
            .y(function (d) {
                return y1Scale(d.close);
            })
        let g = main.append("g");
        g.append("path")
            .data([newData])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2.5)
            .attr("d", valueLine0);
        g.append("path")
            .data([newData])
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2.5)
            .attr("d", valueLine1)
    }, [data.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{

                border: ".5px solid grey",
                boxShadow: "0.1px 0.1px .5px .8px grey",
                borderRadius: 4,
                margin: 20,
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