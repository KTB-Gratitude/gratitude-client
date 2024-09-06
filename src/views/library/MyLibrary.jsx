import { useEffect, useState } from "react";

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";
import mockdata from "./mockdata";

function MyLibrary () {    
    const [data, setData] = useState(
      JSON.parse(mockdata)
    );

    console.log(mockdata);

    /* useEffect(() => {
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
    console.log(emotionState);

    return (
        <>
            <DairyCard data={data} emotionState={emotionState}/>
        </>
    )
}

export default MyLibrary;