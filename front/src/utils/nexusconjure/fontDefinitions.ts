// src/lib/utils/fontDefinitions.ts
import path from "path";
import fs from "fs";

export interface FontFile {
    name: string;
    relativePath: string;
    weight: string;
}

const baseDir = path.join(process.cwd(), "styles", "text");

function scanDirectory(dir: string): FontFile[] {
    const fontFiles: FontFile[] = [];

    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                fontFiles.push(...scanDirectory(fullPath));
            } else if (file.endsWith(".ttf")) {
                const nameWithoutExt = path.basename(file, ".ttf");
                const [name, weight = "regular"] = nameWithoutExt.split("-");

                fontFiles.push({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    relativePath: `.${fullPath.replace(process.cwd(), "")}`,
                    weight: weight.toLowerCase(),
                });
            }
        }
    } catch (error) {
        console.error("Error scanning fonts directory:", error);
    }

    return fontFiles;
}

export const fontDefinitions = scanDirectory(baseDir);
