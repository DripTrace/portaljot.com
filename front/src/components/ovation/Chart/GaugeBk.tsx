// // import React from "react";

// // const Gauge = () => {
// //     return <div className="gauge">Gauge</div>;
// // };

// // export default Gauge;

// // components/GaugeChart.tsx

// import React, { useRef, useEffect } from "react";
// import {
//     Chart as ChartJS,
//     ChartData,
//     ChartOptions,
//     ChartConfiguration,
//     registerables,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";

// ChartJS.register(...registerables, ChartDataLabels);

// const GaugeChart: React.FC = () => {
//     const chartRef = useRef<HTMLCanvasElement>(null);

//     const randomScalingFactor = () => Math.round(Math.random() * 100);

//     const randomData = (): ChartData<"doughnut"> => ({
//         datasets: [
//             {
//                 data: [
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                 ],
//                 backgroundColor: ["green", "yellow", "orange", "red"],
//                 borderWidth: 2,
//             },
//         ],
//     });

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context: any) {
//                     return context.dataset.backgroundColor as string;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     useEffect(() => {
//         if (chartRef.current) {
//             const data = randomData();

//             const config: ChartConfiguration<"doughnut"> = {
//                 type: "doughnut",
//                 data: data,
//                 options: options,
//             };

//             const ctx = chartRef.current.getContext("2d");
//             if (ctx !== null) {
//                 new ChartJS(ctx, config);
//             }
//         }
//     }, []);

//     const handleRandomizeData = () => {
//         if (chartRef.current) {
//             const chart = ChartJS.getChart(chartRef.current);
//             if (chart) {
//                 chart.data = randomData();
//                 chart.update();
//             }
//         }
//     };

//     return (
//         <div>
//             <div className="w-full">
//                 <canvas ref={chartRef} />
//             </div>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleRandomizeData}
//             >
//                 Randomize Data
//             </button>
//         </div>
//     );
// };

// export default GaugeChart;

// components/GaugeChart.tsx

// import React, { useEffect, useRef, useState } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartData,
//     ChartOptions,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartDataLabels
// );

// const GaugeChart: React.FC = () => {
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);
//     const [artValue, setArtValue] = useState(20);
//     const [metaverseValue, setMetaverseValue] = useState(20);
//     const [musicValue, setMusicValue] = useState(20);
//     const [collectiblesValue, setCollectiblesValue] = useState(20);
//     const [pfpValue, setPfpValue] = useState(20);

//     const handleSliderChange =
//         (setter: React.Dispatch<React.SetStateAction<number>>) =>
//         (event: React.ChangeEvent<HTMLInputElement>) => {
//             setter(parseInt(event.target.value, 10));
//         };

//     const data: ChartData<"doughnut"> = {
//         datasets: [
//             {
//                 data: [
//                     artValue,
//                     metaverseValue,
//                     musicValue,
//                     collectiblesValue,
//                     pfpValue,
//                 ],
//                 backgroundColor: ["green", "yellow", "orange", "red", "purple"],
//                 borderWidth: 2,
//             },
//         ],
//     };

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         cutout: "50%",
//         rotation: -90, // Start angle of the gauge (half circle)
//         circumference: 180, // Sweep angle of the gauge (half circle)
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context: any) {
//                     return context.dataset.backgroundColor;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <div className="w-full">
//                 <Doughnut ref={chartRef} data={data} options={options} />
//             </div>
//             <div className="w-full flex flex-col items-center mt-4">
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="art-slider">
//                         Art
//                     </label>
//                     <input
//                         id="art-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={artValue}
//                         onChange={handleSliderChange(setArtValue)}
//                         className="flex-1"
//                         title="Art Value"
//                         placeholder="Art Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="metaverse-slider">
//                         Metaverse
//                     </label>
//                     <input
//                         id="metaverse-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={metaverseValue}
//                         onChange={handleSliderChange(setMetaverseValue)}
//                         className="flex-1"
//                         title="Metaverse Value"
//                         placeholder="Metaverse Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="music-slider">
//                         Music
//                     </label>
//                     <input
//                         id="music-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={musicValue}
//                         onChange={handleSliderChange(setMusicValue)}
//                         className="flex-1"
//                         title="Music Value"
//                         placeholder="Music Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="collectibles-slider">
//                         Collectibles
//                     </label>
//                     <input
//                         id="collectibles-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={collectiblesValue}
//                         onChange={handleSliderChange(setCollectiblesValue)}
//                         className="flex-1"
//                         title="Collectibles Value"
//                         placeholder="Collectibles Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="pfp-slider">
//                         PFP
//                     </label>
//                     <input
//                         id="pfp-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={pfpValue}
//                         onChange={handleSliderChange(setPfpValue)}
//                         className="flex-1"
//                         title="PFP Value"
//                         placeholder="PFP Value"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GaugeChart;

// import React, { useEffect, useRef, useState } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartData,
//     ChartOptions,
//     Color,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";
// import {
//     saveValues,
//     loadValues,
//     getAllValues,
//     SliderValues,
// } from "@/utils/indexedDB"; // Import the IndexedDB utility functions

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartDataLabels
// );

// const GaugeChart: React.FC = () => {
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);
//     const [artValue, setArtValue] = useState<number>(20);
//     const [metaverseValue, setMetaverseValue] = useState<number>(20);
//     const [musicValue, setMusicValue] = useState<number>(20);
//     const [collectiblesValue, setCollectiblesValue] = useState<number>(20);
//     const [pfpValue, setPfpValue] = useState<number>(20);
//     const [savedValues, setSavedValues] = useState<SliderValues[]>([]);
//     const [selectedValueId, setSelectedValueId] = useState<string>("");

