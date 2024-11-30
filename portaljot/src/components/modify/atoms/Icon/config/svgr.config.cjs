import template from "./svgr-template.cjs";
import indexTemplate from "./svgr-index.cjs";

module.exports = {
    icon: true,
    typescript: true,
    template,
    indexTemplate,
    prettierConfig: {
        parser: "typescript",
    },
    ignoreExisting: true,
};
