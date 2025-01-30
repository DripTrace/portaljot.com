// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// interface Data {
//     group: string;
//     value: number;
// }

// interface Options {
//     width?: number;
//     height?: number;
//     initDelay?: number;
//     duration?: number;
// }

// interface ArcDatum {
//     innerRadius: number;
//     outerRadius: number;
//     startAngle: number;
//     endAngle: number;
// }

// function DevtoolGaugeChart(
//     container: HTMLDivElement | null,
//     { data = [], options = {} }: { data: Data[]; options: Options }
// ) {
//     if (!container) return { update: () => {} };

//     const width = options.width || 200;
//     const height = options.height || 200;
//     const radiusArc = Math.min(height, width) / 2;
//     const minVal = 0;
//     const maxVal = 1 + minVal;
//     const initDelay = options.initDelay || 250;
//     const duration = options.duration || 700;
//     const startValue = 0;
//     const tau = 2 * Math.PI;

//     const arc: d3.Arc<any, ArcDatum> = d3
//         .arc<ArcDatum>()
//         .innerRadius(radiusArc - 12)
//         .outerRadius(radiusArc)
//         .startAngle(0)
//         .endAngle((d) => d.endAngle);

//     const svg = d3
//         .select(container)
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`);

//     svg.append("path")
//         .datum({ endAngle: tau })
//         .style("fill", "#ddd")
//         .attr("d", arc as any);

//     const foreground = svg
//         .append("path")
//         .datum({ endAngle: minVal * tau })
//         .attr("d", arc as any);

//     const value = svg
//         .append("text")
//         .attr("text-anchor", "middle")
//         .attr("dy", "0.35em")
//         .style("font-size", "2em")
//         .style("fill", "#fff")
//         .text(`${(startValue * 100).toFixed(0)}%`);

//     value
//         .append("tspan")
//         .attr("dx", "0.2em")
//         .attr("dy", "-1.2em")
//         .style("font-size", "0.7em")
//         .style("fill", "#fff")
//         .text("%");

//     // Add delta indicators
//     const deltaGroup = svg.append("g").attr("transform", "translate(0, 30)");

//     const deltaNumber = deltaGroup
//         .append("text")
//         .attr("text-anchor", "middle")
//         .attr("dy", "0.35em")
//         .style("font-size", "1em")
//         .style("fill", "#fff");

//     const deltaCaretPositive = deltaGroup
//         .append("polygon")
//         .attr("points", "5,15 10,5 15,15")
//         .attr("fill", "#24a148")
//         .attr("transform", "translate(-30, 0)")
//         .attr("visibility", "hidden");

//     const deltaCaretNegative = deltaGroup
//         .append("polygon")
//         .attr("points", "5,5 10,15 15,5")
//         .attr("fill", "#da1e28")
//         .attr("transform", "translate(-30, 0)")
//         .attr("visibility", "hidden");

//     const colorScale = d3
//         .scaleLinear<string>()
//         .domain([0, 0.5, 1])
//         .range(["#da1e28", "#f1c21b", "#24a148"]);

//     function arcTween(newAngle: number) {
//         return function (d: any) {
//             const interpolate = d3.interpolate(d.endAngle, newAngle);
//             return function (t: number) {
//                 d.endAngle = interpolate(t);
//                 return arc(d as ArcDatum)!;
//             };
//         };
//     }

//     function update(data: Data[]) {
//         const newAngle = data[0].value * tau;
//         const color = colorScale(data[0].value);

//         foreground
//             .transition()
//             .duration(duration)
//             .attrTween("d", arcTween(newAngle))
//             .style("fill", color);

//         value
//             .transition()
//             .duration(duration)
//             .tween("text", function () {
//                 const i = d3.interpolateNumber(
//                     parseFloat(value.text()),
//                     data[0].value * 100
//                 );
//                 return function (t: number) {
//                     value.text(`${i(t).toFixed(0)}%`);
//                 };
//             });

//         // Update delta number and caret
//         const deltaValue = data[1].value * 100;
//         deltaNumber.text(`${deltaValue.toFixed(2)}%`);
//         if (deltaValue > 0) {
//             deltaCaretPositive.attr("visibility", "visible");
//             deltaCaretNegative.attr("visibility", "hidden");
//         } else if (deltaValue < 0) {
//             deltaCaretPositive.attr("visibility", "hidden");
//             deltaCaretNegative.attr("visibility", "visible");
//         } else {
//             deltaCaretPositive.attr("visibility", "hidden");
//             deltaCaretNegative.attr("visibility", "hidden");
//         }
//     }

//     setTimeout(() => {
//         update(data);
//     }, initDelay);

//     return { update };
// }

// const Milestone: React.FC = () => {
//     const chartContainerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const data: Data[] = [
//             {
//                 group: "value",
//                 value: Number(Math.random().toFixed(2)),
//             },
//             {
//                 group: "delta",
//                 value: 0,
//             },
//         ];

//         const options: Options = {
//             width: 200,
//             height: 200,
//             initDelay: 250,
//             duration: 700,
//         };

//         const chart = DevtoolGaugeChart(chartContainerRef.current, {
//             data,
//             options,
//         });

//         const interval = window.setInterval(() => {
//             const newValue = Number(Math.random().toFixed(2));

//             data[1].value = newValue - data[0].value;
//             data[0].value = newValue;

//             chart.update(data);
//         }, 3000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="h-screen flex justify-center items-center bg-gray-300/50">
//             <div ref={chartContainerRef} className="chart-container"></div>
//         </div>
//     );
// };

// export default Milestone;

// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

// interface Data {
//     group: string;
//     value: number;
// }

// interface Options {
//     width?: number;
//     height?: number;
//     initDelay?: number;
//     duration?: number;
// }

// interface ArcDatum {
//     innerRadius: number;
//     outerRadius: number;
//     startAngle: number;
//     endAngle: number;
// }

// function DevtoolGaugeChart(
//     container: HTMLDivElement | null,
//     { data = [], options = {} }: { data: Data[]; options: Options }
// ) {
//     if (!container) return { update: () => {} };

//     const width = options.width || 200;
//     const height = options.height || 200;
//     const radiusArc = Math.min(height, width) / 2;
//     const tau = 2 * Math.PI;
//     const initDelay = options.initDelay || 0;
//     const duration = options.duration || 0;

//     const arc: d3.Arc<any, ArcDatum> = d3
//         .arc<ArcDatum>()
//         .innerRadius(radiusArc - 12)
//         .outerRadius(radiusArc)
//         .startAngle(0)
//         .endAngle((d) => d.endAngle);

//     const svg = d3
//         .select(container)
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`);

