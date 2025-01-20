import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const HeroContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    z-index: 2;

    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* background: linear-gradient(
                180deg,
                rgba(63, 191, 63, 0.1) 0%,
                 rgba(63, 191, 63, 0.2) 10%,
				rgba(63, 191, 63, 0.3) 20%,
				rgba(63, 191, 63, 0.4) 30%,
				rgba(63, 191, 63, 0.5) 40%,
				rgba(63, 191, 63, 0.6) 50%,
				rgba(63, 191, 63, 0.7) 60%,
				rgba(63, 191, 63, 0.8) 70%,
				rgba(63, 191, 63, 0.9) 80%,
				rgba(63, 191, 63, 1.0) 90%, 
                    rgba(63, 150, 63, 0.2) 100%
            ),
            linear-gradient(180deg, rgba(63, 191, 63, 0.1) 0%, transparent 100%); */
        z-index: 3;
    }
`;

export const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
`;

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeroH1 = styled.h1`
    color: var(--default-text-color);
    font-size: 48px;
    text-align: center;

    @media screen and (max-width: 768px) {
        font-size: 40px;
    }

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`;

export const HeroP = styled.p`
    margin-top: 24px;
    text-align: center;
    color: var(--default-text-color);
    font-size: 24px;
    max-width: 600px;

    @media screen and (max-width: 769px) {
        font-size: 24px;
    }

    @media screen and (max-width: 480px) {
        font-size: 18px;
    }
`;

export const HeroBtnWrapper = styled.div``;

export const ArrowForward = styled(MdArrowForward)``;

export const ArrowRight = styled(MdKeyboardArrowRight)``;
