import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import { fetchGet, fetchPost } from '../../FetchApi';

// project import


function RJMD({ diaryId }) {
    const [diaryData, setDiaryData] = useState(null);
    const token = localStorage.getItem('accessToken');
    const endpoint = `/api/v1/diaries/${diaryId}`;
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const title = "J (기쁨)";
    const data = [{value: 40, color: "#D9E0E8"}, {value: 60, color: "#fd7a9e"}];
    const type = ['H', 'S'];
    const description = "평온형은 휴식과 재충전의 중요성을 이해하며, 일상에서 여유를 찾아냅니다. 스트레스와 부담을 피하고, 평온한 환경에서 안정감을 찾아냅니다. 평온형은 일과 삶의 균형을 유지하며, 재충전의 시간을 통해 내면의 평온함을 유지하고 스트레스를 해소합니다. 이 유형은 여유로운 시간을 통해 자신의 감정과 생각을 정리하며, 안정된 상태에서 삶의 목표와 꿈을 추구합니다.";
    const svgRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    /* useEffect(() => {
        const fetchData = async () => {
            try {
              // GET 요청 보내기
              const responseData = await fetchGet(endpoint);
              setDiaryData(responseData); // 받아온 데이터를 상태에 저장
            } catch (err) {
              console.error('Error during GET request:', err);
              setError(err.message); // 에러 메시지 설정
            } finally {
              setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, []); */

    useEffect(() => {
        if (svgRef.current) {
            drawBarGraph(svgRef.current, data);
        }
    }, [data]);

    function drawBarGraph(svgElement, data) {
        d3.select(svgElement).selectAll("*").remove();
        const svg = d3.select(svgElement)
            .attr("width", 220)
            .attr("height", 13);

        const width = +svg.attr("width");
        const height = +svg.attr("height");
        const xScale = d3.scaleLinear()
            .domain([0, d3.sum(data.map(d => d.value))])
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
                className="flex items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="w-24 font-semibold">{title}</div>
                <div className="w-8 text-center">{type[0]}</div>
                <div className="flex-grow">
                    <svg ref={svgRef}></svg>
                </div>
                <div className="w-8 text-center">{type[1]}</div>
            </div>
            {isExpanded && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                    {description}
                </div>
            )}
        </div>
    );
}

export default RJMD;