//     svg.append("path")
//         .datum({ endAngle: tau })
//         .style("fill", "#ddd")
//         .attr("d", arc as any);

//     const foreground = svg
//         .append("path")
//         .datum({ endAngle: 0 })
//         .attr("class", "foreground")
//         .attr("d", arc as any);

//     const value = svg
//         .append("text")
//         .attr("class", "value-text")
//         .attr("text-anchor", "middle")
//         .attr("dy", "-0.5em")
//         .style("font-size", "2em")
//         .style("fill", "#fff")
//         .text(`0%`);

//     const delta = svg
//         .append("text")
//         .attr("class", "delta-text")
//         .attr("text-anchor", "middle")
//         .attr("dy", "1.5em")
//         .style("font-size", "1em")
//         .style("fill", "#fff")
//         .text(`0.00%`);

//     const deltaCaretPositive = svg
//         .append("polygon")
//         .attr("points", "5,15 10,5 15,15")
//         .attr("fill", "#24a148")
//         .attr("transform", "translate(-30, 30)")
//         .attr("visibility", "hidden");

//     const deltaCaretNegative = svg
//         .append("polygon")
//         .attr("points", "5,5 10,15 15,5")
//         .attr("fill", "#da1e28")
//         .attr("transform", "translate(-30, 30)")
//         .attr("visibility", "hidden");

