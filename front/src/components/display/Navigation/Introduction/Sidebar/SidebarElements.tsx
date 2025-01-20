import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import SidebarLinkWrapper from "./SidebarLinkWrapper";

type SidebarContainerProps = {
    isOpen: boolean;
};

export const SidebarContainer = styled.aside<SidebarContainerProps>`
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: var(--default-background-color);
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.5s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? "100%" : 0)};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const MobileClose = styled.div`
    position: absolute;
    top: 3rem;
    right: 3rem;
    background: transparent;
    font-size: 1.7rem;
    outline: none;
`;

export const CloseIcon = styled(FaTimes)`
    color: var(--default-text-color);
    cursor: pointer;
`;

export const SidebarWrapper = styled.div`
    color: var(--default-text-color);
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const SidebarMenu = styled.ul`
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;

    @media screen and (max-width: 768px) {
        grid-template-rows: repeat(6, 60px);
    }
`;

export const SidebarLink = styled(SidebarLinkWrapper)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: var(--default-text-color);
    cursor: pointer;

    &:hover {
        color: var(--hovered-text-color);
        transition: 0.2s ease-in-out;
        text-shadow: 0 0 5px var(--hovered-text-shadow-color);
    }
`;

export const SidebarItem = styled.p``;

export const SideBtnWrap = styled.nav`
    display: flex;
    justify-content: center;
`;

export const SidebarRoute = styled.a`
    border-radius: 50px;
    background: var(--default-button-background-color);
    border: solid 2px;
    border-color: var(--default-button-border-color);
    white-space: nowrap;
    padding: 16px 64px;
    color: var(--default-button-text-color);
    font-size: 16px;
    outline: none;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: var(--hovered-button-background-color);
        color: var(--hovered-button-text-color);
    }
`;
