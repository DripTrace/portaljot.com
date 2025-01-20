// src/components/font/FontServer.tsx
import { loadFonts } from "@/actions/fontActions";

// Define the expected shape of data from loadFonts
interface LoadedFont {
    name: string;
    category: string;
    weight: string;
    className: string;
}

export async function FontServer() {
    const fonts = await loadFonts();

    return {
        fonts: fonts.map((font: LoadedFont) => ({
            name: font.name,
            category: font.category,
            weight: font.weight,
            className: font.className,
        })),
    };
}
