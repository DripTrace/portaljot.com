"use client";

import {
    faArrowsAltH,
    faEraser,
    faMagic,
    faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BrushPreview from "./BrushPreview";

interface ToolbarProps {
    currentWidth: number;
    currentColor: string;
    handleDownload: () => void;
    dateUrl: string;
    handleClear: () => void;
    handleSpecialMode: () => void;
    handleEraserMode: () => void;
    setAutoWidth: () => void;
    handleRegularMode: () => void;
    handleColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentSaturation: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentLightness: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isRegularMode: boolean;
    isAutoWidth: boolean;
    isEraser: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
    currentWidth,
    currentColor,
    handleDownload,
    dateUrl,
    handleClear,
    handleSpecialMode,
    handleEraserMode,
    setAutoWidth,
    handleRegularMode,
    handleColor,
    handleWidth,
    setCurrentSaturation,
    setCurrentLightness,
    isRegularMode,
    isAutoWidth,
    isEraser,
}) => {
    return (
        <aside>
            <div>
                <BrushPreview
                    currentWidth={currentWidth}
                    currentColor={currentColor}
                />
                <div className="tool-section tool-section--lrg">
                    <div className="tool-section">
                        <small>
                            <strong>Brush color</strong>
                        </small>
                    </div>
                    <input
                        disabled={!isRegularMode}
                        className="btn--color"
                        type="color"
                        id="toolColorPicker"
                        title="Choose brush color"
                        onChange={handleColor}
                    />
                </div>
                <div className="tool-section">
                    <small>
                        <strong>Tools</strong>
                    </small>
                </div>
                <div className="tool-grid tool-section tool-section--lrg">
                    <div>
                        <button
                            className={`btn btn--tool ${
                                isRegularMode && !isEraser ? "btn--active" : ""
                            }`}
                            onClick={handleRegularMode}
                            title="Regular Brush Mode"
                        >
                            <FontAwesomeIcon icon={faPaintBrush} />
                        </button>
                    </div>
                    <div>
                        <button
                            className={`btn btn--tool ${
                                !isRegularMode ? "btn--dream-active" : ""
                            }`}
                            onClick={handleSpecialMode}
                            title="Special Brush Mode"
                        >
                            <FontAwesomeIcon icon={faMagic} />
                        </button>
                    </div>
                    <div>
                        <button
                            className={`btn btn--tool ${
                                isEraser ? "btn--eraser-active" : ""
                            }`}
                            onClick={handleEraserMode}
                            title="Eraser Mode"
                        >
                            <FontAwesomeIcon icon={faEraser} />
                        </button>
                    </div>
                    <div>
                        <input
                            disabled={isEraser}
                            checked={isAutoWidth}
                            id="tool-autowidth"
                            type="checkbox"
                            onChange={setAutoWidth}
                            title="Dynamic brush size"
                        />{" "}
                        <label
                            htmlFor="tool-autowidth"
                            className={`btn btn--tool ${
                                isAutoWidth ? "btn--width-active" : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowsAltH} />
                        </label>
                    </div>
                </div>
                {!isAutoWidth && (
                    <div className="tool-section tool-section--lrg">
                        <div className="tool-section">
                            <small>
                                <strong>Brush size</strong>
                            </small>
                        </div>
                        <div className="tool-section">
                            <input
                                defaultValue="50"
                                type="range"
                                min="10"
                                max="90"
                                onChange={handleWidth}
                                title="Set brush size"
                            />
                        </div>
                    </div>
                )}
                {!isRegularMode && (
                    <div className="tool-section tool-section--lrg">
                        <div className="tool-section">
                            <small>
                                <strong>Magic brush</strong>
                            </small>
                        </div>
                        <div className="tool-section">
                            <label>
                                <small>Saturation</small>
                            </label>
                            <input
                                defaultValue="100"
                                type="range"
                                min="0"
                                max="100"
                                onChange={setCurrentSaturation}
                                title="Adjust saturation"
                            />
                        </div>
                        <label>
                            <small>Lightness</small>
                        </label>
                        <input
                            defaultValue="50"
                            type="range"
                            min="0"
                            max="100"
                            onChange={setCurrentLightness}
                            title="Adjust lightness"
                        />
                    </div>
                )}
            </div>
            <div>
                <a
                    className="btn btn--main btn--block"
                    download="image.png"
                    onClick={handleDownload}
                    href={dateUrl}
                    title="Save Image"
                >
                    Save Image
                </a>
                <button
                    className="btn btn--block"
                    onClick={handleClear}
                    title="Clear Canvas"
                >
                    Clear
                </button>
            </div>
        </aside>
    );
};

export default Toolbar;
