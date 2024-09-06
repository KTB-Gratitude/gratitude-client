import React, { useState } from 'react';
import styled from 'styled-components';

// 템플릿 SVG 목록
const svgList = [
    { src: '/background/default.svg', value: 'DEFAULT', label: '기본 템플릿' },
    { src: '/background/underLine.svg', value: 'UNDERLINE', label: '밑줄 템플릿' },
    { src: '/background/largeGrid.svg', value: 'LARGE_GRID', label: '큰 격자 템플릿' },
    { src: '/background/smallGrid.svg', value: 'SMALL_GRID', label: '작은 격자 템플릿' },
    { src: '/background/parchment.svg', value: 'PARCHMENT', label: '양피지 템플릿' },
];

// 스타일 정의
const Container = styled.div`
  background-color: #fff;
  color: #6c63ff;
  padding: 40px 20px 20px;  /* 위쪽 padding을 더 크게 주기 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
`;

const Title = styled.h3`
  font-size: 28px;  /* 글자 크기를 키우기 */
  font-weight: bold;  /* 글자 두께를 두껍게 */
  margin-bottom: 30px;  /* 제목과 그리드 사이에 충분한 공간을 주기 */
  text-transform: uppercase;  /* 텍스트를 대문자로 */
  letter-spacing: 1.5px;  /* 글자 간격을 약간 늘려서 제목 강조 */
`;

const SvgGrid = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  flex-wrap: wrap;
`;

const SvgCard = styled.div`
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? '3px solid #6c63ff' : '1px solid #ccc')};
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 3px solid #6c63ff;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: fill;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #6c63ff;
  }
`;

const Template = ({ onSelectTemplate }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('DEFAULT');

    const handleTemplateChange = (templateValue) => {
        setSelectedTemplate(templateValue);
        onSelectTemplate(templateValue); // 선택된 템플릿을 부모 컴포넌트에 전달
    };

    return (
        <Container>
            <Title>템플릿 선택</Title> {/* 스타일이 적용된 제목 컴포넌트 사용 */}
            <SvgGrid>
                {svgList.map((svg) => (
                    <SvgCard
                        key={svg.value}
                        onClick={() => handleTemplateChange(svg.value)}
                        $isSelected={selectedTemplate === svg.value}
                    >
                        <img src={svg.src} alt={svg.label} />
                        <p>{svg.label}</p>
                    </SvgCard>
                ))}
            </SvgGrid>
        </Container>
    );
};

export default Template;