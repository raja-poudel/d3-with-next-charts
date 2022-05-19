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
        let newData = data.series.map((d, i) => {
            return {
                ...d, data: d.data.map((d, j) => {
                    return { x: data.xaxis.dataPoints[j], y: d }
                })
            }
        })
        console.log(newData);
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