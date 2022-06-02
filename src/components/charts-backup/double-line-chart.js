import { useEffect, useRef, useState } from "react"
import * as d3 from 'd3'


export const DoubleLineChart = ({ height = 350 }) => {
    let svgRef = useRef(),
        tooltipRef = useRef(),
        width = 800,
        margin = { left: 40, top: 25, right: 40, bottom: 25 };
    // const [data] = useState([
    //     {
    //         "date": "1-May-12",
    //         "close": 58.13,
    //         "open": 3.41,
    //     },
    //     {
    //         "date": "30-Apr-12",
    //         "close": 53.98,
    //         "open": 4.55
    //     },
    //     {
    //         "date": "27-Apr-12",
    //         "close": 67,
    //         "open": 6.78
    //     },
    //     {
    //         "date": "26-Apr-12",
    //         "close": 89.7,
    //         "open": 7.85
    //     },
    //     {
    //         "date": "25-Apr-12",
    //         "close": 99,
    //         "open": 8.92
    //     },
    //     {
    //         "date": "24-Apr-12",
    //         "close": 130.28,
    //         "open": 9.92
    //     },
    //     {
    //         "date": "23-Apr-12",
    //         "close": 166.7,
    //         "open": 10.13
    //     },
    //     {
    //         "date": "20-Apr-12",
    //         "close": 234.98,
    //         "open": 12.23
    //     },
    //     {
    //         "date": "19-Apr-12",
    //         "close": 345.44,
    //         "open": 13.45
    //     },
    //     {
    //         "date": "18-Apr-12",
    //         "close": 443.34,
    //         "open": 16.04
    //     },
    //     {
    //         "date": "17-Apr-12",
    //         "close": 543.7,
    //         "open": 18.03
    //     },
    //     {
    //         "date": "16-Apr-12",
    //         "close": 580.13,
    //         "open": 21.02
    //     },
    //     {
    //         "date": "13-Apr-12",
    //         "close": 605.23,
    //         "open": 22.34
    //     },
    //     {
    //         "date": "12-Apr-12",
    //         "close": 622.77,
    //         "open": 20.15
    //     },
    //     {
    //         "date": "11-Apr-12",
    //         "close": 626.2,
    //         "open": 21.26
    //     },
    //     {
    //         "date": "10-Apr-12",
    //         "close": 628.44,
    //         "open": 31.04
    //     },
    //     {
    //         "date": "9-Apr-12",
    //         "close": 636.23,
    //         "open": 35.04
    //     },
    //     {
    //         "date": "5-Apr-12",
    //         "close": 633.68,
    //         "open": 41.02
    //     },
    //     {
    //         "date": "4-Apr-12",
    //         "close": 624.31,
    //         "open": 43.05
    //     },
    //     {
    //         "date": "3-Apr-12",
    //         "close": 629.32,
    //         "open": 46.03
    //     },
    //     {
    //         "date": "2-Apr-12",
    //         "close": 618.63,
    //         "open": 51.03
    //     },
    //     {
    //         "date": "30-Mar-12",
    //         "close": 599.55,
    //         "open": 53.42
    //     },
    //     {
    //         "date": "29-Mar-12",
    //         "close": 609.86,
    //         "open": 57.82
    //     },
    //     {
    //         "date": "28-Mar-12",
    //         "close": 617.62,
    //         "open": 59.01
    //     },
    //     {
    //         "date": "27-Mar-12",
    //         "close": 614.48,
    //         "open": 56.03
    //     },
    //     {
    //         "date": "26-Mar-12",
    //         "close": 606.98,
    //         "open": 58.01
    //     }
    // ]
    // )
    const [data] = useState({
        series: [
            {
                color: '#FF9800',
                data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
                name: 'Referral'
            },
            {
                color: '#F44336',
                data: [100, 122, 50, 300, 250, 400, 312, 200, 10, 60, 90, 400],
                name: 'Social Media'
            }
        ],
        xaxis: {
            dataPoints: [
                '01 Jan',
                '02 Jan',
                '03 Jan',
                '04 Jan',
                '05 Jan',
                '06 Jan',
                '07 Jan',
                '08 Jan',
                '09 Jan',
                '10 Jan',
                '11 Jan',
                '12 Jan'
            ]
        }
    }
    )


    useEffect(() => {
        d3.select(svgRef.current)
            .selectAll("g")
            .remove();
        let svg = d3.select(svgRef.current),
            main = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                
        let y0Data = data.series.find(item => item.name === "Referral"),
            y1Data = data.series.find(item => item.name === "Social Media");

        let x = d3.scalePoint().domain(data.xaxis.dataPoints).range([0, width]),
            y0 = d3.scaleLinear().domain([0, d3.max(y0Data.data, function (d) { return d })]).range([height, 0]),
            y1 = d3.scaleLinear().domain([0, d3.max(y1Data.data, function (d) { return d })]).range([height, 0]);

        let xAxis = d3.axisBottom(x),
            yAxisLeft = d3.axisLeft(y0).ticks(5),
            yAxisRight = d3.axisRight(y1).ticks(5);

        main.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        main.append("g")
            .call(yAxisLeft);
        main.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(yAxisRight);

        let valueLine1 = d3.line()
            .x(function (d) {
                return x(d.x)
            })
            .y(function (d) { return y0(d.y) })
            .curve(d3.curveCardinal)

        let valueLine2 = d3.line()
            .x(function (d) { return x(d.x) })
            .y(function (d) { return y1(d.y) })
            .curve(d3.curveCardinal)

        let newy0Data = y0Data.data.map((d, i) => {
            return { x: data.xaxis.dataPoints[i], y: d }
        });
        let newy1Data = y1Data.data.map((d, i) => {
            return { x: data.xaxis.dataPoints[i], y: d }
        })

        main.append("path")
            .style('stroke', "orange")
            .style("fill", "none")
            .style("stroke-width", 2)
            .attr("d", valueLine1(newy0Data))


        main.append("path")
            .style("stroke", "red")
            .style("fill", "none")
            .attr("d", valueLine2(newy1Data))
            .style('stroke-width', 2)

        // let newDate = data.map(function (d) {
        //     d.date = formatTime(d.date);//formatTime(new Date(d.date));
        //     d.close = +d.close;
        //     d.open = +d.open;
        // })
        // let newData = data.map(function (d) {
        //     return {
        //         date: formatTime(d.date),
        //         close: d.close,
        //         open: d.open
        //     }
        // })

        // console.log(newData);
        // let x = d3.scaleTime().range([0, width]),
        //     y0 = d3.scaleLinear().range([height, 0]),
        //     y1 = d3.scaleLinear().range([height, 0]);

        // let xAxis = d3.axisBottom(x),
        //     yAxisLeft = d3.axisLeft(y0).ticks(5),
        //     yAxisRight = d3.axisRight(y1).ticks(5);

        // let valueLine = d3.line()
        //     .x(function (d) {
        //         return x(d.date)
        //     })
        //     .y(function (d) { return y0(d.close) })
        //     .curve(d3.curveCardinal)
        // let valueLine2 = d3.line()
        //     .x(function (d) { return x(d.date) })
        //     .y(function (d) { return y1(d.open) })
        //     .curve(d3.curveCardinal)



        // x.domain(d3.extent(newData, function (d) { return d.date }));
        // y0.domain([0, d3.max(newData, function (d) {
        //     return Math.max(d.close);
        // })])
        // y1.domain([0, d3.max(newData, function (d) {
        //     return Math.max(d.open);
        // })])

        // main.append("path")
        //     .style('stroke', "orange")
        //     .style("fill", "none")
        //     .attr("d", valueLine(newData))


        // main.append("path")
        //     .style("stroke", "red")
        //     .style("fill", "none")
        //     .attr("d", valueLine2(newData));

        // main.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(xAxis);

        // main.append("g")
        //     .call(yAxisLeft);
        // main.append("g")
        //     .attr("transform", `translate(${width}, 0)`)
        //     .call(yAxisRight);
        // let tooltip = d3.select(tooltipRef.current);
        // function handleMouseMove(e, d) {
        //     tooltip.style("left", e.pageX + 10 + "px")
        //         .style("top", e.pageY + 10 + "px")
        // }
        // function handleMouseOver(e, d) {
        //     console.log(d)
        //     tooltip
        //         .style("visibility", "visible")
        //         .style("left", e.pageX + 10 + "px")
        //         .style("top", e.pageY + 10 + "px")
        // }
        // function handleMouseOut(e, d) {
        //     tooltip.style("visibility", "hidden")
        // }
    }, [])


    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} style={{
                border: "1px solid grey"
            }} />
            <div ref={tooltipRef} style={{
                width: 100,
                height: 40,
                padding: 8,
                background: 'grey',
                borderRadius: 10,
                position: 'absolute',
                visibility: 'hidden'
            }} />
        </>
    )
}