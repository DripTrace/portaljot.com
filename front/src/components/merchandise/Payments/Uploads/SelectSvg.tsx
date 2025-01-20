"use client";

import { useRef, useState } from "react";
import SvgProgress from "./SvgProgress";
// @ts-ignore
import { SvgLoader } from "react-svgmt";

function SelectSvg() {
    const reader = new FileReader();
    const [selectedSvg, setSelectedSvg] = useState<string | ArrayBuffer | null>(
        null
    );
    const [selected, setSelected] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState(true);
    const [designData, setDesignData] = useState({});
    const [designName, setDesignName] = useState("");
    const [designDescription, setDesignDescription] = useState("");
    const descriptionRef: React.MutableRefObject<any> = useRef();
    const types = ["image/svg+xml"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0] || null;
        setSelected(selectedFile);
        if (selectedFile) {
            reader.readAsText(selectedFile);
        }

        reader.onload = (e) => {
            const text = e?.target?.result ?? null;
            setSelectedSvg(text);
            setEditing(false);
        };
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selected && types.includes(selected.type) && editing === false) {
            setFile(selected);
            console.log("this is the selected SVG", selected);
        } else {
            setFile(null);
            setError("Please select an svg");
        }
    };

    return (
        <form className="svg-form-container" onSubmit={handleSubmit}>
            <label className="svg-label-input">
                <input
                    className="svg-input"
                    type="file"
                    onChange={handleChange}
                />
                <span>+</span>
            </label>

            <input
                className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
                type="submit"
                value="Upload Design"
            />

            <input
                name="name"
                id="design_name"
                type="text"
                onChange={(e) => setDesignName(e.target.value)}
                value={designName}
                placeholder="Enter design name"
            />

            <input
                name="description"
                id="design_description"
                type="text"
                onChange={(e) => setDesignDescription(e.target.value)}
                value={designDescription}
                placeholder="Enter design description"
            />

            <div className="relative flex flex-col items-center justify-center h-[20em] w-[20em] border-2">
                {selectedSvg === null ? (
                    <div className="flex justify-center items center h-[10em] w-[10em]">
                        <SvgLoader
                            className="flex-1"
                            width="100%"
                            height="100%"
                            path="/Grim2021.svg"
                        />
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col justify-center items-center flex-1">
                        <div className="flex justify-center items center h-[10em] w-[10em]">
                            <SvgLoader
                                className="flex-1"
                                id="selected-svg"
                                width="100%"
                                height="100%"
                                svgXML={selectedSvg as string}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="svg-output-container">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && (
                    <SvgProgress
                        file={file}
                        setFile={setFile}
                        designData={designData}
                        setDesignData={setDesignData}
                        designName={designName}
                        setDesignName={setDesignName}
                        designDescription={designDescription}
                        setDesignDescription={setDesignDescription}
                    />
                )}
            </div>
        </form>
    );
}

export default SelectSvg;
