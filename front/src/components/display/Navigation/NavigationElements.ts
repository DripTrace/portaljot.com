import styled from "styled-components";

export const NavigationContainer = styled.div`
    background: var(--default-background-color);
    color: var(--default-text-color);
    text-shadow: 0 0 5px var(--default-text-shadow-color);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header" "main" "footer";
    z-index: 1000;
    z-index: 3;
`;
