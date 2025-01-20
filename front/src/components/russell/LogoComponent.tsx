import styled from "styled-components";
import { DarkTheme } from "./GlobalStyle";

interface LogoProps {
    color: "dark" | "light";
}

const Logo = styled.h1<LogoProps>`
    display: inline-block;
    color: ${(props) =>
        props.color === "dark" ? DarkTheme.text : DarkTheme.body};
    font-family: "Pacifico", cursive;

    position: fixed;
    left: 2rem;
    top: 2rem;
    z-index: 3;
`;

interface LogoComponentProps {
    theme: "dark" | "light";
}

const LogoComponent: React.FC<LogoComponentProps> = ({ theme }) => {
    return <Logo color={theme}>RP</Logo>;
};

export default LogoComponent;