//     useEffect(() => {
//         const loadInitialValues = async () => {
//             const savedValuesList = await getAllValues();
//             setSavedValues(savedValuesList);
//             if (savedValuesList.length > 0) {
//                 const initialValues = savedValuesList[0];
//                 setArtValue(initialValues.artValue);
//                 setMetaverseValue(initialValues.metaverseValue);
//                 setMusicValue(initialValues.musicValue);
//                 setCollectiblesValue(initialValues.collectiblesValue);
//                 setPfpValue(initialValues.pfpValue);
//                 setSelectedValueId(initialValues.id);
//             }
//         };
//         loadInitialValues();
//     }, []);

//     const handleSliderChange =
//         (setter: React.Dispatch<React.SetStateAction<number>>) =>
//         (event: React.ChangeEvent<HTMLInputElement>) => {
//             setter(parseInt(event.target.value, 10));
//         };

//     const handleSaveValues = async () => {
//         const values: SliderValues = {
//             id: selectedValueId || new Date().toISOString(),
//             artValue,
//             metaverseValue,
//             musicValue,
//             collectiblesValue,
//             pfpValue,
//         };
//         await saveValues(values);
//         alert("Values saved successfully!");
//         setSavedValues(await getAllValues());
//     };

//     const handleLoadValues = async (id: string) => {
//         const values = await loadValues(id);
//         if (values) {
//             setArtValue(values.artValue);
//             setMetaverseValue(values.metaverseValue);
//             setMusicValue(values.musicValue);
//             setCollectiblesValue(values.collectiblesValue);
//             setPfpValue(values.pfpValue);
//             setSelectedValueId(values.id);
//         }
//     };

//     const handleFileUpload = async (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 const json = e.target?.result as string;
//                 const values: SliderValues = JSON.parse(json);
//                 await saveValues(values);
//                 setSavedValues(await getAllValues());
//             };
//             reader.readAsText(file);
//         }
//     };

