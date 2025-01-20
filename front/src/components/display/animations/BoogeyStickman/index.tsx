"use client";

import { useRef, useEffect } from "react";
import {
    DrawingContainer,
    BSContainer,
    BSLayout,
    HatTop,
    LeftArm,
    LeftLeg,
    HatBottom,
    StickHead,
    RightArm,
    RightLeg,
    BottomSection,
    TopSection,
    Hat,
    BSBody,
} from "./BoogeyStickmanElements";

interface BoogeyStickmanProps {
    pointerTransition: boolean;
    pointerFix: boolean;
}

const BoogeyStickman: React.FC<BoogeyStickmanProps> = ({
    pointerTransition,
    pointerFix,
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent): void => {
            if (cursorRef.current) {
                cursorRef.current.style.top = `${e.pageY}px`;
                cursorRef.current.style.left = `${e.pageX}px`;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <DrawingContainer ref={cursorRef} $pointerFix={pointerFix}>
            <BSContainer $pointerTransition={pointerTransition}>
                <BSBody>
                    <LeftArm $pointerTransition={pointerTransition} />
                    <BSLayout>
                        <TopSection>
                            <Hat>
                                <HatTop />
                                <HatBottom />
                            </Hat>
                            <StickHead />
                        </TopSection>
                        <BottomSection>
                            <LeftLeg />
                            <RightLeg />
                            <RightArm />
                        </BottomSection>
                    </BSLayout>
                </BSBody>
            </BSContainer>
        </DrawingContainer>
    );
};

export default BoogeyStickman;
