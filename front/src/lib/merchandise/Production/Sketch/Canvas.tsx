"use client";

import React from "react";

interface Props {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    width?: number;
}

const Canvas: React.FC<Props> = ({ canvasRef, width }) => {
    const widthHalf = width ? width / 2 : 0;
    const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

    return (
        <section>
            <canvas className="z-50" style={{ cursor }} ref={canvasRef} />
        </section>
    );
};

export default Canvas;
