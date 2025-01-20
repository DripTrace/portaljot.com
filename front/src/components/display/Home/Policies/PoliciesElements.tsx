import styled from "styled-components";

export const PoliciesContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const Policy = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    font-size: 1em;

    @media screen and (max-width: 768px) {
        font-size: 0.5em;
        flex-direction: column;
    }
`;

export const PolicyGraphic = styled.div`
    height: 100%;
    display: flex;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        height: 70px;
        width: 70px;
        margin-right: 0px;
    }
`;

export const DescriptionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PolicyDescription = styled.p`
    margin-left: 10px;
    text-align: center;

    @media screen and (max-width: 768) {
        margin-left: 0px;
        width: 100%;
    }
`;