//     const colorScale = d3
//         .scaleLinear<string>()
//         .domain([0, 0.5, 1])
//         .range(["#da1e28", "#f1c21b", "#24a148"]);

//     function arcTween(newAngle: number) {
//         return function (d: any) {
//             const interpolate = d3.interpolate(d.endAngle, newAngle);
//             return function (t: number) {
//                 d.endAngle = interpolate(t);
//                 return arc(d as ArcDatum)!;
//             };
//         };
//     }

//     function update(data: Data[], previousValue: number) {
//         const newAngle = data[0].value * tau;
//         const color = colorScale(data[0].value);

//         foreground
//             .transition()
//             .duration(duration)
//             .attrTween("d", arcTween(newAngle))
//             .style("fill", color);

//         value
//             .transition()
//             .duration(duration)
//             .tween("text", function () {
//                 const i = d3.interpolateNumber(
//                     parseFloat(value.text()),
//                     data[0].value * 100
//                 );
//                 return function (t: number) {
//                     value.text(`${i(t).toFixed(0)}%`);
//                 };
//             });

//         const deltaValue = (data[0].value - previousValue) * 100;
//         delta.text(`${deltaValue.toFixed(2)}%`);
//         if (deltaValue > 0) {
//             deltaCaretPositive.attr("visibility", "visible");
//             deltaCaretNegative.attr("visibility", "hidden");
//         } else if (deltaValue < 0) {
//             deltaCaretPositive.attr("visibility", "hidden");
//             deltaCaretNegative.attr("visibility", "visible");
//         } else {
//             deltaCaretPositive.attr("visibility", "hidden");
//             deltaCaretNegative.attr("visibility", "hidden");
//         }
//     }

//     setTimeout(() => {
//         update(data, 0);
//     }, initDelay);

//     return { update };
// }

// const Milestone: React.FC = () => {
//     const chartContainerRef = useRef<HTMLDivElement>(null);
//     const valueSliderRef = useRef<HTMLInputElement>(null);
//     const [initialValue, setInitialValue] = useState(0);

//     useEffect(() => {
//         const data: Data[] = [
//             {
//                 group: "value",
//                 value: 0,
//             },
//             {
//                 group: "delta",
//                 value: 0,
//             },
//         ];

//         const options: Options = {
//             width: 200,
//             height: 200,
//             initDelay: 0,
//             duration: 0,
//         };

//         const chart = DevtoolGaugeChart(chartContainerRef.current, {
//             data,
//             options,
//         });

//         const valueSlider = valueSliderRef.current;

//         if (valueSlider) {
//             valueSlider.value = String(data[0].value * 100);

//             valueSlider.addEventListener("mousedown", () => {
//                 setInitialValue(data[0].value);
//             });

//             valueSlider.addEventListener("input", () => {
//                 const newValue = Number(valueSlider.value) / 100;
//                 const previousValue = data[0].value;
//                 data[0].value = newValue;
//                 data[1].value = newValue - initialValue;

//                 if (chart) {
//                     chart.update(data, previousValue);
//                 }
//             });

//             valueSlider.addEventListener("mouseup", () => {
//                 const newValue = Number(valueSlider.value) / 100;
//                 setInitialValue(newValue);
//             });
//         }
//     }, []);

//     return (
//         <div className="h-screen flex flex-col justify-center items-center bg-gray-300/50">
//             <div ref={chartContainerRef} className="chart-container"></div>
//             <div className="mt-8 flex space-x-4">
//                 <label htmlFor="valueSlider">Value Slider</label>
//                 <input
//                     id="valueSlider"
//                     ref={valueSliderRef}
//                     type="range"
//                     min="0"
//                     max="100"
//                     className="w-48"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Milestone;

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Data {
    group: string;
    value: number;
}

interface Options {
    width?: number;
    height?: number;
    initDelay?: number;
    duration?: number;
}

interface ArcDatum {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
}

