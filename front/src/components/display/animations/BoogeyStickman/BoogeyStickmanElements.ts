import styled from "styled-components";

interface TransitionProps {
    $pointerTransition?: boolean;
}

interface PointerFixProps {
    $pointerFix?: boolean;
}

export const DrawingContainer = styled.div<PointerFixProps>`
    z-index: 2000;
    pointer-events: none;
    transform: translate3d(0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 35px;
    display: block;
`;

export const BSContainer = styled.div<TransitionProps>`
    height: 100%;
    width: 100%;
    margin-top: ${({ $pointerTransition }) =>
        $pointerTransition ? "-11px" : "-35px"};
    margin-left: ${({ $pointerTransition }) =>
        $pointerTransition ? "9px" : "1px"};
    transition: 0.1s linear;
`;

export const BSBody = styled.div`
    display: flex;
    margin-left: 2.6px;
`;

export const BSLayout = styled.div`
    height: 124px;
    width: 21.045px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
    margin-left: -0.9px;
`;

export const TopSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 3px;
    z-index: 4;
`;

export const Hat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: rotate(15deg);
    margin-left: 5.6px;
    margin-bottom: -5px;
    margin-top: 0.8px;
    height: 14.5px;
    width: 20px;
    z-index: 3;
`;

export const HatTop = styled.div`
    background: #40ff00;
    border: black solid 0.05px;
    height: 100%;
    width: 13.3px;
    border-radius: 3px;
    z-index: 1;
    margin-bottom: -4px;
    transform: rotate(2deg);
`;

export const HatBottom = styled.div`
    background: #40ff00;
    border: black solid 0.05px;
    width: 100%;
    height: 5.5px;
    z-index: 3;
`;

export const StickHead = styled.div`
    border: black solid 0.05px;
    background: #127c09;
    border-radius: 50%;
    height: 20px;
    width: 17.7px;
    z-index: 2;
`;

export const BottomSection = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    z-index: 1;
    margin-right: -4px;
`;

export const LeftArm = styled.div<TransitionProps>`
    border-radius: 2.5px;
    z-index: 3;
    border: black solid 0.05px;
    background: #127c09;
    width: 5px;
    height: ${({ $pointerTransition }) =>
        $pointerTransition ? "80.7px" : "37px"};
    margin-top: 43.7px;
    margin-right: ${({ $pointerTransition }) =>
        $pointerTransition ? "-10px" : "-6px"};
    transform: ${({ $pointerTransition }) =>
        $pointerTransition ? "rotate(-7deg) translateY(-70px)" : "none"};
    transition: 0.1s linear;
`;

export const RightArm = styled.div`
    border: black solid 0.05px;
    background: #127c09;
    width: 5px;
    height: 37px;
    border-radius: 2.5px;
    margin-bottom: 30px;
    margin-left: -1px;
    z-index: 0;
`;

export const LeftLeg = styled.div`
    border: black solid 0.05px;
    background: #22cd00;
    width: 4.7px;
    height: 98%;
    border-radius: 2.5px;
    margin-bottom: 3px;
    margin-right: -2px;
    z-index: 2;
`;

export const RightLeg = styled.div`
    border: black solid 0.05px;
    background: #127c09;
    width: 6px;
    height: 102%;
    border-radius: 2.5px;
    margin-bottom: 1.7px;
    margin-left: 0px;
    z-index: 1;
`;
