import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams를 가져와서 URL 파라미터 사용
import DiaryDetail from './DiaryDetail';
import { fetchGet } from '../FetchApi'; // GET 요청을 가져오는 함수

const DetailPage = () => {
    const { id } = useParams(); // URL 파라미터로부터 id 추출
    const [diary, setDiary] = useState(null);

    useEffect(() => {
        // 서버에서 일기 데이터를 가져오는 함수
        const fetchDiaryData = async () => {
            try {
                const response = await fetchGet(`/api/v1/diaries/${id}`); // id를 사용하여 요청
                setDiary(response);
            } catch (error) {
                console.error('Failed to fetch diary data:', error);
            }
        };

        fetchDiaryData();
    }, [id]); // id가 변경될 때마다 다시 데이터 요청

    return (
        <div>
            <DiaryDetail diary={diary} />
        </div>
    );
};

export default DetailPage;
