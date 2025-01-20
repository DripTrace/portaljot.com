"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontLoaders = void 0;
exports.getFonts = getFonts;
// src/lib/utils/fontLoader.ts
var local_1 = require("next/font/local");
var fs = require("fs");
var path = require("path");
var TEXT_DIR = path.join(process.cwd(), "src/styles/text");
// Get all font files recursively
var getFontPaths = function (dir) {
    var results = [];
    var items = fs.readdirSync(dir);
    items.forEach(function (item) {
        var fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            results.push.apply(results, getFontPaths(fullPath));
        }
        else if (item.endsWith(".ttf")) {
            var relativePath = ".".concat(fullPath.split("src")[1]);
            var name_1 = path
                .basename(item, ".ttf")
                .replace(/_/g, " ")
                .replace(/([A-Z])/g, " $1")
                .trim();
            var category = path.relative(TEXT_DIR, path.dirname(fullPath));
            results.push({
                path: relativePath,
                name: name_1,
                category: category || "default",
            });
        }
    });
    return results;
};
var fontPaths = getFontPaths(TEXT_DIR);
// Create static font instances
var fontInstances = fontPaths.map(function (font) { return (__assign(__assign({}, font), { instance: (0, local_1.default)({ src: font.path }) })); });
exports.fontLoaders = fontInstances.map(function (font) { return ({
    name: font.name,
    category: font.category,
    weight: "regular",
    className: font.instance.className,
}); });
function getFonts() {
    return exports.fontLoaders;
}
