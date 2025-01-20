import styled from "styled-components";
import Image from "next/image";

type PlatformContainerProps = {
    lightBg?: boolean;
};

export const PlatformContainer = styled.section<PlatformContainerProps>`
    background: ${({ lightBg }) => (lightBg ? " #76b041" : "#127c09")};
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type InfoRowProps = {
    imgStart?: boolean;
};

export const InfoWrapper = styled.div`
    flex: 1;
    display: grid;
    z-index: 1;
    height: 100%;
    width: 100vw;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
`;

export const InfoRow = styled.div<InfoRowProps>`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({ imgStart }) =>
        imgStart ? `'col2 col1'` : `'col1 col2'`};

    @media screen and (max-width: 768px) {
        grid-template-areas: ${({ imgStart }) =>
            imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`};
    }
`;

export const Column1 = styled.div`
    padding: 0 15px;
    grid-area: col1;
`;

export const Column2 = styled.div`
    padding: 0 15px;
    grid-area: col2;
    height: 100%;
`;

export const TextWrapper = styled.div`
    padding-top: 0;
`;

export const TopLine = styled.p`
    color: #134611;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
`;

type HeadingProps = {
    lightText?: boolean;
};

export const Heading = styled.h1<HeadingProps>`
    font-size: 40px;
    line-height: 2.8rem;
    font-weight: 600;
    color: ${({ lightText }) => (lightText ? "#76b041" : "#127c09")};
    white-space: normal !important;
`;

type SubtitleProps = {
    darkText?: boolean;
};

export const Subtitle = styled.p<SubtitleProps>`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: ${({ darkText }) => (darkText ? "#127c09" : "#8cc540")};
    white-space: normal !important;
`;

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Img = styled(Image)`
    margin: 0 0 10px 0;
    padding-right: 0;
`;
