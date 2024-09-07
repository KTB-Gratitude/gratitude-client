import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import { fetchGet, fetchPost } from '../../FetchApi';

function RJMD({ title, data, type, description }) {
    const [error, setError] = useState(null);
    const svgRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (svgRef.current) {
            drawBarGraph(svgRef.current, data);
        }
    }, [data]);

    function drawBarGraph(svgElement, data) {
        const parentWidth = svgElement.parentElement.clientWidth;
        console.log(parentWidth);

        d3.select(svgElement).selectAll("*").remove();

        const svg = d3.select(svgElement)
            .attr("width", parentWidth)
            .attr("height", 13);

        const width = parentWidth;
        const height = +svg.attr("height");
        const totalValue = d3.sum(data.map(d => d.value));

        const xScale = d3.scaleLinear()
            .domain([0, totalValue])
            .range([0, width]);

        const cornerRadius = 6;

        // 배경 막대 추가
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", height)
            .attr("fill", "#D9E0E8")
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .transition()
            .duration(700)
            .attr("width", width);

        // 클리핑 패스 추가
        const clip = svg.append("defs")
            .append("clipPath")
            .attr("id", "round-corners")
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius);

        // 실제 데이터 막대를 그릴 그룹 생성
        const barsGroup = svg.append("g")
            .attr("clip-path", "url(#round-corners)");

        let offset = 0;

        // 실제 데이터 막대 추가
        const bars = barsGroup.selectAll("g.bar-group")
            .data(data)
            .enter().append("g")
            .attr("class", "bar-group");

        bars.append("rect")
            .attr("class", "data-bar")
            .attr("x", d => {
                const currentOffset = offset;
                offset += xScale(d.value);
                return currentOffset;
            })
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", height)
            .attr("fill", d => d.color)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 300)
            .attr("width", d => xScale(d.value));

        offset = 0;  // offset을 리셋

        bars.append("text")
            .attr("x", d => {
                const currentOffset = offset;
                offset += xScale(d.value);
                return currentOffset;
            })
            .attr("y", height / 2)
            .style("font-size", "9px")
            .style("font-weight", "bold")
            .attr("fill", "#eeeeee")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value === 0 ? ' ' : d.value)
            .attr("opacity", 0)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 300)
            .attr("opacity", 1)
            .attr("x", (d, i) => {
                const currentOffset = i === 0 ? 0 : d3.sum(data.slice(0, i).map(d => xScale(d.value)));
                return currentOffset + xScale(d.value) / 2;
                });

    }

    return (
        <div className="mb-2">
            <div
                className="flex items-center cursor-pointer gap-x-2"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="font-semibold text-sm text-center">{title}</div>
                <div className="text-center text-gray-500">{type && type.length > 0 ? type[0] : 'N/A'}</div>
                <div className="flex-grow">
                    <svg ref={svgRef}></svg>
                </div>
                <div className="text-center text-gray-500">{type && type.length > 0 ? type[1] : 'N/A'}</div>
            </div>
            {isExpanded && (
                <div className="mt-2 p-2 w-96 bg-gray-100 rounded text-sm"
                     style={{
                        wordWrap: 'break-word',  // 텍스트가 너무 길 경우 자동 줄바꿈
                        overflow: 'hidden',
                     }}
                >
                    {description}
                </div>
            )}
        </div>
    );
}

export default RJMD;