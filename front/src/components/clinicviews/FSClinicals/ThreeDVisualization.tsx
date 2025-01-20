"use client";

import React from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";
import { useClientSideRendering } from "@/hooks/useClientSideRendering";

const ThreeDVisualizationInner = dynamic(
    () => import("./ThreeDVisualizationInner"),
    {
        ssr: false,
        loading: () => <div>Loading 3D visualization...</div>,
    }
);

const FallbackComponent = () => (
    <div className="h-64 flex items-center justify-center bg-gray-200 rounded-lg">
        <p>
            3D visualization unavailable. Please try a different browser or
            device.
        </p>
    </div>
);

const ThreeDVisualization: React.FC = () => {
    const isClient = useClientSideRendering();

    if (!isClient) {
        return null;
    }

    return (
        <ErrorBoundary fallback={<FallbackComponent />}>
            <ThreeDVisualizationInner />
        </ErrorBoundary>
    );
};

export default ThreeDVisualization;
