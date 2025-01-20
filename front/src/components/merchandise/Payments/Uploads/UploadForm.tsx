"use client";

import { useState, ChangeEvent } from "react";
import ProgressBar from "./ProgressBar";

function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const types = ["image/png", "image/jpeg"];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? e.target.files[0] : null;

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            console.log("This is the selected image", selected);
            setError(null);
        } else {
            setFile(null);
            setError("Please select an image file (png or jpg)");
        }
    };

    return (
        <form>
            <label>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    );
}

export default UploadForm;
