import React from 'react';
import styled from 'styled-components';

// 템플릿 SVG 목록
const svgList = [
    { src: '/background/default.svg', value: 'DEFAULT', label: '기본 템플릿' },
    { src: '/background//underLine.svg', value: 'UNDERLINE', label: '밑줄 템플릿' },
    { src: '/background/largeGrid.svg', value: 'LARGE_GRID', label: '큰 격자 템플릿' },
    { src: '/background/smallGrid.svg', value: 'SMALL_GRID', label: '작은 격자 템플릿' },
    { src: '/background/parchment.svg', value: 'PARCHMENT', label: '양피지 템플릿' }
];

const DetailPage = ({ diary }) => {
    if (!diary) return <p>Loading...</p>;

    const { title, content, userDto, template, createdAt } = diary;

    // template에 따른 배경 이미지 가져오기
    const backgroundImage = svgList.find(item => item.value === template)?.src || svgList[0].src;

    return (
        <DetailContainer>
            {/* 오른쪽 파트 */}
            <RightContent>
                <Title>{title}</Title>
                <MetaInfo>
                    <span>작성자: {userDto.nickname} ({userDto.loginId})</span>
                    <span>작성일: {new Date(createdAt).toLocaleDateString()}</span>
                </MetaInfo>
                {/* 템플릿 배경 적용된 본문 */}
                <Content backgroundImage={backgroundImage}>{content}</Content>
            </RightContent>
        </DetailContainer>
    );
};

// 외곽에 보라색 라인 추가 및 기본 레이아웃
const DetailContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    border: 2px solid #6c63ff; /* 보라색 외곽선 얇게 */
    border-radius: 15px; /* 모서리 둥글게 */
    box-sizing: border-box;
    padding: 20px;
    background-color: #f3f3f3; /* 배경색 추가 */
`;

// 오른쪽 콘텐츠 부분 (7할)
const RightContent = styled.div`
    flex: 7;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0.8); /* 반투명 흰색 배경 */
    border-radius: 10px; /* 모서리 둥글게 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
`;

// 제목 스타일
const Title = styled.h1`
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
`;

// 메타 정보 스타일 (작성자, 작성일)
const MetaInfo = styled.div`
    font-size: 1rem;
    color: #666;
    margin-bottom: 25px;
    span {
        display: block;
        margin-bottom: 5px;
    }
`;

// 내용 스타일 (본문) - 템플릿 배경이 이 부분에만 적용됨
const Content = styled.p`
    flex: 1;
    font-size: 1.15rem;
    line-height: 1.8;
    color: #333;
    padding: 20px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover; /* 텍스트 박스 크기에 맞게 배경 크기 조정 */
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    white-space: pre-wrap; /* 개행을 유지 */
    overflow-y: auto; /* 내용이 길면 스크롤 */
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); /* 약간의 내부 그림자 */
`;

export default DetailPage;
