import React, { useRef, useState, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartOptions,
    registerables,
    InteractionItem,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ...registerables
);

const Graph: React.FC = () => {
    const chartRef = useRef<ChartJS<"line", number[], unknown>>(null);
    const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
        null
    );

    const createGradient = (
        ctx: CanvasRenderingContext2D,
        chartArea: { height: number; width: number }
    ) => {
        const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#ff6c00");
        gradientStroke.addColorStop(1, "#ff3b74");

        const gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
        gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
        gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

        return { gradientStroke, gradientBkgrd };
    };

    const data: ChartData<"line"> = {
        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        datasets: [
            {
                label: "Income",
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return "rgba(244,94,132,0.2)";
                    }
                    const { gradientBkgrd } = createGradient(ctx, chartArea);
                    return gradientBkgrd;
                },
                borderColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return "#ff6c00";
                    }
                    const { gradientStroke } = createGradient(ctx, chartArea);
                    return gradientStroke;
                },
                data: [5500, 2500, 10000, 6000, 14000, 1500, 7000, 20000],
                pointBorderColor: "rgba(255,255,255,0)",
                pointBackgroundColor: "rgba(255,255,255,0)",
                pointBorderWidth: 0,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "#ff6c00",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 4,
                pointRadius: (context) => {
                    const pointIndex = context.dataIndex;
                    return pointIndex === selectedPointIndex ? 8 : 1;
                },
                borderWidth: 5,
                pointHitRadius: 16,
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        plugins: {
            tooltip: {
                backgroundColor: "#fff",
                displayColors: false,
                titleColor: "#000",
                bodyColor: "#000",
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    callback: function (value) {
                        return Number(value) / 1000 + "K";
                    },
                },
            },
        },
        onHover: (event, elements) => {
            if (elements.length > 0) {
                const point = elements[0] as InteractionItem;
                setSelectedPointIndex(point.index);
            } else {
                setSelectedPointIndex(null);
            }
        },
    };

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.update();
        }
    }, [selectedPointIndex]);

    return (
        <div className="flex items-center justify-center /*h-screen*/ w-full /*bg-[#13222d]*/">
            <div className="base-box rounded-lg p-2 bg-[#273241] /*w-[15em]*/ size-full /*w-[700px]*/ /*size-full*/ /*inline-block*/ shadow-lg">
                <Line
                    ref={chartRef}
                    data={data}
                    options={options}
                    className="size-full"
                />
            </div>
        </div>
    );
};

export default Graph;

// graph manipulation offset point

// import React, { useRef, useState, useEffect } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
//     ChartData,
//     ChartOptions,
//     registerables,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
//     ...registerables
// );

// const ChartComponent: React.FC = () => {
//     const chartRef = useRef<ChartJS<"line", number[], unknown>>(null);
//     const [chartData, setChartData] = useState<number[]>([
//         5500, 2500, 10000, 6000, 14000, 1500, 7000, 20000,
//     ]);
//     const [draggedPoint, setDraggedPoint] = useState<{
//         x: number;
//         y: number;
//     } | null>(null);
//     const [dragging, setDragging] = useState(false);

//     const createGradient = (
//         ctx: CanvasRenderingContext2D,
//         chartArea: { height: number; width: number }
//     ) => {
//         const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
//         gradientStroke.addColorStop(0, "#ff6c00");
//         gradientStroke.addColorStop(1, "#ff3b74");

//         const gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
//         gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
//         gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

//         return { gradientStroke, gradientBkgrd };
//     };

//     const data: ChartData<"line"> = {
//         labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
//         datasets: [
//             {
//                 label: "Income",
//                 backgroundColor: (context) => {
//                     const chart = context.chart;
//                     const { ctx, chartArea } = chart;

//                     if (!chartArea) {
//                         // This case happens on initial chart load
//                         return "rgba(244,94,132,0.2)";
//                     }
//                     const { gradientBkgrd } = createGradient(ctx, chartArea);
//                     return gradientBkgrd;
//                 },
//                 borderColor: (context) => {
//                     const chart = context.chart;
//                     const { ctx, chartArea } = chart;

