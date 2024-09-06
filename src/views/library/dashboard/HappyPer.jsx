// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
function HappyPer({ data}) {
    const svgRef = useRef(null);
    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();

            const width = 200;
            const height = 200;
            const radius = Math.min(width, height) / 2;
            const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

            const colors = ["#f44336", "#ffeb3b", "rgba(76,175,80,0.8)", "#7455f8"];
            const startAngle = -Math.PI / 1.25;
            const maxEndAngle = Math.PI / 1.25;
            const angleRange = maxEndAngle - startAngle;

            const arc = d3.arc()
                .innerRadius(radius - 35)
                .outerRadius(radius - 20)
                .cornerRadius(15);

            // Background arc
            g.append("path")
                .attr("d", arc({startAngle: startAngle, endAngle: maxEndAngle}))
                .attr("fill", "#f0eefd");

            // Happiness gauge arc
            const happinessPercentage = data / 100; // Assuming data is a percentage
            const happinessEndAngle = startAngle + (angleRange * happinessPercentage);

            g.append("path")
                .attr("d", arc({startAngle: startAngle, endAngle: happinessEndAngle}))
                .attr("fill", d3.interpolateRgb(colors[0], colors[colors.length - 1])(happinessPercentage));

            // Add text in the center
            g.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .text(`${data}%`)
                .style("font-size", "15px")
                .style("fill", "#333");
            g.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "6em")
                .text(`행복지수`)
                .style("font-size", "11px")
                .style("fill", "#333");
        }
    }, [data]);

    return (
        <div className="happy-gauge">
            <svg ref={svgRef} width="200" height="200"></svg>
        </div>
    );
}

export default HappyPer;