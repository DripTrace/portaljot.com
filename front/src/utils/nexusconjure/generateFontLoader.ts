const fs = require("fs");
const path = require("path");

interface FontVariant {
    weight: string;
    style: string;
    path: string;
    varName: string;
}

interface FontDeclaration {
    name: string;
    category: string;
    variants: FontVariant[];
}

const TEXT_DIR = path.join(process.cwd(), "src/styles/text/");
const OUTPUT_FILE = path.join(process.cwd(), "src/lib/generated/fontLoader.ts");

function getWeightFromFilename(filename: string): string {
    const weights = {
        Thin: "100",
        ExtraLight: "200",
        Light: "300",
        Regular: "400",
        Medium: "500",
        SemiBold: "600",
        Bold: "700",
        ExtraBold: "800",
        Black: "900",
    };

    const name = filename.replace(/[^a-zA-Z]/g, "");
    for (const [weight, value] of Object.entries(weights)) {
        if (name.includes(weight)) return value;
    }
    return "400";
}

function generateFontDeclarations(): string {
    let declarations = `import localFont from 'next/font/local';\n\n`;
    const instances: FontDeclaration[] = [];
    const declaredVarNames = new Set<string>();

    function getUniqueVarName(
        baseName: string,
        weight: string,
        style: string
    ): string {
        const baseVarName = `font_${baseName}_${weight}${style === "italic" ? "_italic" : ""}`;
        let varName = baseVarName;
        let counter = 1;
        while (declaredVarNames.has(varName)) {
            varName = `${baseVarName}_${counter}`;
            counter++;
        }
        declaredVarNames.add(varName);
        return varName;
    }

    function scanDirectory(dir: string) {
        const items = fs.readdirSync(dir);

        items.forEach((item: string) => {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                const staticDir = path.join(fullPath, "static");
                const fontDir = fs.existsSync(staticDir) ? staticDir : fullPath;
                const fontFiles = fs
                    .readdirSync(fontDir)
                    .filter((file: string) => file.endsWith(".ttf"));

                if (fontFiles.length > 0) {
                    const variants: FontVariant[] = [];
                    const fontName = item.replace(/_/g, " ");

                    fontFiles.forEach((file: string) => {
                        const relativePath = path
                            .relative(process.cwd(), path.join(fontDir, file))
                            .replace("src/", "../../");

                        const isItalic = file.toLowerCase().includes("italic");
                        const weight = getWeightFromFilename(file);
                        const varName = getUniqueVarName(
                            item.replace(/[^a-zA-Z0-9]/g, "_"),
                            weight,
                            isItalic ? "italic" : "normal"
                        );

                        declarations += `const ${varName} = localFont({ src: '${relativePath}' });\n`;

                        variants.push({
                            weight,
                            style: isItalic ? "italic" : "normal",
                            path: relativePath,
                            varName,
                        });
                    });

                    instances.push({
                        name: fontName,
                        category: path
                            .basename(path.dirname(fullPath))
                            .replace("_", "")
                            .toLowerCase(),
                        variants,
                    });
                }
            }
        });
    }

    scanDirectory(TEXT_DIR);

    declarations += `\nexport const fontInstances = {\n`;
    instances.forEach((font) => {
        declarations += `  '${font.name}': {\n`;
        declarations += `    name: '${font.name}',\n`;
        declarations += `    category: '${font.category}',\n`;
        declarations += `    variants: [\n`;
        font.variants.forEach((variant) => {
            declarations += `      {\n`;
            declarations += `        weight: '${variant.weight}',\n`;
            declarations += `        style: '${variant.style}',\n`;
            declarations += `        className: ${variant.varName}.className\n`;
            declarations += `      },\n`;
        });
        declarations += `    ]\n`;
        declarations += `  },\n`;
    });
    declarations += `};\n`;

    return declarations;
}

const generatedCode = generateFontDeclarations();
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, generatedCode);

// function getUniqueVarName(baseName: string, weight: string, style: string, index: number): string {
//     return `font_${baseName}_${weight}_${style}_${index}`;
// }

// // When creating variants
// fontFiles.forEach((file, index) => {
//     const isItalic = file.toLowerCase().includes('italic');
//     const weight = getWeightFromFilename(file);
//     const varName = getUniqueVarName(
//         item.replace(/[^a-zA-Z0-9]/g, "_"),
//         weight,
//         isItalic ? "italic" : "normal",
//         index
//     );
//     // ... rest of the code
// });
