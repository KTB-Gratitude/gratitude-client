import { useEffect, useState } from "react";

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";

function MyLibrary () {    
    const [data, setData] = useState(
        {
            title: "오늘의 일기",
            date: '2024-09-07',
            emotions: 
            [
                {
                    name: "행복함",
                    per: 80,
                    desc: [
                        "따뜻한 햇살과 산책의 기쁨",
                        "설명~"
                    ],
                    color: "#FFCAD4B3"
                },
                {
                    name: "감사",
                    per: 70,
                    desc: [
                        "작은 일에도 감사함을 느낀 하루",
                        "소소한 행복을 느끼며 보낸 시간"
                    ],
                    color: "#B2FFEBB3"
                }
            ],
            rjmd: {
            R: 
            {
                type: "A",
                per: 30,
                desc: "A 설명~~"
            },
            J:
            {
                type: "H",
                per: 40,
                desc: "H 설명~~"
            },
            M:
            {
                type: "D",
                per: 15,
                desc: "D 설명~~"
            },
            D:
            {
                type: "C",
                per: 25,
                desc: "C 설명~~"
            },
            desc: "전체 설명"
            }
        }
    );

    /* useEffect(() => {
        // 서버 URL을 설정합니다. 예시 URL을 사용하니 실제 URL로 교체 필요
        const url = "";

        fetch(url)
            .then(response => response.json())  // 응답을 JSON으로 파싱
            .then(data => setData(data))        // 파싱된 데이터를 state에 저장
            .catch(error => console.error('Fetching data failed:', error));  // 오류 처리
    }, []); */

    const emotionState = {
        R: data.rjmd.R.per >= 50 ? "A" : "P",
        J: data.rjmd.J.per >= 50 ? "H" : "S",
        M: data.rjmd.M.per >= 50 ? "D" : "L",
        D: data.rjmd.D.per >= 50 ? "C" : "R"
    }

    return (
        <>
            <DairyCard data={data} emotionState={emotionState}/>
        </>
    )
}

export default MyLibrary;