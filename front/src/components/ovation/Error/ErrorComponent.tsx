import React from "react";
import Gauge from "@/components/Chart/Gauge";
// import DynamicChart from './DynamicChart';

const ErrorComponent: React.FC = () => {
    // const chartData = {
    //     labels: [
    //         "January",
    //         "February",
    //         "March",
    //         "April",
    //         "May",
    //         "June",
    //         "July",
    //     ],
    //     datasets: [
    //         {
    //             label: "My First Dataset",
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //             fill: false,
    //             borderColor: "rgb(75, 192, 192)",
    //             tension: 0.1,
    //         },
    //     ],
    // };

    const chartOptions = {
        responsive: true,
        // other options...
    };

    return (
        <div>
            <h1>My Chart</h1>
            {/* <Gauge data={chartData} options={chartOptions} /> */}
            {/* <Gauge options={chartOptions} /> */}
            <Gauge />
        </div>
    );
};

export default ErrorComponent;
