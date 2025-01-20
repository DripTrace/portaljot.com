import styled from "styled-components";
import { FaBars } from "react-icons/fa";

type IntroductionLinkProps = {
    isActive: boolean;
};

export const IntroductionContainer = styled.nav`
    background: var(--transparent-background-color);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    grid-area: header;
    z-index: 4;
`;

export const IntroductionShell = styled.nav``;

export const LogoShell = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 768px) {
        justify-self: flex-start;
    }
`;

export const GreenHubProductionsLogo = styled.a`
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: var(--hovered-text-color);
        text-shadow: 0 0 5px var(--hovered-text-shadow-color);
    }
`;

export const MenuIcon = styled(FaBars)``;

export const MobileMenu = styled.div`
    display: none;
    justify-self: flex-end;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        margin-bottom: 50px;
        transform: translate(-100%, 60%);
        font-size: 1.5rem;
    }
`;

export const ButtonShell = styled.div`
    flex: 0.1;
    display: flex;
    justify-content: center;
`;

export const SigninButton = styled.button`
    border-radius: 20px;
    border: none;
    height: 40px;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--default-button-background-color);
    cursor: pointer;
    color: var(--default-button-text-color);
    text-shadow: 0 0 5px var(--default-button-text-shadow-color);
    transition: all 0.2s ease-in-out;

    &:hover {
        background: var(--hovered-button-background-color);
        color: var(--hovered-button-text-color);
        text-shadow: 0 0 5px var(--hovered-button-text-shadow-color);
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const ButtonTag = styled.p`
    font-size: 0.8rem;
`;

export const LinkMenu = styled.ul`
    display: flex;
    flex: 0.5;
    align-items: center;
    height: 100%;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const IntroductionLink = styled.li<IntroductionLinkProps>`
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-shadow: 0 0 5px var(--default-text-shadow-color);

    &:hover {
        color: var(--hovered-text-color);
        text-shadow: 0 0 5px var(--hovered-text-shadow-color);
    }

    @keyframes glow {
        0% {
            opacity: 1;
        }

        5% {
            opacity: 0.9;
        }

        10% {
            opacity: 0.8;
        }

        15% {
            opacity: 0.7;
        }

        20% {
            opacity: 0.6;
        }

        25% {
            opacity: 0.5;
        }

        30% {
            opacity: 0.4;
        }

        35% {
            opacity: 0.3;
        }

        40% {
            opacity: 0.2;
        }

        45% {
            opacity: 0.1;
        }

        50% {
            opacity: 0;
        }

        55% {
            opacity: 0.1;
        }

        60% {
            opacity: 0.2;
        }

        65% {
            opacity: 0.3;
        }

        70% {
            opacity: 0.4;
        }

        75% {
            opacity: 0.5;
        }

        80% {
            opacity: 0.6;
        }

        85% {
            opacity: 0.7;
        }

        90% {
            opacity: 0.8;
        }

        95% {
            opacity: 0.9;
        }

        100% {
            opacity: 1;
        }
    }

    border-bottom: ${({ isActive }) =>
        isActive ? "3px solid #40ff00" : "none"};
    animation-name: ${({ isActive }) => (isActive ? "glow" : "none")};
    color: ${({ isActive }) =>
        isActive ? "var(--hovered-text-color)" : "var(--text-color)"};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;

export const LinkItem = styled.p`
    height: 100%;
    align-items: center;
    margin: auto;
    justify-self: center;
    cursor: pointer;
`;
