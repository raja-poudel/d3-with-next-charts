import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const D3Test = () => {
    let svgContainer = useRef();
    let [data] = useState([
        { label: 'a', value: 5 },
        { label: 'b', value: 6 },
        { label: 'c', value: 4.5 },
        { label: 'd', value: 6.5 },
        { label: 'e', value: 7.2 }
    ])
    useEffect(() => {
        let w = 200,
            h = 200,
            r = 100;
         d3.select(svgContainer.current).select("svg").remove();
         let svg =d3.select(svgContainer.current).append("svg")
            .attr("width", 200)
            .attr("height", 200)
            .attr("overflow", "visible")
            .style("border", "1px solid black")
        svg.append("rect")
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "orange")
        svg.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", 100)
        .attr("y", 190)
    }, [data]);
    return (
        <div ref={svgContainer}>
            <svg></svg>
        </div>
    )
}