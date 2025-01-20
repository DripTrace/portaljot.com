// src/lib/utils/getFonts.ts
import * as fs from "fs";
import * as path from "path";

export interface FontInfo {
    name: string;
    path: string;
    category: string;
}

function parseFontDirectory(baseDir: string): FontInfo[] {
    const fonts: FontInfo[] = [];

    function traverse(dir: string) {
        const items = fs.readdirSync(dir);

        items.forEach((item) => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (item.endsWith(".ttf")) {
                const relativePath = path.relative(process.cwd(), fullPath);
                const fontName = path
                    .basename(path.dirname(fullPath))
                    .replace(/_/g, " ");
                const category = path
                    .basename(path.dirname(path.dirname(fullPath)))
                    .replace("_", "")
                    .toLowerCase();

                fonts.push({
                    name: fontName,
                    path: `../../${relativePath}`, // Adjust path for Next.js font loading
                    category: category === "text" ? "default" : category,
                });
            }
        });
    }

    traverse(baseDir);
    return fonts;
}

export function getFontPaths(): FontInfo[] {
    const TEXT_DIR = path.join(process.cwd(), "src/styles/text");
    return parseFontDirectory(TEXT_DIR);
}
