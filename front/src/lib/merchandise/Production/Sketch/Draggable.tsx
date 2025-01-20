"use client";

import { useRef, useEffect, MutableRefObject } from "react";

interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}

const Draggable = () => {
    const canvas = useRef<HTMLCanvasElement>(null);
    let ctx: CanvasRenderingContext2D | null = null;
    const boxes: Box[] = [
        { x: 200, y: 220, w: 100, h: 50 },
        { x: 100, y: 120, w: 100, h: 50 },
    ];
    let isDown = false;
    let dragTarget: Box | null = null;
    let startX: number | null = null;
    let startY: number | null = null;

    useEffect(() => {
        const canvasEle = canvas.current;
        if (canvasEle) {
            canvasEle.width = canvasEle.clientWidth;
            canvasEle.height = canvasEle.clientHeight;
            ctx = canvasEle.getContext("2d");
        }
    }, []);

    useEffect(() => {
        draw();
    }, []);

    const draw = () => {
        if (!ctx || !canvas.current) return;

        ctx.clearRect(
            0,
            0,
            canvas.current.clientWidth,
            canvas.current.clientHeight
        );
        boxes.forEach((info) => drawFillRect(info));
    };

    const drawFillRect = (info: Box, style: any = {}) => {
        if (!ctx) return;

        const { x, y, w, h } = info;
        const { backgroundColor = "black" } = style;

        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    };

    const hitBox = (x: number, y: number): boolean => {
        let isTarget = false;
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            if (
                x >= box.x &&
                x <= box.x + box.w &&
                y >= box.y &&
                y <= box.y + box.h
            ) {
                dragTarget = box;
                isTarget = true;
                break;
            }
        }
        return isTarget;
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        const rect = canvas.current?.getBoundingClientRect();
        if (!rect) return;

        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        isDown = hitBox(startX, startY);
    };

    const handleMouseMove = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        if (!isDown || !startX || !startY || !dragTarget) return;

        const rect = canvas.current?.getBoundingClientRect();
        if (!rect) return;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const dx = mouseX - startX;
        const dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        dragTarget.x += dx;
        dragTarget.y += dy;
        draw();
    };

    const handleMouseUp = () => {
        dragTarget = null;
        isDown = false;
    };

    const handleMouseOut = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        handleMouseUp();
    };

    return (
        <div className="draggable">
            <h3>
                Draggable Rectangle on Canvas -{" "}
                <a
                    href="http://www.cluemediator.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Clue Mediator
                </a>
            </h3>
            <canvas
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
                ref={canvas}
            ></canvas>
        </div>
    );
};

export default Draggable;
