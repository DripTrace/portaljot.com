"use client";

import { useState, useRef } from "react";
import { SvgLoader } from "react-svgmt";

const Studio = () => {
    const reader = new FileReader();
    const ref = useRef(null);
    const [selectedSvg, setSelectedSvg] = useState<string | null>(null);

    const handleSvg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            reader.readAsText(selectedFile);

            reader.onload = (event) => {
                const text = event.target?.result as string;
                setSelectedSvg(() => text);
            };
        }
    };

    return (
        <div ref={ref}>
            <form
                className="flex flex-col items-center justify-center"
                method="post"
                action="/api/merchandise/designs"
                encType="multipart/form-data"
            >
                <div className="flex flex-col justify-center items-center">
                    <input
                        title="svg"
                        className="flex-1"
                        name="svg"
                        id="svg_file"
                        type="file"
                        accept=".svg"
                        onChange={handleSvg}
                    />
                    <input
                        name="name"
                        id="design_name"
                        type="text"
                        placeholder="Design Name"
                    />
                    <input
                        name="description"
                        id="design_description"
                        type="text"
                        placeholder="Design Description"
                    />

                    <div className="relative flex flex-col items-center justify-center h-[20em] w-[20em]">
                        {selectedSvg === null ? (
                            <SvgLoader
                                className="flex-1"
                                width="100%"
                                height="100%"
                                path="/merchandise/Grim2021.svg"
                            />
                        ) : (
                            <SvgLoader
                                className="flex-1"
                                id="selected-svg"
                                width="100%"
                                height="100%"
                                svgXML={selectedSvg}
                            />
                        )}
                    </div>

                    <input
                        className="input border-bottom-right-glass text-[#666] bg-white max-w-[100px] cursor-pointer mb-[20px] font-semibold"
                        type="submit"
                        value="upload"
                    />
                </div>
            </form>
        </div>
    );
};

export default Studio;
