var fs = require("fs");
var path = require("path");
var TEXT_DIR = path.join(process.cwd(), "src/styles/text/");
var OUTPUT_FILE = path.join(process.cwd(), "src/lib/generated/fontLoader.ts");
function getWeightFromFilename(filename) {
    var weights = {
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
    var name = filename.replace(/[^a-zA-Z]/g, "");
    for (var _i = 0, _a = Object.entries(weights); _i < _a.length; _i++) {
        var _b = _a[_i], weight = _b[0], value = _b[1];
        if (name.includes(weight))
            return value;
    }
    return "400";
}
function generateFontDeclarations() {
    var declarations = "import localFont from 'next/font/local';\n\n";
    var instances = [];
    var declaredVarNames = new Set();
    function getUniqueVarName(baseName, weight, style) {
        var baseVarName = "font_".concat(baseName, "_").concat(weight).concat(style === "italic" ? "_italic" : "");
        var varName = baseVarName;
        var counter = 1;
        while (declaredVarNames.has(varName)) {
            varName = "".concat(baseVarName, "_").concat(counter);
            counter++;
        }
        declaredVarNames.add(varName);
        return varName;
    }
    function scanDirectory(dir) {
        var items = fs.readdirSync(dir);
        items.forEach(function (item) {
            var fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                var staticDir = path.join(fullPath, "static");
                var fontDir_1 = fs.existsSync(staticDir) ? staticDir : fullPath;
                var fontFiles = fs
                    .readdirSync(fontDir_1)
                    .filter(function (file) { return file.endsWith(".ttf"); });
                if (fontFiles.length > 0) {
                    var variants_1 = [];
                    var fontName = item.replace(/_/g, " ");
                    fontFiles.forEach(function (file) {
                        var relativePath = path
                            .relative(process.cwd(), path.join(fontDir_1, file))
                            .replace("src/", "../../");
                        var isItalic = file.toLowerCase().includes("italic");
                        var weight = getWeightFromFilename(file);
                        var varName = getUniqueVarName(item.replace(/[^a-zA-Z0-9]/g, "_"), weight, isItalic ? "italic" : "normal");
                        declarations += "const ".concat(varName, " = localFont({ src: '").concat(relativePath, "' });\n");
                        variants_1.push({
                            weight: weight,
                            style: isItalic ? "italic" : "normal",
                            path: relativePath,
                            varName: varName,
                        });
                    });
                    instances.push({
                        name: fontName,
                        category: path
                            .basename(path.dirname(fullPath))
                            .replace("_", "")
                            .toLowerCase(),
                        variants: variants_1,
                    });
                }
            }
        });
    }
    scanDirectory(TEXT_DIR);
    declarations += "\nexport const fontInstances = {\n";
    instances.forEach(function (font) {
        declarations += "  '".concat(font.name, "': {\n");
        declarations += "    name: '".concat(font.name, "',\n");
        declarations += "    category: '".concat(font.category, "',\n");
        declarations += "    variants: [\n";
        font.variants.forEach(function (variant) {
            declarations += "      {\n";
            declarations += "        weight: '".concat(variant.weight, "',\n");
            declarations += "        style: '".concat(variant.style, "',\n");
            declarations += "        className: ".concat(variant.varName, ".className\n");
            declarations += "      },\n";
        });
        declarations += "    ]\n";
        declarations += "  },\n";
    });
    declarations += "};\n";
    return declarations;
}
var generatedCode = generateFontDeclarations();
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, generatedCode);
