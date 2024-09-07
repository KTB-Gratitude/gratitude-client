import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchGet, fetchPost} from '../FetchApi';

// project import
import Weather from "./Weather";
import DairyCard from "./DairyCard";
import HappyPer from "./dashboard/HappyPer";
import RJMD from "./dashboard/RJMD";
import DetailPage from '../dairy/DiaryDetail.jsx'; // Import the DetailPage component

function processDataFromBackend(diaryData) {
    const colors = ["#02D19B", "#fd7a9e", "#33bce2", "#fd993e"];

    const parseTypeData = (typeData) => {
        const [type, value, description] = typeData.split("| ");
        const colorR = value > 50 ? [colors[0], "#D9E0E8"] : ["#D9E0E8", colors[0]];
        const colorJ = value > 50 ? [colors[1], "#D9E0E8"] : ["#D9E0E8", colors[1]];
        const colorM = value > 50 ? [colors[2], "#D9E0E8"] : ["#D9E0E8", colors[2]];
        const colorD = value > 50 ? [colors[3], "#D9E0E8"] : ["#D9E0E8", colors[3]];

        return { type, value: Number(value), description, colorR, colorJ, colorM, colorD };
    };

    let R = {
        title: 'R(휴식)',
        type: ['A', 'P'],
        data: [{ value: parseTypeData(diaryData.rType).value, color: parseTypeData(diaryData.rType).colorR[0] }, { value: 100 - parseTypeData(diaryData.rType).value, color: parseTypeData(diaryData.rType).colorR[1] }],
        description: parseTypeData(diaryData.rType).description,
    };

    let J = {
        title: 'J(기쁨)',
        type: ['H', 'S'],
        data: [{ value: parseTypeData(diaryData.jType).value, color: parseTypeData(diaryData.jType).colorJ[0] }, { value: 100 - parseTypeData(diaryData.jType).value, color: parseTypeData(diaryData.jType).colorJ[1] }],
        description: parseTypeData(diaryData.jType).description,
    };

    let M = {
        title: 'M(동기)',
        type:  ['D', 'L'],
        data: [{ value: parseTypeData(diaryData.mType).value, color: parseTypeData(diaryData.mType).colorM[0] }, { value: 100 - parseTypeData(diaryData.mType).value, color: parseTypeData(diaryData.mType).colorM[1] }],
        description: parseTypeData(diaryData.mType).description,
    };

    let D = {
        title: 'D(대처)',
        type: ['C', 'R'],
        data: [{ value: parseTypeData(diaryData.dType).value, color: parseTypeData(diaryData.dType).colorD[0] }, { value: 100 - parseTypeData(diaryData.dType).value, color: parseTypeData(diaryData.dType).colorD[1] }],
        description: parseTypeData(diaryData.dType).description,
    };

    return [R, J, M, D];
}

function MyLibrary() {
    const [data, setData] = useState(null);
    const [diaryData, setDiaryData] = useState(null);
    const [rjmd, setRjmd] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showDiaryDetail, setShowDiaryDetail] = useState(false); // State to control DiaryDetail display
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGet("/api/v1/diaries");
                setData(response);
            } catch (error) {
                console.error('Failed to fetch diary data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (diaryData) {
            const processedData = processDataFromBackend(diaryData);
            setRjmd(processedData);
        }
    }, [diaryData]);

    const handlerClickDairy = async (index) => {
        setSelectedIdx(index);
        const diaryId = data.content[index].id;
        try {
            const response = await fetchGet(`/api/v1/diaries/${diaryId}`);
            setDiaryData(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch diary data:', error);
        }
    };

    const clickCreateDiary = () => {
        navigate('/create');
    };

    const clickLogout = async () => {
        const endpoint = `/api/v1/users/logout`;
        try {
            const response = await fetchPost(null, endpoint);
            console.log("res: ", response)
            if (response.ok) {
                navigate("/");
                localStorage.clear();
            } else {
                alert("로그아웃!");
                navigate("/");
                localStorage.clear();
            }
        } catch (error) {
            console.error('Failed to fetch diary data:', error);
        }
    };

    const handleViewDiary = () => {
        setShowDiaryDetail(true); // Set to true to show DetailPage
    };

    const handleCloseDiaryDetail = () => {
        setShowDiaryDetail(false); // Set to false to return to diary card view
    };

    return (
        <div className="grid grid-rows-[auto_1fr] min-h-screen p-10 gap-8">
            {/* 상단 날짜 및 타이틀 영역 */}
            <div className="grid grid-cols-[1fr_auto] items-center">
                <div className="text-xl font-bold text-gray-500">2024년 9월</div>
                <div className="flex items-center">
                    <button className="mr-2">&lt;&lt;</button> {/* 이전 달 버튼 */}
                    <button className="ml-2 mr-6">&gt;&gt;</button> {/* 다음 달 버튼 */}
                    <button className="ml-2" onClick={clickLogout}>로그아웃</button>
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="grid grid-cols-[1fr_2fr] gap-4 flex-grow">
                {/* 대쉬보드 */}
                {isLoading ? (
                    <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full justify-center">
                        <p className="font-bold text-center mb-4 text-gray-500">오늘의 명언</p>
                        <p className="text-xl text-center font-bold mb-4 text-gray-500">라고 할때 할걸</p>
                        <p className="text-sm text-center text-gray-500">- 익명</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg gap-y-4">
                        <div className="mb-10">
                            <HappyPer data={data.content[selectedIdx]?.happiness} />
                        </div>
                        {rjmd ? (
                            <>
                                <RJMD title={rjmd[0].title} data={rjmd[0].data} type={rjmd[0].type} description={rjmd[0].description} />
                                <RJMD title={rjmd[1].title} data={rjmd[1].data} type={rjmd[1].type} description={rjmd[1].description} />
                                <RJMD title={rjmd[2].title} data={rjmd[2].data} type={rjmd[2].type} description={rjmd[2].description} />
                                <RJMD title={rjmd[3].title} data={rjmd[3].data} type={rjmd[3].type} description={rjmd[3].description} />
                                {/* View Diary Button */}
                                <button onClick={handleViewDiary} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">일기 보기</button>
                            </>
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p>
                        )}
                    </div>
                )}

                {/* 오른쪽 날씨 정보 및 일기 카드 또는 DetailPage */}
                <div className="grid grid-rows-[auto_1fr] gap-4 shadow-lg pb-5 rounded-lg bg-white">
                    {/* 날씨 카드 */}
                    <div className="flex items-center pt-4 px-4">
                        <Weather />
                    </div>

                    {/* 일기 카드 목록 or DetailPage */}
                    {!showDiaryDetail ? (
                        <ul className="grid grid-cols-4 grid-rows-2 gap-4 px-6">
                            {data && data.content ? (
                                data.content.map((item, index) => (
                                    <li key={index} className="list-none cursor-pointer">
                                        <DairyCard data={item} onClick={() => handlerClickDairy(index)} />
                                    </li>
                                ))
                            ) : (
                                <p>데이터를 불러오는 중입니다...</p>
                            )}
                            <li onClick={clickCreateDiary}>
                                <div className="relative flex flex-col h-60 w-44 overflow-hidden bg-gray-200 rounded-xl bg-clip-border text-gray-700 shadow-md cursor-pointer">
                                    <div className="flex justify-center items-center h-full">
                                        <p className="block font-sans text-base text-sm antialiased font-normal leading-relaxed text-inherit">
                                            일기 작성
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <DetailPage diary={diaryData} onClose={handleCloseDiaryDetail} /> // Pass the diary data to DetailPage and onClose function
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyLibrary;
