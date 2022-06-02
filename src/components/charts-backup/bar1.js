import { useEffect, useRef } from "react";
import * as d3 from 'd3';

const data = {
    series: [
        {
            color: '#7783DB',
            category: 'Email',
            data: 37530
        },
        {
            color: '#7BC67E',
            category: 'GDN',
            data: 52717
        },
        {
            color: '#FFB547',
            category: 'Instagram',
            data: 62935
        },
        {
            color: '#F06191',
            category: 'Facebook',
            data: 90590
        },
        {
            color: '#64B6F7',
            category: 'Google Ads Search',
            data: 13219
        }
    ]
};
export const Bar1 = ({ height = 350 }) => {
    let svgRef = useRef(),
        tooltipRef = useRef();
    let chartOptions = {
        colors: data.series.map(item => item.color),
        categories: data.series.map(item => item.category)
    }
    let chartSeries =
    {
        data: data.series.map((item) => item.data),
        name: "Sales"
    };
    let width = 800,
        margin = { left: 60, top: 20, right: 60, bottom: 20 }
    console.log(chartOptions)
    console.log(chartSeries);
    useEffect(() => {
        d3.select(svgRef.current)
            .selectAll("g")
            .remove();
        let svg = d3.select(svgRef.current);

        let xScale = d3.scaleBand().domain(chartOptions.categories).range([0, width]).padding(.4)
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height})`)
            .call(d3.axisBottom(xScale))
        let yScale = d3.scaleLinear().domain([0, d3.max(chartSeries.data)]).range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale))
        let newData = chartSeries.data.map((d, i) => {
            return { label: chartOptions.categories[i], value: d }
        })
        let tooltip = d3.select(tooltipRef.current);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .selectAll("rect")
            .data(newData)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.label) })
            .attr("y", function (d) { return yScale(d.value) })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.value) })
            .attr("fill", function (d, i) {
                return chartOptions.colors[i]
            })
            .attr("opacity", .7)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(e, d) {
            d3.select(this)
                .attr("opacity", 1);
            tooltip.style("visibility", "visible")
                .style("left", e.pageX + "px")
                .style("top", e.pageY + "px")
                .html(`<span>Info</span><hr /><span>X: ${d.label}</span><br /><span>Y: ${d.value}</span>`)
        }
        function handleMouseOut(e, d) {
            d3.select(this).attr("opacity", .7)
            tooltip.style("visibility", "hidden")
        }

    }, []);
    return (
        <div>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} />
            <div ref={tooltipRef} style={{
                width: 100,
                height: 80,
                backgroundColor: "#ccc",
                borderRadius: 10,
                visibility: 'hidden',
                position: 'absolute',
                padding: 4,
                fontSize: 12
            }} />
        </div>
    )
}