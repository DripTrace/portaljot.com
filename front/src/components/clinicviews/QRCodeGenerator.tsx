// components/QRCodeGenerator.tsx
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator: React.FC = () => {
    const [data, setData] = useState<string>("");

    return (
        <div className="flex flex-col items-center space-y-6">
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter QR code data"
                className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col items-center">
                <QRCodeSVG value={data || " "} size={256} />
                {data && <p className="mt-4 text-sm font-semibold">{data}</p>}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
