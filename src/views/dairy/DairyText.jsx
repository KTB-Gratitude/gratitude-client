import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPost } from '../FetchApi'; // POST 요청을 보내는 함수

const DiaryText = ({ selectedTemplate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!title || !content) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }

        const diaryData = {
            title,      // 사용자가 입력한 제목
            content,    // 사용자가 입력한 내용
            template: selectedTemplate || 'DEFAULT' // 선택된 템플릿
        };

        try {
            await fetchPost(diaryData, '/api/v1/diaries'); // fetchPost 사용
            alert('일기가 성공적으로 작성되었습니다!');
        } catch (error) {
            console.error('Error writing diary:', error);
            alert('일기 작성에 실패했습니다.');
        }
    };

    return (
        <Container>
            <TitleInput
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                $backgroundImage={getTemplateBackground(selectedTemplate)}
            />
            <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
        </Container>
    );
};

// 템플릿 배경 설정 함수 (선택한 템플릿에 따라 배경을 설정)
const getTemplateBackground = (template) => {
    switch (template) {
        case 'UNDERLINE':
            return 'url(/background/underLine.svg)';
        case 'SMALL_GRID':
            return 'url(/background/smallGrid.svg)';
        case 'LARGE_GRID':
            return 'url(/background/largeGrid.svg)';
        case 'PARCHMENT':
            return 'url(/background/parchment.svg)';
        default:
            return 'url(/background/default.svg)';
    }
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TitleInput = styled.input`
    width: 100%;
    font-size: 24px;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #6c63ff;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
    width: 100%;
    flex: 1;
    font-size: 16px;
    padding: 10px;
    border: 2px solid #6c63ff;
    border-radius: 5px;
    margin-bottom: 20px;
    background-image: ${(props) => props.$backgroundImage};
    background-size: ${(props) => props.$backgroundImage.includes('parchment') ? 'cover' : 'contain'}; /* 양피지 이미지는 커버 처리 */
    background-repeat: ${(props) => props.$backgroundImage.includes('parchment') ? 'no-repeat' : 'repeat'}; /* 양피지는 반복하지 않음 */
    background-position: center;
    resize: none;
    min-height: 300px;
`;

const SubmitButton = styled.button`
    font-size: 18px;
    padding: 10px 20px;
    background-color: #6c63ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default DiaryText;
