import React, { useState } from 'react';
import DiaryText from './DairyText.jsx';
import Template from './Template';
import styled from 'styled-components';

const Layout = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('DEFAULT');

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <LayoutContainer>
            {/* 왼쪽 템플릿 선택 영역 */}
            <TemplateSection>
                <Template onSelectTemplate={handleTemplateSelect} />
            </TemplateSection>

            {/* 오른쪽 작성 페이지 */}
            <WriteSection>
                <DiaryText selectedTemplate={selectedTemplate} />
            </WriteSection>
        </LayoutContainer>
    );
};

const LayoutContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f3f3f3;
`;

// 템플릿과 작성 페이지의 비율 3:7
const TemplateSection = styled.div`
    flex: 3;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WriteSection = styled.div`
    flex: 7;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Layout;
