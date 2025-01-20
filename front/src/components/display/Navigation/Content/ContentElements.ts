import styled from "styled-components";

export const TitleShell = styled.div`
    display: grid;
    grid-area: Titles;
    width: 100%;
    grid-column-gap: 1rem;
`;

export const Title = styled.a`
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 0.5em;
`;

export const Titles = styled.div`
    grid-row-start: 2;
    margin: auto;
    width: 1.5rem;
`;

export const IconContainer = styled.div`
    display: grid;
    grid-area: Icons;
    width: 100%;
    height: 100%;
    grid-column-gap: 1rem;
`;

export const Icons = styled.a`
    grid-row-start: 1;
    width: 1.5rem;
    margin: auto;
`;

export const Properties = styled.div`
    display: grid;
    grid-template-areas:
        "Icons Icons Icons Icons Icons Icons Icons"
        "Titles Titles Titles Titles Titles Titles Titles";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(7, 1fr);
    height: 100%;
    align-items: center;
    justify-content: center;
    grid-column-gap: 1em;
    width: 100%;
    padding: 0.5rem;
`;

export const ContentContainer = styled.footer`
    background: var(--transparent-background-color);
    overflow: none;
    white-space: nowrap;
    height: 60px;
    width: 100%;
    grid-area: footer;
    display: grid;
    align-items: center;
    justify-content: center;
    justify-items: center;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 1em;
    padding: 0.8rem;
    z-index: 4;
`;

export const ContentRoute = styled.nav``;

export const ButtonProperties = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2rem;
    cursor: pointer;

    &:hover {
        color: var(--hovered-text-color);
        text-shadow: 0 0 5px var(--hovered-text-shadow-color);
    }
`;

export const IconProperties = styled.div`
    grid-row-start: 1;
    width: 1.5rem;
    margin: auto;
    height: 100%;

    @keyframes pulse {
        0% {
            transform: scale(0.95);
        }

        70% {
            transform: scale(1.5);
            opacity: 0.5;
        }

        100% {
            transform: scale(0.95);
            opacity: 0;
        }
    }

    ${ButtonProperties}:hover & {
        transform: scale(1.5);
        transition: all 0.3s ease-in-out;
    }

    ${ButtonProperties} &.active {
        transform: scale(1.5);
    }
`;

export const TitleProperties = styled.div`
    text-align: center;
    justify-content: center;
    font-size: 0.6em;
    letter-spacing: 0.05em;
    opacity: 0;

    ${ButtonProperties}:hover & {
        opacity: 1;
    }

    @media screen and (max-width: 768px) {
        opacity: 1;
    }
`;