//     const data: ChartData<"doughnut"> = {
//         datasets: [
//             {
//                 data: [
//                     artValue,
//                     metaverseValue,
//                     musicValue,
//                     collectiblesValue,
//                     pfpValue,
//                 ],
//                 backgroundColor: ["green", "yellow", "orange", "red", "purple"],
//                 borderWidth: 2,
//             },
//         ],
//     };

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         cutout: "50%",
//         rotation: -90, // Start angle of the gauge (half circle)
//         circumference: 180, // Sweep angle of the gauge (half circle)
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context) {
//                     return context.dataset.backgroundColor as Color;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <div className="w-full">
//                 <Doughnut ref={chartRef} data={data} options={options} />
//             </div>
//             <div className="w-full flex flex-col items-center mt-4">
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="art-slider">
//                         Art
//                     </label>
//                     <input
//                         id="art-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={artValue}
//                         onChange={handleSliderChange(setArtValue)}
//                         className="flex-1"
//                         title="Art Value"
//                         placeholder="Art Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="metaverse-slider">
//                         Metaverse
//                     </label>
//                     <input
//                         id="metaverse-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={metaverseValue}
//                         onChange={handleSliderChange(setMetaverseValue)}
//                         className="flex-1"
//                         title="Metaverse Value"
//                         placeholder="Metaverse Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="music-slider">
//                         Music
//                     </label>
//                     <input
//                         id="music-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={musicValue}
//                         onChange={handleSliderChange(setMusicValue)}
//                         className="flex-1"
//                         title="Music Value"
//                         placeholder="Music Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="collectibles-slider">
//                         Collectibles
//                     </label>
//                     <input
//                         id="collectibles-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={collectiblesValue}
//                         onChange={handleSliderChange(setCollectiblesValue)}
//                         className="flex-1"
//                         title="Collectibles Value"
//                         placeholder="Collectibles Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="pfp-slider">
//                         PFP
//                     </label>
//                     <input
//                         id="pfp-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={pfpValue}
//                         onChange={handleSliderChange(setPfpValue)}
//                         className="flex-1"
//                         title="PFP Value"
//                         placeholder="PFP Value"
//                     />
//                 </div>
//             </div>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//                 onClick={handleSaveValues}
//                 type="button" // Added type attribute
//             >
//                 Save Values
//             </button>
//             <div className="mt-4">
//                 <select
//                     value={selectedValueId}
//                     onChange={(e) => handleLoadValues(e.target.value)}
//                     className="bg-white border border-gray-400 rounded py-2 px-4"
//                     title="Select a value"
//                 >
//                     {savedValues.map((value) => (
//                         <option key={value.id} value={value.id}>
//                             {value.id}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="mt-4">
//                 <input
//                     type="file"
//                     accept="application/json"
//                     onChange={handleFileUpload}
//                     className="bg-white border border-gray-400 rounded py-2 px-4"
//                     title="Upload a file"
//                 />
//             </div>
//         </div>
//     );
// };

// export default GaugeChart;

// import React, { useEffect, useRef, useState } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartData,
//     ChartOptions,
//     Color,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";
// import { saveValues, loadValues, SliderValues } from "@/utils/indexedDB"; // Import the IndexedDB utility functions

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartDataLabels
// );

// const Gauge: React.FC = () => {
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);
//     const [artValue, setArtValue] = useState<number>(20);
//     const [metaverseValue, setMetaverseValue] = useState<number>(20);
//     const [musicValue, setMusicValue] = useState<number>(20);
//     const [collectiblesValue, setCollectiblesValue] = useState<number>(20);
//     const [pfpValue, setPfpValue] = useState<number>(20);

//     useEffect(() => {
//         const loadInitialValues = async () => {
//             const savedValues = await loadValues();
//             if (savedValues) {
//                 setArtValue(savedValues.artValue);
//                 setMetaverseValue(savedValues.metaverseValue);
//                 setMusicValue(savedValues.musicValue);
//                 setCollectiblesValue(savedValues.collectiblesValue);
//                 setPfpValue(savedValues.pfpValue);
//             }
//         };
//         loadInitialValues();
//     }, []);

//     const handleSliderChange =
//         (setter: React.Dispatch<React.SetStateAction<number>>) =>
//         (event: React.ChangeEvent<HTMLInputElement>) => {
//             setter(parseInt(event.target.value, 10));
//         };

//     const handleSaveValues = async () => {
//         const values: SliderValues = {
//             artValue,
//             metaverseValue,
//             musicValue,
//             collectiblesValue,
//             pfpValue,
//         };
//         await saveValues(values);
//         alert("Values saved successfully!");
//     };

