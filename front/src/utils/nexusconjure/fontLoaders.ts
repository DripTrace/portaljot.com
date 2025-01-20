// src/lib/utils/fontLoader.ts
import localFont from "next/font/local";
import { fontDefinitions, FontFile } from "./fontDefinitions";

export interface FontData {
    name: string;
    weight: string;
    className: string;
}

// Explicitly declare each font instance
const font1 = localFont({
    src: "./styles/text/font1.ttf",
    weight: "400",
});

const font2 = localFont({
    src: "./styles/text/font2.ttf",
    weight: "700",
});

// Add more font declarations as needed

const fontLoaders = [
    {
        name: "Font1",
        weight: "regular",
        className: font1.className,
    },
    {
        name: "Font2",
        weight: "bold",
        className: font2.className,
    },
];

export function getFonts(): FontData[] {
    return fontLoaders;
}
