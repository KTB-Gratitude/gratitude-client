import React from 'react';
import styled from 'styled-components';

const DetailPage = ({ diary, onClose }) => {
    if (!diary) return <p>Loading...</p>;

    const { title, content, userDto, template, createdAt } = diary;

    return (
        <DetailContainer>
            {/* Close Button */}
            <CloseButton onClick={onClose}>×</CloseButton>

            <RightContent>
                <Title>{title}</Title>
                <MetaInfo>
                    <span>작성자: {userDto.nickname} ({userDto.loginId})</span>
                    <span>작성일: {new Date(createdAt).toLocaleDateString()}</span>
                </MetaInfo>
                <Content>{content}</Content>
            </RightContent>
        </DetailContainer>
    );
};

// Styled components
const DetailContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh; /* Fill the height of the viewport */
    padding: 20px;
    background-color: #f3f3f3;
    border-radius: 15px;
`;

const RightContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden; /* Ensures content stays within the bounds */
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #6c63ff;
    &:hover {
        color: #333;
    }
`;

const Title = styled.h1`
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
`;

const MetaInfo = styled.div`
    font-size: 1rem;
    color: #666;
    margin-bottom: 25px;
    span {
        display: block;
        margin-bottom: 5px;
    }
`;

const Content = styled.p`
    flex: 1; /* Allow the content to fill remaining space */
    font-size: 1.15rem;
    line-height: 1.8;
    color: #333;
    padding: 20px;
    white-space: pre-wrap; /* Preserve line breaks */
    overflow-y: auto; /* Add scroll for overflow content */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export default DetailPage;
