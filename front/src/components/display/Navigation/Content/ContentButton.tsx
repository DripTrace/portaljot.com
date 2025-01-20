"use client";

import React, { Suspense } from "react";
import {
    ButtonProperties,
    IconProperties,
    TitleProperties,
} from "./ContentElements";

// Define types for both lazy and non-lazy components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type LazyIconComponent = React.LazyExoticComponent<IconComponent>;

interface ContentButtonProps {
    route?: string;
    Icon: IconComponent | LazyIconComponent;
    title: string;
    onClick?: () => void;
}

const ContentButton: React.FC<ContentButtonProps> = ({
    route,
    Icon,
    title,
    onClick,
}) => {
    return (
        <ButtonProperties onClick={onClick}>
            <IconProperties>
                <Suspense fallback={<div>Loading...</div>}>
                    <Icon />
                </Suspense>
            </IconProperties>
            <TitleProperties>{title}</TitleProperties>
        </ButtonProperties>
    );
};

export default ContentButton;
