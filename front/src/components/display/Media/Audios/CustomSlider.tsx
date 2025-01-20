"use client";

import { useState, MouseEvent } from "react";
import styled from "styled-components";

const SliderWrapper = styled.div`
    width: 100%;
    height: 11px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

const Track = styled.div`
    background: rgba(63, 191, 63, 0.1);
    border-radius: 10px;
    height: 11px;
    width: 100%;
    position: absolute;
`;

const Progress = styled.div<{ value: number }>`
    background: rgba(63, 191, 63, 0.4);
    border-radius: 10px 0 0 10px;
    height: 11px;
    width: ${(props) => props.value}%;
    position: absolute;
`;

const Thumb = styled.div<{ value: number }>`
    width: 15px;
    height: 15px;
    background: rgba(63, 191, 63, 0.7);
    border-radius: 50%;
    position: absolute;
    top: -2px;
    left: ${(props) => props.value}%;
    transform: translateX(-50%);
    cursor: pointer;
    transition:
        background 0.2s,
        transform 0.2s;

    &:hover {
        background: rgba(63, 191, 63, 1);
    }

    &:active {
        background: rgba(63, 191, 63, 1);
        transform: translateX(-50%) scale(1.2);
    }
`;

interface CustomSliderProps {
    value: number;
    onChange: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, onChange }) => {
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newValue = Math.min(
            100,
            Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
        );
        onChange(newValue);
    };

    return (
        <SliderWrapper onMouseDown={handleMouseDown}>
            <Track />
            <Progress value={value} />
            <Thumb value={value} />
        </SliderWrapper>
    );
};

export default CustomSlider;
