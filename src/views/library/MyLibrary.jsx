import { useEffect, useState } from "react";

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";
import dairyList from "./mockdata";

function MyLibrary () {    
    const [data, setData] = useState(dairyList);

    // console.log(data.content[0]);

    /* useEffect(() => {
        const url = "";

        fetch(url)
            .then(response => response.json())  // 응답을 JSON으로 파싱
            .then(data => setData(data))        // 파싱된 데이터를 state에 저장
            .catch(error => console.error('Fetching data failed:', error));  // 오류 처리
    }, []); */

    return (
        <>
            <DairyCard data={data.content[0]}/>
        </>
    )
}

export default MyLibrary;