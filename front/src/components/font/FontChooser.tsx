"use client";

import { useState, useEffect } from "react";
import { fontInstances } from "@/lib/generated/fontLoader";

interface FontInstance {
    name: string;
    category: string;
    variants: FontVariant[];
}

interface FontVariant {
    weight: string;
    style: string;
    className: string;
}

interface FontChooserProps {
    onFontSelect: (font: string, weight: string) => void;
}

export function FontChooser({ onFontSelect }: FontChooserProps) {
    const [selectedFont, setSelectedFont] = useState<string>("");
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const [previewText, setPreviewText] = useState(
        "The quick brown fox jumps over the lazy dog"
    );
    const fonts = Object.values(fontInstances as Record<string, FontInstance>);

    useEffect(() => {
        if (fonts.length > 0 && !selectedFont) {
            const randomIndex = Math.floor(Math.random() * fonts.length);
            const randomFont = fonts[randomIndex];
            // Sort variants by weight and get the lightest one
            const sortedVariants = [...randomFont.variants].sort(
                (a, b) => parseInt(a.weight) - parseInt(b.weight)
            );
            const defaultVariant = sortedVariants[0];

            setSelectedFont(randomFont.name);
            setSelectedVariant(defaultVariant.weight);
            onFontSelect(randomFont.name, defaultVariant.weight);
        }
    }, [fonts, selectedFont, onFontSelect]);

    const getCurrentFont = () => fonts.find((f) => f.name === selectedFont);
    const getCurrentVariant = () =>
        getCurrentFont()?.variants.find((v) => v.weight === selectedVariant);

    const getDefaultVariant = (font: FontInstance) => {
        return [...font.variants].sort(
            (a, b) => parseInt(a.weight) - parseInt(b.weight)
        )[0];
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 z-10">
                <input
                    type="text"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    className={`w-full p-3 bg-gray-800 text-white rounded border border-gray-700 text-xl ${getCurrentVariant()?.className}`}
                />
            </div>

            <div className="p-4 border rounded-lg shadow-sm bg-gray-900 text-white">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {fonts.map((font) => {
                        const defaultVariant = getDefaultVariant(font);
                        return (
                            <div
                                key={font.name}
                                className="p-3 rounded hover:bg-gray-800 transition-colors"
                            >
                                {font.variants.length > 1 ? (
                                    <select
                                        onChange={(e) => {
                                            setSelectedFont(font.name);
                                            setSelectedVariant(e.target.value);
                                            onFontSelect(
                                                font.name,
                                                e.target.value
                                            );
                                        }}
                                        value={
                                            selectedFont === font.name
                                                ? selectedVariant
                                                : defaultVariant.weight
                                        }
                                        className="w-full bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-0 border-none"
                                    >
                                        {font.variants.map((variant, index) => (
                                            <option
                                                key={`${font.name}-${variant.weight}-${variant.style}-${index}`}
                                                value={variant.weight}
                                                className={variant.className}
                                            >
                                                {font.name} - {variant.weight}{" "}
                                                {variant.style !== "normal"
                                                    ? "Italic"
                                                    : ""}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSelectedFont(font.name);
                                            setSelectedVariant(
                                                defaultVariant.weight
                                            );
                                            onFontSelect(
                                                font.name,
                                                defaultVariant.weight
                                            );
                                        }}
                                        className="w-full text-left"
                                    >
                                        <span
                                            className={defaultVariant.className}
                                        >
                                            {font.name}
                                        </span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
