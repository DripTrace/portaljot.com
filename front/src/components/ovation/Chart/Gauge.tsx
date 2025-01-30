import React, { useEffect, useRef, useState } from "react";
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
