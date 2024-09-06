import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";

import dairyList from "./mockdata";
import HappyPer from "./dashboard/HappyPer";

function MyLibrary () {    
    const [data, setData] = useState(dairyList);
    const [isLoading, setLoading] = useState(false);
    const navigation = useNavigate();

    const clickDairy = (e) => {
        e.preventDefault();
    }

    // console.log(data.content[0]);

    /* useEffect(() => {
        const url = "";

        fetch(url)
            .then(response => response.json())  // 응답을 JSON으로 파싱
            .then(data => setData(data))        // 파싱된 데이터를 state에 저장
            .catch(error => console.error('Fetching data failed:', error));  // 오류 처리
    }, []); */
    return (
        <div className="grid grid-rows-[auto_1fr] min-h-screen p-10 gap-8">
          {/* 상단 날짜 및 타이틀 영역 */}
          <div className="grid grid-cols-[1fr_auto] items-center">
            <div className="text-xl font-bold text-gray-700">2024년 9월</div>
            <div className="flex items-center">
              <button className="mr-2">&lt;&lt;</button> {/* 이전 달 버튼 */}
              <button className="ml-2">&gt;&gt;</button> {/* 다음 달 버튼 */}
            </div>
          </div>
      
          {/* 메인 컨텐츠 영역 */}
          <div className="grid grid-cols-[1fr_2fr] gap-4 flex-grow">
            {/* 대쉬보드 */}
            {isLoading ? (
                <div className="bg-white shadow-lg rounded-lg p-8">
                <p className="text-xl font-bold text-center mb-4">오늘의 명언~</p>
                <p className="text-center">- 헤르만 헤세</p>
                </div>
            ) :
                /* 감정상태 나타내기 */
                <HappyPer />
            }

      
            {/* 오른쪽 날씨 정보 및 일기 카드 */}
            <div className="grid grid-rows-[auto_1fr] gap-4 shadow-lg pb-5">
              {/* 날씨 카드 */}
              <div
                className="flex items-center bg-white py-2 px-4">
                <Weather />
              </div>
      
              {/* 일기 카드 목록 */}
              <ul className="grid grid-cols-4 gap-4 px-6">
                {dairyList.content.map((item, index) => (
                  <li key={index} className="list-none">
                    <DairyCard data={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );  
}

export default MyLibrary;