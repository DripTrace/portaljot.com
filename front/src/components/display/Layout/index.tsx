"use client";

import { RefObject, ReactNode } from "react";
import { LayoutContainer } from "./LayoutElements";

interface LayoutProps {
    children: ReactNode;
    informationReference: RefObject<HTMLDivElement>;
    servicesReference: RefObject<HTMLDivElement>;
    policiesReference: RefObject<HTMLDivElement>;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    informationReference,
    servicesReference,
    policiesReference,
}) => {
    return (
        <LayoutContainer>
            {/* You may need to pass the references to child components here if needed */}
            {children}
        </LayoutContainer>
    );
};

export default Layout;