const ProgressCircle: React.FC<{
    value: number;
    width: number;
    height: number;
}> = ({ value, width, height }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const radiusArc = Math.min(height, width) / 2;
    const tau = 2 * Math.PI;
    const arcRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const svg = d3
            .select(containerRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arc = d3
            .arc<ArcDatum>()
            .innerRadius(radiusArc - 12)
            .outerRadius(radiusArc)
            .startAngle(0)
            .endAngle((d) => d.endAngle);

        svg.append("path")
            .datum({ endAngle: tau } as ArcDatum)
            .style("fill", "#ddd")
            .attr("d", arc as any);

        arcRef.current = svg
            .append("path")
            .datum({ endAngle: 0 } as ArcDatum)
            .attr("class", "foreground")
            .attr("d", arc as any);

        return () => {
            d3.select(containerRef.current).selectAll("*").remove();
        };
    }, [width, height, tau, radiusArc]);

    useEffect(() => {
        if (!arcRef.current) return;

        const arc = d3
            .arc<ArcDatum>()
            .innerRadius(radiusArc - 12)
            .outerRadius(radiusArc)
            .startAngle(0)
            .endAngle((d) => d.endAngle);

        function arcTween(newAngle: number) {
            return function (d: ArcDatum) {
                const interpolate = d3.interpolate(d.endAngle, newAngle);
                return function (t: number) {
                    d.endAngle = interpolate(t);
                    return arc(d)!;
                };
            };
        }

        const newAngle = value * tau;
        arcRef.current
            .transition()
            .duration(0)
            .attrTween("d", arcTween(newAngle) as any)
            .style(
                "fill",
                d3
                    .scaleLinear<string>()
                    .domain([0, 0.5, 1])
                    .range(["#da1e28", "#f1c21b", "#24a148"])(value) as any
            );
    }, [value, tau, radiusArc]);

    return <div ref={containerRef}></div>;
};

const PercentageValue: React.FC<{ value: number }> = ({ value }) => (
    <text
        className="value-text"
        textAnchor="middle"
        y="0"
        dy="0.35em"
        style={{ fontSize: "2em", fill: "#fff" }}
    >
        {value.toFixed(0)}%
    </text>
);

const DeltaArrow: React.FC<{ delta: number }> = ({ delta }) => (
    <polygon
        points={delta > 0 ? "5,15 10,5 15,15" : "5,5 10,15 15,5"}
        fill={delta > 0 ? "#24a148" : "#da1e28"}
        transform="translate(0, 30)"
        visibility={delta === 0 ? "hidden" : "visible"}
    />
);

const DeltaPercentage: React.FC<{ delta: number }> = ({ delta }) => (
    <text
        className="delta-text"
        textAnchor="middle"
        y="30"
        dy="0.35em"
        style={{ fontSize: "1em", fill: "#fff" }}
    >
        {delta.toFixed(2)}%
    </text>
);

const Milestone: React.FC = () => {
    const [value, setValue] = useState<number>(0);
    const [initialValue, setInitialValue] = useState<number>(0);
    const [deltaValue, setDeltaValue] = useState<number>(0);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value) / 100;
        const previousValue = value;
        setValue(newValue);
        const delta = (newValue - previousValue) * 100;
        setDeltaValue(delta);
    };

    const handleSliderMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        const newValue = Number((e.target as HTMLInputElement).value) / 100;
        setInitialValue(newValue);
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-300/50">
            <div className="relative">
                <ProgressCircle value={value} width={200} height={200} />
                <svg className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <g transform="translate(100, 100)">
                        <PercentageValue value={value * 100} />
                        <DeltaArrow delta={deltaValue} />
                        <DeltaPercentage delta={deltaValue} />
                    </g>
                </svg>
            </div>
            <div className="mt-8 flex space-x-4">
                <label htmlFor="valueSlider">Value Slider</label>
                <input
                    id="valueSlider"
                    type="range"
                    min="0"
                    max="100"
                    className="w-48"
                    value={value * 100}
                    onMouseDown={() => setInitialValue(value)}
                    onChange={handleSliderChange}
                    onMouseUp={handleSliderMouseUp}
                />
            </div>
        </div>
    );
};

export default Milestone;
