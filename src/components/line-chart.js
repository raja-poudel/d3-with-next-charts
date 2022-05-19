import { useEffect, useRef } from "react"
import * as d3 from 'd3';
export const LineChart = ({ data, height = 350 }) => {
    const svgContainer = useRef();
    let width = 800;
    console.log(data);
    async function drawLineChart() {
        let width = 600,
            height = 300,
            margin = { left: 80, top: 40, right: 80, bottom: 40 };
        d3.select(svgContainer.current)
            .select('g')
            .remove()
        let svg = d3.select(svgContainer.current);
        let g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
        let xScale = d3.scaleTime().range([0, width]);
        let yScale = d3.scaleLinear().range([height, 0])
        // let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        // var parseTime = d3.timeParse("%d-%b-%y");
        let parseTime = d3.timeParse("%Y-%m-%d");

        // data.forEach((d) => {
        //     // console.log(d.date)
        //     d.date = parseTime(d.date);
        //     d.value = +d.value;
        // });
        // console.log(data);
        const newData = data.map(function (d) {
            return {
                date: parseTime(d.date),
                value: d.value
            }
        });
        console.log(newData);
        xScale.domain(d3.extent(newData, d => d.date));
        yScale.domain([0, d3.max(newData, d => d.value)]);

        g.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
        g.append("g")
            .call(d3.axisLeft(yScale))
        let valueLine = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value))
        g.append("path")
            .data([newData])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", valueLine);
    }


    useEffect(() => {
        drawLineChart();
    }, [data.length]);
    return (
        <svg ref={svgContainer} viewBox={`0 0 ${width} ${height}`}>
            <g></g>
        </svg>
    )
}