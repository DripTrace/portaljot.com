// src/lib/utils/fontLoader.ts
import localFont from "next/font/local";
import * as fs from "fs";
import * as path from "path";

export interface FontData {
    name: string;
    weight: string;
    className: string;
    category: string;
}

const TEXT_DIR = path.join(process.cwd(), "src/styles/text/");

// Create static font declarations at module scope
const aldrich = localFont({
    src: "Aldrich-Regular.ttf",
});

const akayaKanadaka = localFont({
    src: "AkayaKanadaka-Regular.ttf",
});

// Export the fonts array
export const fonts = [
    {
        name: "Aldrich",
        category: "display",
        weight: "regular",
        className: aldrich.className,
    },
    {
        name: "Akaya Kanadaka",
        category: "display",
        weight: "regular",
        className: akayaKanadaka.className,
    },
];
