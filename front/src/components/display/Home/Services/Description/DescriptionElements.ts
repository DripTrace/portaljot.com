import styled from "styled-components";
import Image from "next/image";

// Define the props interface for the styled components
interface MediaCardProps {
    photoGrown?: boolean;
    videoGrown?: boolean;
    audioGrown?: boolean;
}

export const DescriptionContainer = styled.section`
    background: #0c260c;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;

    @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;

export const DescriptionWrapper = styled.div`
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    grid-gap: 15px;
    position: relative;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        position: absolute;
        bottom: 0;
        padding: 10px;
    }
`;

export const DescriptionH1 = styled.h1`
    font-size: 2rem;
    color: #76b041;
    position: absolute;
    z-index: 19;
    top: 0;
`;

export const DescriptionH2 = styled.h2`
    font-size: 1rem;
    margin: auto;
`;

export const DescriptionP = styled.p`
    font-size: 1rem;
    text-align: center;
    white-space: normal !important;
`;

// Apply the props type to PhotoCard, VideoCard, and AudioCard
export const PhotoCard = styled.div<MediaCardProps>`
    width: 100%;
    height: ${({ photoGrown }) => (photoGrown ? "80vh" : "40vh")};
    max-width: 500px;
    background: #7bc950;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(63, 191, 63, 0.1);
    transition: all 0.2s ease-in-out;
    z-index: ${({ photoGrown }) => (photoGrown ? "20" : "0")};

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        height: ${({ photoGrown }) => (photoGrown ? "83vh" : "22vh")};
        position: ${({ photoGrown }) => (photoGrown ? "absolute" : "static")};
        object-fit: ${({ photoGrown }) => (photoGrown ? "cover" : "none")};
        transform: ${({ photoGrown }) =>
            photoGrown ? "translateY(-18vh)" : "none"};
        width: ${({ photoGrown }) => (photoGrown ? "95%" : "100%")};
        padding: 5px;
    }
`;

export const VideoCard = styled.div<MediaCardProps>`
    width: 100%;
    height: ${({ videoGrown }) => (videoGrown ? "80vh" : "40vh")};
    max-width: 500px;
    background: #7bc950;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(63, 191, 63, 0.1);
    transition: all 0.2s ease-in-out;
    z-index: ${({ videoGrown }) => (videoGrown ? "20" : "0")};

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        height: ${({ videoGrown }) => (videoGrown ? "83vh" : "22vh")};
        position: ${({ videoGrown }) => (videoGrown ? "absolute" : "static")};
        object-fit: ${({ videoGrown }) => (videoGrown ? "cover" : "none")};
        transform: ${({ videoGrown }) =>
            videoGrown ? "translateY(-18vh)" : "none"};
        width: ${({ videoGrown }) => (videoGrown ? "95%" : "100%")};
        padding: 2px;
    }
`;

export const AudioCard = styled.div<MediaCardProps>`
    width: 100%;
    height: ${({ audioGrown }) => (audioGrown ? "80vh" : "40vh")};
    max-width: 500px;
    background: #7bc950;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(63, 191, 63, 0.1);
    transition: all 0.2s ease-in-out;
    z-index: ${({ audioGrown }) => (audioGrown ? "20" : "0")};

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        height: ${({ audioGrown }) => (audioGrown ? "83vh" : "22vh")};
        position: ${({ audioGrown }) => (audioGrown ? "absolute" : "static")};
        object-fit: ${({ audioGrown }) => (audioGrown ? "cover" : "none")};
        transform: ${({ audioGrown }) =>
            audioGrown ? "translateY(-18vh)" : "none"};
        width: ${({ audioGrown }) => (audioGrown ? "95%" : "100%")};
        padding: 2px;
    }
`;

export const PhotographyPricing = styled.p`
    font-size: 1rem;
`;

export const PhotographyPricingDescription = styled.p`
    font-size: 1rem;
    white-space: normal;
    margin: auto;
    text-align: center;
`;

export const VideographyPricing = styled.p`
    font-size: 1rem;
`;

export const VideographyPricingDescription = styled.p`
    font-size: 1rem;
    white-space: normal;
    margin: auto;
    text-align: center;
`;

export const RecordingPricing = styled.p`
    font-size: 1rem;
`;

export const RecordingPricingDescription = styled.p`
    font-size: 1em;
    white-space: normal;
    margin: auto;
    text-align: center;
`;

export const DescriptionIcon = styled(Image)``;
