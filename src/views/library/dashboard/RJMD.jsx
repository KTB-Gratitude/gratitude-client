import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

// project import

function RJMD({ diaryId }) {
    const [diaryData, setDiaryData] = useState(null);
    const token = localStorage.getItem('accessToken');
    const endpoint = `/api/v1/diaries/${diaryId}`;
    const title = "J (기쁨)";
    const data = [{value: 40, color: "#D9E0E8"}, {value: 60, color: "#fd7a9e"}];
    const type = ['H', 'S'];
    const description = "평온형은 휴식과 재충전의 중요성을 이해하며, 일상에서 여유를 찾아냅니다. 스트레스와 부담을 피하고, 평온한 환경에서 안정감을 찾아냅니다. 평온형은 일과 삶의 균형을 유지하며, 재충전의 시간을 통해 내면의 평온함을 유지하고 스트레스를 해소합니다. 이 유형은 여유로운 시간을 통해 자신의 감정과 생각을 정리하며, 안정된 상태에서 삶의 목표와 꿈을 추구합니다.";
    const svgRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    /* useEffect(() => {
        try {
            let response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            // 401 Unauthorized 응답 처리
            if (response.status === 401) {
                const responseData = await response.json();
    
                // 서버에서 ACCESS_TOKEN_EXPIRED Enum의 코드가 detailCode 4013일 경우에만 재발급 시도
                if (responseData.detailCode === 4013) {
                    const newToken = await refreshToken();
    
                    // 새로 발급받은 토큰으로 다시 요청
                    response = await fetch(`${API_BASE_URL}${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${newToken}`,
                        },
                        body: JSON.stringify(data),
                    });
                }
            }
    
            // 응답이 정상적인 경우
            if (response.ok) {
                const responseText = await response.text();
                if (responseText) {
                    return JSON.parse(responseText);
                } else {
                    return { message: 'Request successful with no content' };
                }
            }
    
            throw new Error('Failed to send data');
        } catch (error) {
            console.error('Error during POST request:', error);
            throw error;
        }
    }) */

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