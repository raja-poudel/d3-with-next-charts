import { useEffect, useRef } from "react"
import * as d3 from 'd3';

export const T7LineChart = ({ series, options, height = 350 }) => {
    let svgRef = useRef(),
        toolRef = useRef(),
        width = 760,
        margin = { left: 60, top: 30, right: 60, bottom: 30 };
    console.log(series)
    console.log(options);
    useEffect(() => {
        d3.select(svgRef.current)
            .select("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`),
            tooltip = d3.select(toolRef.current);

        let xScale = d3.scalePoint().domain(options.categories).range([0, width]),
            yLeftScale = d3.scaleLinear().domain([0, d3.max(series[0].data, function (d) {
                return d
            })]).range([height, 0]),
            yRightScale = d3.scaleLinear().domain([0, d3.max(series[1].data, function (d) {
                return d
            })]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale),
            yLeftAxis = d3.axisLeft(yLeftScale).ticks(5),
            yRightAxis = d3.axisRight(yRightScale).ticks(5);
        let valueLineLeft = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yLeftScale(d.y);
            })
            .curve(d3.curveCatmullRom)
            ,
            valueLineRight = d3.line()
                .x(function (d) {
                    return xScale(d.x)
                })
                .y(function (d) {
                    return yRightScale(d.y);
                })
                .curve(d3.curveCatmullRom);
        main.append("g")
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);
        main.append("g")
            .call(yLeftAxis);
        main.append("g")
            .attr('transform', `translate(${width}, 0)`)
            .call(yRightAxis);

        let formattedData = series.map((d) => {
            return {
                ...d, data: d.data.map((d2, i) => {
                    return { x: options.categories[i], y: d2 }
                })
            }
        });

        let g = main.append("g")
            .selectAll("g")
            .data(formattedData)
            .enter()
            .append("g");


        g.each((d, i, nodes) => {
            console.log(d);
            let element = nodes[i];

            let lineGroup = d3.select(element)
                .append('g')
                .data([d.data]);

            lineGroup
                .append("path")
                .attr("fill", "none")
                .attr("stroke", options.colors[i])
                .attr("stroke-width", 3)
                .style("stroke-dasharray", function (d) {
                    if (i) {
                        return ("3, 3")
                    }
                })
                .attr("d", function (d) {
                    if (i === 0) {
                        return valueLineLeft(d);
                    }
                    return valueLineRight(d);
                });
            let circleGroup = lineGroup
                .selectAll('circle')
                .data(d.data)
                .enter()

            circleGroup
                .append("circle")
                .attr("fill", "white")
                .attr("cx", function (d) {
                    return xScale(d.x);
                })
                .attr("cy", function (d) {
                    if (i === 0) {
                        return yLeftScale(d.y);
                    }
                    return yRightScale(d.y);
                })
                .attr("r", 5.5)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);
            function handleMouseOver(e, d) {
                tooltip
                    .style("visibility", 'visible')
                    .style("left", e.pageX + 10 + "px")
                    .style("top", e.pageY + 10 + "px")
                    .text(`X: ${d.x}. Y: ${d.y}`)


            }
            function handleMouseOut(e, d) {
                tooltip
                    .style("visibility", "hidden");
            }

            circleGroup
                .append("circle")
                .attr("fill", options.colors[i])
                .attr("cx", function (d) {
                    return xScale(d.x);
                })
                .attr("cy", function (d) {
                    if (i === 0) {
                        return yLeftScale(d.y);
                    }
                    return yRightScale(d.y);
                })
                .attr("r", 4)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);


        })

    }, [series.length]);
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{
                border: ".5px solid grey",
                boxShadow: "0.1px 0.1px 15px .8px grey",
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
                    position: 'absolute',
                    backgroundColor: 'lightgray',
                    borderRadius: 10
                }}
            />
        </>
    )
}