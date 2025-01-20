// src/actions/fontActions.ts
import localFont from "next/font/local";
import type { NextFont } from "next/dist/compiled/@next/font";

interface FontResponse {
    name: string;
    path: string;
    category: string;
}

interface FontData {
    name: string;
    category: string;
    weight: string;
    className: string;
}

type FontInstanceMap = {
    [key: string]: NextFont;
};

// Declare each font loader separately at module scope
const aldrich = localFont({
    src: "Aldrich-Regular.ttf", // Remove the 'src' prefix
});

const amaticsc = localFont({ src: "AmaticSC-Regular.ttf" });
// const akayaKanadaka = localFont({
//     src: "./styles/text/Akaya_Kanadaka/AkayaKanadaka-Regular.ttf",
// });
// ... other fonts

// Then create the instances map using the declared loaders
const fontInstances: FontInstanceMap = {
    "Aldrich-Regular": aldrich,
    Amatic_SC: amaticsc,
    // Akaya_Kanadaka: akayaKanadaka,
    // ... other fonts
};

export async function loadFonts() {
    try {
        console.log(process.cwd());

        const response = await fetch("http://localhost:420/api/font");
        if (!response.ok) throw new Error("Failed to fetch fonts");
        const fonts: FontResponse[] = await response.json();

        return fonts.map(
            (font: FontResponse): FontData => ({
                name: font.name,
                category: font.category,
                weight: "regular",
                className: fontInstances[font.name]?.className || "",
            })
        );
    } catch (error) {
        console.error("Error loading fonts:", error);
        return [];
    }
}