//     const data: ChartData<"doughnut"> = {
//         datasets: [
//             {
//                 data: [
//                     artValue,
//                     metaverseValue,
//                     musicValue,
//                     collectiblesValue,
//                     pfpValue,
//                 ],
//                 backgroundColor: ["green", "yellow", "orange", "red", "purple"],
//                 borderWidth: 2,
//             },
//         ],
//     };

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         cutout: "50%",
//         rotation: -90, // Start angle of the gauge (half circle)
//         circumference: 180, // Sweep angle of the gauge (half circle)
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context) {
//                     return context.dataset.backgroundColor as Color;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     return (
//         <div className="flex flex-col items-center justify-center size-full">
//             <div className="w-full">
//                 <Doughnut ref={chartRef} data={data} options={options} />
//             </div>
//             <div className="w-full flex flex-col items-center mt-4">
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="art-slider">
//                         Art
//                     </label>
//                     <input
//                         id="art-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={artValue}
//                         onChange={handleSliderChange(setArtValue)}
//                         className="flex-1"
//                         title="Art Value"
//                         placeholder="Art Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="metaverse-slider">
//                         Metaverse
//                     </label>
//                     <input
//                         id="metaverse-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={metaverseValue}
//                         onChange={handleSliderChange(setMetaverseValue)}
//                         className="flex-1"
//                         title="Metaverse Value"
//                         placeholder="Metaverse Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="music-slider">
//                         Music
//                     </label>
//                     <input
//                         id="music-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={musicValue}
//                         onChange={handleSliderChange(setMusicValue)}
//                         className="flex-1"
//                         title="Music Value"
//                         placeholder="Music Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="collectibles-slider">
//                         Collectibles
//                     </label>
//                     <input
//                         id="collectibles-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={collectiblesValue}
//                         onChange={handleSliderChange(setCollectiblesValue)}
//                         className="flex-1"
//                         title="Collectibles Value"
//                         placeholder="Collectibles Value"
//                     />
//                 </div>
//                 <div className="flex items-center mb-2 w-full max-w-md">
//                     <label className="mr-2" htmlFor="pfp-slider">
//                         PFP
//                     </label>
//                     <input
//                         id="pfp-slider"
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={pfpValue}
//                         onChange={handleSliderChange(setPfpValue)}
//                         className="flex-1"
//                         title="PFP Value"
//                         placeholder="PFP Value"
//                     />
//                 </div>
//             </div>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//                 onClick={handleSaveValues}
//             >
//                 Save Values
//             </button>
//         </div>
//     );
// };

// export default Gauge;

// import React, { useEffect, useRef } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartData,
//     ChartConfiguration,
//     ChartOptions,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartDataLabels
// );

// const Gauge: React.FC = () => {
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);

//     const randomScalingFactor = () => {
//         return Math.round(Math.random() * 100);
//     };

//     const randomData = (): ChartData<"doughnut"> => {
//         const data = [
//             randomScalingFactor(),
//             randomScalingFactor(),
//             randomScalingFactor(),
//             randomScalingFactor(),
//             randomScalingFactor(),
//         ];

//         return {
//             datasets: [
//                 {
//                     data: data,
//                     backgroundColor: [
//                         "green",
//                         "yellow",
//                         "orange",
//                         "red",
//                         "purple",
//                     ],
//                     borderWidth: 1,
//                 },
//             ],
//         };
//     };

//     const data = randomData();

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         cutout: "50%",
//         rotation: -90, // Start angle of the gauge (half circle)
//         circumference: 180, // Sweep angle of the gauge (half circle)
//         layout: {
//             padding: {
//                 bottom: 0,
//             },
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number, context: any) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context: any) {
//                     return context.dataset.backgroundColor;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     const handleRandomizeData = () => {
//         if (chartRef.current) {
//             const newData = randomData();
//             chartRef.current.data.datasets = newData.datasets;
//             chartRef.current.update();
//         }
//     };

//     // useEffect(() => {
//     //     handleRandomizeData();
//     // }, [handleRandomizeData]);

//     // useEffect(() => {
//     // if (chartRef.current) {
//     //     const newData = randomData();
//     //     chartRef.current.data.datasets = newData.datasets;
//     //     chartRef.current.update();
//     // }

//     // if (chartRef.current) {
//     //     const config: ChartConfiguration<"doughnut"> = {
//     //         type: "doughnut",
//     //         data: data,
//     //         options: options,
//     //     };

//     //     const ctx = chartRef.current.getContext("2d");
//     //     if (ctx) {
//     //         new ChartJS(ctx, config);
//     //     }
//     // }
//     // }, []);

//     return (
//         <div className="base-box size-full flex-col">
//             <div className="base-box size-full">
//                 <Doughnut
//                     ref={chartRef}
//                     data={data}
//                     options={options}
//                     className="/*w-[20rem]*/ size-full"
//                 />
//             </div>
//             <button
//                 className="text-[1rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleRandomizeData}
//             >
//                 Randomize Data
//             </button>
//         </div>
//     );
// };

// export default Gauge;

// import React, { useEffect, useRef, useState } from "react";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartData,
//     ChartConfiguration,
//     ChartOptions,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-gauge";
// import { loadValues } from "@/utils/indexedDB";
// // import { loadValues, SliderValues } from "./indexedDB";

// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ChartDataLabels
// );

// const Gauge: React.FC = () => {
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);
//     const [chartData, setChartData] = useState<ChartData<"doughnut">>({
//         datasets: [
//             {
//                 data: [],
//                 backgroundColor: ["green", "yellow", "orange", "red", "purple"],
//                 borderWidth: 1,
//             },
//         ],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             const values = await loadValues();
//             if (values) {
//                 const {
//                     artValue,
//                     metaverseValue,
//                     musicValue,
//                     collectiblesValue,
//                     pfpValue,
//                 } = values;
//                 const data = [
//                     artValue,
//                     metaverseValue,
//                     musicValue,
//                     collectiblesValue,
//                     pfpValue,
//                 ];
//                 setChartData({
//                     datasets: [
//                         {
//                             data: data,
//                             backgroundColor: [
//                                 "green",
//                                 "yellow",
//                                 "orange",
//                                 "red",
//                                 "purple",
//                             ],
//                             borderWidth: 1,
//                         },
//                     ],
//                 });
//             }
//         };

