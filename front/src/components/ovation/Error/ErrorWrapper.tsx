import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ErrorWrapperProps {
    // Define any props you need to pass to configure your chart
    data: any;
    options: any;
}

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ data, options }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: "line", // or whatever type you're using
                    data: data,
                    options: options,
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, options]);

    return <canvas ref={chartRef} />;
};

export default ErrorWrapper;
