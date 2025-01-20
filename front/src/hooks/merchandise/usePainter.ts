"use client";

import { useCallback, useRef, useState } from "react";

interface UsePainterReturn {
    canvas: React.RefObject<HTMLCanvasElement>;
    isReady: boolean;
    currentWidth: number;
    currentColor: string;
    isRegularMode: boolean;
    isAutoWidth: boolean;
    isEraser: boolean;
}

interface UsePainterMethods {
    init: () => void;
    handleRegularMode: () => void;
    handleSpecialMode: () => void;
    handleColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
    handleEraserMode: () => void;
    setAutoWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentSaturation: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentLightness: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const usePainter = (): [UsePainterReturn, UsePainterMethods] => {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isRegularMode, setIsRegularMode] = useState(true);
    const [isAutoWidth, setIsAutoWidth] = useState(false);
    const [isEraser, setIsEraser] = useState(false);
    const [currentColor, setCurrentColor] = useState("#000000");
    const [currentWidth, setCurrentWidth] = useState(50);
    const autoWidth = useRef(false);
    const selectedSaturation = useRef(100);
    const selectedLightness = useRef(50);
    const selectedColor = useRef("#000000");
    const selectedLineWidth = useRef(50);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const hue = useRef(0);
    const isDrawing = useRef(false);
    const direction = useRef(true);
    const isRegularPaintMode = useRef(true);
    const isEraserMode = useRef(false);
    const ctx = useRef<CanvasRenderingContext2D | null>(null);

    const drawOnCanvas = useCallback((event: MouseEvent) => {
        if (!ctx.current) {
            return;
        }
        ctx.current.beginPath();
        ctx.current.moveTo(lastX.current, lastY.current);
        ctx.current.lineTo(event.offsetX, event.offsetY);
        ctx.current.stroke();

        [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    }, []);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        isDrawing.current = true;
        [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    }, []);

    const dynamicLineWidth = useCallback(() => {
        if (!ctx.current) {
            return;
        }
        if (ctx.current.lineWidth > 90 || ctx.current.lineWidth < 10) {
            direction.current = !direction.current;
        }
        direction.current ? ctx.current.lineWidth++ : ctx.current.lineWidth--;
        setCurrentWidth(ctx.current.lineWidth);
    }, []);

    const drawNormal = useCallback(
        (e: MouseEvent) => {
            if (!isDrawing.current || !ctx.current) return;

            if (isRegularPaintMode.current || isEraserMode.current) {
                ctx.current.strokeStyle = selectedColor.current;

                setCurrentColor(selectedColor.current);

                if (autoWidth.current && !isEraserMode.current) {
                    dynamicLineWidth();
                } else {
                    ctx.current.lineWidth = selectedLineWidth.current;
                }

                ctx.current.globalCompositeOperation = isEraserMode.current
                    ? "destination-out"
                    : "source-over";
            } else {
                const hslColor = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
                setCurrentColor(hslColor);
                ctx.current.strokeStyle = hslColor;
                ctx.current.globalCompositeOperation = "source-over";

                hue.current++;

                if (hue.current >= 360) hue.current = 0;

                autoWidth.current
                    ? dynamicLineWidth()
                    : (ctx.current.lineWidth = selectedLineWidth.current);
            }
            drawOnCanvas(e);
        },
        [drawOnCanvas, dynamicLineWidth]
    );

    const stopDrawing = useCallback(() => {
        isDrawing.current = false;
    }, []);

    const init = useCallback(() => {
        if (canvas.current) {
            ctx.current = canvas.current.getContext("2d");
            if (ctx.current) {
                canvas.current.addEventListener("mousedown", handleMouseDown);
                canvas.current.addEventListener("mousemove", drawNormal);
                canvas.current.addEventListener("mouseup", stopDrawing);
                canvas.current.addEventListener("mouseout", stopDrawing);

                canvas.current.width = window.innerWidth - 196;
                canvas.current.height = window.innerHeight;

                ctx.current.strokeStyle = "#000";
                ctx.current.lineJoin = "round";
                ctx.current.lineCap = "round";
                ctx.current.lineWidth = 10;
                setIsReady(true);
            }
        }
    }, [drawNormal, handleMouseDown, stopDrawing]);

    const handleRegularMode = useCallback(() => {
        setIsRegularMode(true);
        isEraserMode.current = false;
        setIsEraser(false);
        isRegularPaintMode.current = true;
    }, []);

    const handleSpecialMode = useCallback(() => {
        setIsRegularMode(false);
        isEraserMode.current = false;
        setIsEraser(false);
        isRegularPaintMode.current = false;
    }, []);

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentColor(e.currentTarget.value);
        selectedColor.current = e.currentTarget.value;
    };

    const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = parseInt(e.currentTarget.value, 10);
        setCurrentWidth(width);
        selectedLineWidth.current = width;
    };

    const handleClear = useCallback(() => {
        if (ctx.current && canvas.current) {
            ctx.current.clearRect(
                0,
                0,
                canvas.current.width,
                canvas.current.height
            );
        }
    }, []);

    const handleEraserMode = () => {
        autoWidth.current = false;
        setIsAutoWidth(false);
        setIsRegularMode(true);
        isEraserMode.current = true;
        setIsEraser(true);
    };

    const setCurrentSaturation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const saturation = parseInt(e.currentTarget.value, 10);
        setCurrentColor(
            `hsl(${hue.current},${saturation}%,${selectedLightness.current}%)`
        );
        selectedSaturation.current = saturation;
    };

    const setCurrentLightness = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lightness = parseInt(e.currentTarget.value, 10);
        setCurrentColor(
            `hsl(${hue.current},${selectedSaturation.current}%,${lightness}%)`
        );
        selectedLightness.current = lightness;
    };

    const setAutoWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        autoWidth.current = checked;
        setIsAutoWidth(checked);

        if (!checked) {
            setCurrentWidth(selectedLineWidth.current);
        } else {
            setCurrentWidth(
                ctx.current?.lineWidth ?? selectedLineWidth.current
            );
        }
    };

    return [
        {
            canvas,
            isReady,
            currentWidth,
            currentColor,
            isRegularMode,
            isAutoWidth,
            isEraser,
        },
        {
            init,
            handleRegularMode,
            handleSpecialMode,
            handleColor,
            handleWidth,
            handleClear,
            handleEraserMode,
            setAutoWidth,
            setCurrentSaturation,
            setCurrentLightness,
        },
    ];
};

export default usePainter;
