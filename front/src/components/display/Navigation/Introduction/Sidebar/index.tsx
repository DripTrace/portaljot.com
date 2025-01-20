"use client";

import Link from "next/link";
import {
    CloseIcon,
    MobileClose,
    SidebarContainer,
    SidebarItem,
    SidebarLink,
    SidebarMenu,
    SidebarRoute,
    SidebarWrapper,
    SideBtnWrap,
} from "./SidebarElements";
import { sidebarItems } from "../index.data";

type SidebarProps = {
    isOpen: boolean;
    toggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
    return (
        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <MobileClose onClick={toggle}>
                    <CloseIcon />
                </MobileClose>
                <SidebarWrapper>
                    <SidebarMenu>
                        {sidebarItems.map((sidebarItem, i) => (
                            <SidebarLink
                                href={sidebarItem.path}
                                onClick={toggle}
                                key={i}
                            >
                                <SidebarItem>{sidebarItem.label}</SidebarItem>
                            </SidebarLink>
                        ))}
                    </SidebarMenu>
                    <SideBtnWrap>
                        <Link href="/signin" passHref>
                            <SidebarRoute>Sign In</SidebarRoute>
                        </Link>
                    </SideBtnWrap>
                </SidebarWrapper>
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
