import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGet, fetchPost } from '../FetchApi';

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";
import dairyList from "./mockdata";
import personalDairy from "./mockdataP";
import HappyPer from "./dashboard/HappyPer";
import RJMD from "./dashboard/RJMD";

function MyLibrary () {
    const [data, setData] = useState(null);
    const [diaryData, setDiaryData] =useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
      const endpoint = "/api/v1/diaries";

      const fetchData = async () => {
        try {
            const response = await fetchGet(endpoint); // id를 사용하여 요청
            setData(response);
            console.log('fetch data: ', response);
        } catch (error) {
            console.error('Failed to fetch diary data:', error);
        }
      };

      fetchData();
  }, []); // id가 변경될 때마다 다시 데이터 요청

    const handlerClickDairy = async (index) => {  
      const diaryId = data.content[index].id;
      console.log("diaryId: ", diaryId);
      try {
        const response = await fetchGet(`/api/v1/diaries/${diaryId}`); // id를 사용하여 요청
        setDiaryData(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch diary data:', error);
      }
      console.log("oncllick 실행 시: ", diaryData);
    }

    const clickCreateDiary = (e) => {
      /* 일기 작성 페이지로 이동 */
    }

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
            ) : (
              <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
                <HappyPer data={data.content[0].happiness} />
                <hr className="my-6 border-t-2 border-purple-500" />
                <RJMD diaryId={data.content[0].id}/>
              </div>
            )}

      
            {/* 오른쪽 날씨 정보 및 일기 카드 */}
            <div className="grid grid-rows-[auto_1fr] gap-4 shadow-lg pb-5">
              {/* 날씨 카드 */}
              <div
                className="flex items-center bg-white py-2 px-4">
                <Weather />
              </div>
      
              {/* 일기 카드 목록 */}
              <ul className="grid grid-cols-4 gap-4 px-6">
              {data && data.content ? (
                data.content.map((item, index) => (
                  <li key={index} className="list-none" onClick={() => handlerClickDairy(index)}>
                    <DairyCard data={item} />
                  </li>
                ))
              ) : (
                <p>데이터를 불러오는 중입니다...</p> // 데이터가 없을 때 표시할 내용
              )}
                <li>
                  <div className="relative flex flex-col h-60 overflow-hidden bg-gray-200 rounded-xl bg-clip-border text-gray-700 shadow-md">
                      <div className="flex justify-center items-center h-full">
                          <p className="block font-sans text-base text-sm antialiased font-normal leading-relaxed text-inherit">
                              일기 작성
                          </p>
                      </div>
                  </div>                                    
                </li>
              </ul>
            </div>
          </div>
        </div>
      );  
}

export default MyLibrary;