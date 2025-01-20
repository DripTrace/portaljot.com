"use client";

import { useCallback, useEffect, useState } from "react";
import Toolbar from "./Sketch/Toolbar";
import usePainter from "@/hooks/merchandise/usePainter";
import Canvas from "./Sketch/Canvas";

const QuickSketch = ({ closeQuickSketch }: any) => {
    const [dateUrl, setDataUrl] = useState("#");
    const [{ canvas, isReady, ...state }, { init, ...api }] = usePainter();

    const handleDownload = useCallback(() => {
        if (!canvas || !canvas.current) return;

        setDataUrl(canvas.current.toDataURL("image/png"));
    }, [canvas]);

    const toolbarProps = {
        ...state,
        ...api,
        dateUrl,
        handleDownload,
        setAutoWidth: api.setAutoWidth as unknown as () => void, // Type adjustment
    };

    useEffect(() => {
        init();
    }, [init]);

    return (
        <div className="flex items-center justify-center">
            <button onClick={closeQuickSketch}>Close QuickSketch</button>
            <Toolbar {...toolbarProps} />
            <Canvas width={state.currentWidth} canvasRef={canvas} />
        </div>
    );
};

export default QuickSketch;