//         fetchData();
//     }, []);

//     const options: ChartOptions<"doughnut"> = {
//         responsive: true,
//         cutout: "50%",
//         rotation: -90,
//         circumference: 180,
//         layout: {
//             padding: {
//                 bottom: 0,
//             },
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Portfolio Gauge",
//             },
//             datalabels: {
//                 display: true,
//                 formatter: function (value: number, context: any) {
//                     return "< " + Math.round(value);
//                 },
//                 color: function (context: any) {
//                     return context.dataset.backgroundColor;
//                 },
//                 backgroundColor: "rgba(0, 0, 0, 1.0)",
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 font: {
//                     weight: "bold",
//                 },
//             },
//         },
//     };

//     return (
//         <div className="base-box size-full flex-col">
//             <div className="base-box size-full">
//                 <Doughnut
//                     ref={chartRef}
//                     data={chartData}
//                     options={options}
//                     className="size-full"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Gauge;

"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartConfiguration,
    ChartOptions,
} from "chart.js";
// const Chart = dynamic(() => import('chart.js/auto'), { ssr: false });

import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-gauge";
import { PortfolioValues, loadValues, saveValues } from "@/utils/indexedDB";
// import { loadValues, PortfolioValues } from "./indexedDB";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const Gauge: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);
    const [chartData, setChartData] = useState<ChartData<"doughnut">>({
        datasets: [
            {
                data: [],
                backgroundColor: ["green", "yellow", "orange", "red", "purple"],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            const portfolioValues: PortfolioValues = {
                artValue: 10,
                metaverseValue: 20,
                musicValue: 30,
                collectiblesValue: 40,
                pfpValue: 50,
            };

            saveValues(portfolioValues)
                .then(() => console.log("Values saved successfully"))
                .catch((error) => console.error("Error saving values:", error));
            const values = await loadValues();
            if (values) {
                const {
                    artValue,
                    metaverseValue,
                    musicValue,
                    collectiblesValue,
                    pfpValue,
                } = values;
                const data = [
                    artValue,
                    metaverseValue,
                    musicValue,
                    collectiblesValue,
                    pfpValue,
                ];
                setChartData({
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [
                                "green",
                                "yellow",
                                "orange",
                                "red",
                                "purple",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            }
        };

        fetchData();
    }, []);

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        cutout: "50%",
        rotation: -90,
        circumference: 180,
        layout: {
            padding: {
                bottom: 0,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Portfolio Gauge",
            },
            datalabels: {
                display: true,
                formatter: function (value: number, context: any) {
                    return "< " + Math.round(value);
                },
                color: function (context: any) {
                    return context.dataset.backgroundColor;
                },
                backgroundColor: "rgba(0, 0, 0, 1.0)",
                borderWidth: 0,
                borderRadius: 5,
                font: {
                    weight: "bold",
                },
            },
        },
    };

    return (
        <div className="base-box size-full flex-col">
            <div className="base-box size-full">
                {/* {isClient ? (
                    <Doughnut
                        ref={chartRef}
                        data={chartData}
                        options={options}
                        className="size-full"
                    />
                ) : (
                    <div>Gauge placeholder</div>
                )} */}
                <Doughnut
                    ref={chartRef}
                    data={chartData}
                    options={options}
                    className="size-full"
                />
            </div>
        </div>
    );
};

export default Gauge;
