import React, { useState } from 'react';
import styled from 'styled-components';
import { sendDiaryRequest } from '../FetchApi'; // 서버에 요청을 보내는 함수

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
            await sendDiaryRequest(diaryData);
            alert('일기가 성공적으로 작성되었습니다!');
        } catch (error) {
            console.error('Error writing diary:', error);
            alert('일기 작성에 실패했습니다.');
        }
    };

    return (
        <Container>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            />
            <Textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                backgroundImage={getTemplateBackground(selectedTemplate)}
            />
            <button onClick={handleSubmit} style={styles.button}>작성</button>
        </Container>
    );
};

// 템플릿 배경 설정 함수 (선택한 템플릿에 따라 배경을 설정)
const getTemplateBackground = (template) => {
    switch (template) {
        case 'UNDERLINE':
            return 'url(/src/views/dairy/background/underLine.svg)';
        case 'LARGE_GRID':
            return 'url(/src/views/dairy/background/largeGrid.svg)';
        case 'PARCHMENT':
            return 'url(/src/views/dairy/background/parchment.svg)';
        default:
            return 'url(/src/views/dairy/background/default.svg)';
    }
};

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 650px;
    font-size: 16px;
    padding: 10px;
    border: 2px solid #6c63ff;
    border-radius: 5px;
    margin-bottom: 20px;
    background-image: ${(props) => props.backgroundImage};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    resize: none;
`;

const styles = {
    input: {
        width: '100%',
        fontSize: '24px',
        padding: '10px',
        marginBottom: '20px',
        border: '2px solid #6c63ff',
        borderRadius: '5px',
    },
    button: {
        fontSize: '18px',
        padding: '10px 20px',
        backgroundColor: '#6c63ff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default DiaryText;
