"use client";

import RussellComponent from "@/components/russell/RussellComponent";
import styled from "styled-components";

const RussellPage = () => {
    return (
        // <RussellWrapper className="size-full relative z-10">
        <RussellComponent />
        // </RussellWrapper>
    );
};

export default RussellPage;

const RussellWrapper = styled.main`
    /* font-size: 2rem;
    font-weight: 800; */
    display: flex;
    justify-items: center;
    align-items: center;
`;
