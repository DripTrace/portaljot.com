const fs = require("fs/promises");
const path = require("path");
const { execSync } = require("child_process");

const replacements = [
    // {
    // 	search: "The item/items/ scripts to search for, which could have $p3<!a Char4ct3rs.",
    // 	replace:
    // 		"This would be the $pecial or non-spectial charac+ter replacement(s).",
    // },
    {
        search: "To use our library, a <a href='https://surveyjs.io/licensing'>developer license</a> is required. If you have an active license, <a href='https://surveyjs.io/remove-alert-banner'>set up your license key</a> and ensure you're using the latest version.",
        // replace: "there is a license here",
        replace: "",
    },
    {
        search: "SurveyJS PDF | Please purchase a SurveyJS PDF developer license to use it in your app | https://surveyjs.io/Buy",
        // replace: "this is the other license",
        replace: "",
    },
    {
        search: "Please purchase a SurveyJS Analytics developer license to use it in your app.",
        // replace: "this is the license",
        replace: "",
    },
    {
        search: "haveCommercialLicense = false",
        replace: "haveCommercialLicense = true",
    },
    {
        search: "haveCommercialLicense: false",
        replace: "haveCommercialLicense: true",
    },
    {
        search: 'licenseBanner = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "svc-creator__banner" }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "svc-creator__non-commercial-text", dangerouslySetInnerHTML: htmlValue })));',
        replace: "licenseBanner = null;",
    },
];

async function replaceInFile(filePath) {
    // console.log(`Processing file: ${filePath}`);
    let content = await fs.readFile(filePath, "utf8");
    let modified = false;

    for (const { search, replace } of replacements) {
        const regex = new RegExp(
            search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
        );
        if (regex.test(content)) {
            content = content.replace(regex, replace);
            modified = true;
            console.log(`Match found and replaced in ${filePath}`);
        } else {
            // console.log(`No match found for "${search}" in ${filePath}`);
            continue;
        }
    }

    if (modified) {
        await fs.writeFile(filePath, content, "utf8");
        console.log(`Modified: ${filePath}\n`);
    } else {
        // console.log(`No modifications made to ${filePath}\n`);
        return;
    }
}

async function walkDir(dir) {
    const files = await fs.readdir(dir);
    const results = [];
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            results.push(...(await walkDir(filePath)));
        } else if (file.endsWith(".js")) {
            results.push(filePath);
        }
    }
    return results;
}

async function processTargetFiles() {
    const nodeModulesPath = path.join(process.cwd(), "node_modules");
    const directories = await fs.readdir(nodeModulesPath);
    for (const dir of directories) {
        if (dir.startsWith("survey-")) {
            const surveyDir = path.join(nodeModulesPath, dir);
            const files = await walkDir(surveyDir);
            for (const file of files) {
                try {
                    await replaceInFile(file);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error.message);
                }
            }
        }
    }
}

function getPackageManager() {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith("yarn")) {
            return "yarn";
        } else if (userAgent.startsWith("pnpm")) {
            return "pnpm";
        } else if (userAgent.startsWith("bun")) {
            return "pnpm";
        } else if (userAgent.startsWith("npm")) {
            return "npm";
        }
    }
    return "unknown";
}

console.log(`Current package manager: ${getPackageManager()}`);

async function main() {
    try {
        // console.log("Installing dependencies...");
        // execSync("pnpm install", { stdio: "inherit" });

        console.log("\nModifying SurveyJS files...");
        await processTargetFiles();

        // console.log("\n defining root domain . . .");
        // execSync(`${getPackageManager()} run split`);

        // console.log("\nBuild process completed successfully.");
        console.log("\nFile modification completed successfully.");
    } catch (error) {
        // console.error("Build process failed:", error);
        console.error("File modification failed:", error);
        process.exit(1);
    }
}

main();