//                     if (!chartArea) {
//                         // This case happens on initial chart load
//                         return "#ff6c00";
//                     }
//                     const { gradientStroke } = createGradient(ctx, chartArea);
//                     return gradientStroke;
//                 },
//                 data: chartData,
//                 pointBorderColor: "rgba(255,255,255,0)",
//                 pointBackgroundColor: "rgba(255,255,255,0)",
//                 pointBorderWidth: 0,
//                 pointHoverRadius: 8,
//                 pointHoverBackgroundColor: "#ff6c00",
//                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                 pointHoverBorderWidth: 4,
//                 pointRadius: 1, // Hide default points
//                 borderWidth: 5,
//                 pointHitRadius: 16,
//                 tension: 0.4, // <-- Add this line for rounded edges
//             },
//         ],
//     };

//     const options: ChartOptions<"line"> = {
//         plugins: {
//             tooltip: {
//                 backgroundColor: "#fff",
//                 displayColors: false,
//                 titleColor: "#000",
//                 bodyColor: "#000",
//             },
//             legend: {
//                 display: false,
//             },
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 ticks: {
//                     callback: function (value) {
//                         return Number(value) / 1000 + "K";
//                     },
//                 },
//             },
//         },
//     };

//     useEffect(() => {
//         const chart = chartRef.current;
//         if (chart) {
//             const canvas = chart.canvas;

//             const onMouseMove = (event: MouseEvent) => {
//                 if (dragging && draggedPoint) {
//                     const rect = canvas.getBoundingClientRect();
//                     const x = event.clientX - rect.left;
//                     const y = event.clientY - rect.top;
//                     const xScale = chart.scales.x;
//                     const yScale = chart.scales.y;
//                     const xValue = xScale.getValueForPixel(x);
//                     const yValue = yScale.getValueForPixel(y);

//                     if (xValue !== undefined && yValue !== undefined) {
//                         setDraggedPoint({ x: x, y: y });
//                         const updatedData = [...chartData];
//                         updatedData[Math.round(xValue)] = yValue;
//                         setChartData(updatedData);
//                     }
//                 }
//             };

//             const onMouseUp = () => {
//                 setDragging(false);
//                 setDraggedPoint(null);
//             };

//             canvas.addEventListener("mousemove", onMouseMove);
//             window.addEventListener("mouseup", onMouseUp);

//             return () => {
//                 canvas.removeEventListener("mousemove", onMouseMove);
//                 window.removeEventListener("mouseup", onMouseUp);
//             };
//         }
//     }, [dragging, draggedPoint, chartData]);

//     const onDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         setDraggedPoint({ x, y });
//         setDragging(true);
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-[#13222d]">
//             <div
//                 className="rounded-lg p-8 bg-[#273241] w-[700px] inline-block shadow-lg relative"
//                 onMouseDown={onDragStart}
//             >
//                 <Line ref={chartRef} data={data} options={options} />
//                 {draggedPoint && (
//                     <div
//                         className="absolute bg-red-500 rounded-full"
//                         style={{
//                             width: "12px",
//                             height: "12px",
//                             left: `${draggedPoint.x}px`,
//                             top: `${draggedPoint.y}px`,
//                             transform: "translate(-50%, -50%)",
//                         }}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChartComponent;

// no graph manipulation, no tooltip

// import React, { useRef, useState, useEffect } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
//     ChartData,
//     ChartOptions,
//     registerables,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
//     ...registerables
// );

// const ChartComponent: React.FC = () => {
//     const chartRef = useRef<ChartJS<"line", number[], unknown>>(null);
//     const [draggedPoint, setDraggedPoint] = useState<{
//         x: number;
//         y: number;
//     } | null>(null);
//     const [dragging, setDragging] = useState(false);

//     const createGradient = (
//         ctx: CanvasRenderingContext2D,
//         chartArea: { height: number; width: number }
//     ) => {
//         const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
//         gradientStroke.addColorStop(0, "#ff6c00");
//         gradientStroke.addColorStop(1, "#ff3b74");

//         const gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
//         gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
//         gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

//         return { gradientStroke, gradientBkgrd };
//     };

//     const data: ChartData<"line"> = {
//         labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
//         datasets: [
//             {
//                 label: "Income",
//                 backgroundColor: (context) => {
//                     const chart = context.chart;
//                     const { ctx, chartArea } = chart;

//                     if (!chartArea) {
//                         // This case happens on initial chart load
//                         return "rgba(244,94,132,0.2)";
//                     }
//                     const { gradientBkgrd } = createGradient(ctx, chartArea);
//                     return gradientBkgrd;
//                 },
//                 borderColor: (context) => {
//                     const chart = context.chart;
//                     const { ctx, chartArea } = chart;

//                     if (!chartArea) {
//                         // This case happens on initial chart load
//                         return "#ff6c00";
//                     }
//                     const { gradientStroke } = createGradient(ctx, chartArea);
//                     return gradientStroke;
//                 },
//                 data: [5500, 2500, 10000, 6000, 14000, 1500, 7000, 20000],
//                 pointBorderColor: "rgba(255,255,255,0)",
//                 pointBackgroundColor: "rgba(255,255,255,0)",
//                 pointBorderWidth: 0,
//                 pointHoverRadius: 8,
//                 pointHoverBackgroundColor: "#ff6c00",
//                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                 pointHoverBorderWidth: 4,
//                 pointRadius: 1, // Hide default points
//                 borderWidth: 5,
//                 pointHitRadius: 16,
//                 tension: 0.4, // <-- Add this line for rounded edges
//             },
//         ],
//     };

//     const options: ChartOptions<"line"> = {
//         plugins: {
//             tooltip: {
//                 enabled: false, // Disable the default tooltip
//             },
//             legend: {
//                 display: false,
//             },
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 ticks: {
//                     callback: function (value) {
//                         return Number(value) / 1000 + "K";
//                     },
//                 },
//             },
//         },
//     };

//     useEffect(() => {
//         const chart = chartRef.current;
//         if (chart) {
//             const canvas = chart.canvas;

//             const onMouseMove = (event: MouseEvent) => {
//                 if (dragging) {
//                     const rect = canvas.getBoundingClientRect();
//                     const x = event.clientX - rect.left;
//                     const y = event.clientY - rect.top;
//                     const dataPoint = chart.getElementsAtEventForMode(
//                         event as any,
//                         "index",
//                         { intersect: false },
//                         true
//                     )[0];

//                     if (dataPoint) {
//                         setDraggedPoint({
//                             x: dataPoint.element.x,
//                             y: dataPoint.element.y,
//                         });
//                     }
//                 }
//             };

//             const onMouseUp = () => {
//                 setDragging(false);
//             };

//             canvas.addEventListener("mousemove", onMouseMove);
//             window.addEventListener("mouseup", onMouseUp);

//             return () => {
//                 canvas.removeEventListener("mousemove", onMouseMove);
//                 window.removeEventListener("mouseup", onMouseUp);
//             };
//         }
//     }, [dragging]);

//     const onDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         setDragging(true);
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-[#13222d]">
//             <div
//                 className="rounded-lg p-8 bg-[#273241] w-[700px] inline-block shadow-lg relative"
//                 onMouseDown={onDragStart}
//             >
//                 <Line ref={chartRef} data={data} options={options} />
//                 {draggedPoint && chartRef.current && (
//                     <>
//                         <div
//                             className="absolute bg-red-500 rounded-full"
//                             style={{
//                                 width: "12px",
//                                 height: "12px",
//                                 left: `${draggedPoint.x}px`,
//                                 top: `${draggedPoint.y}px`,
//                                 transform: "translate(-50%, -50%)",
//                             }}
//                         />
//                         <div
//                             className="absolute bg-white text-black p-2 rounded"
//                             style={{
//                                 left: `${draggedPoint.x}px`,
//                                 top: `${draggedPoint.y - 30}px`,
//                                 transform: "translateX(-50%)",
//                             }}
//                         >
//                             {data.datasets[0].data[
//                                 data.labels?.indexOf(
//                                     chartRef.current.scales.x.getLabelForValue(
//                                         draggedPoint.x
//                                     )
//                                 ) ?? -1
//                             ]?.toLocaleString("en-US", {
//                                 style: "currency",
//                                 currency: "USD",
//                             })}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChartComponent;
