import * as fs from "fs/promises";
import * as path from "path";
import { execSync } from "child_process";

interface Replacement {
    search: string;
    replace: string;
}

const replacements: Replacement[] = [
    // {
    // 	search: "The item/items/ scripts to search for, which could have $p3<!a Char4ct3rs.",
    // 	replace:
    // 		"This would be the $pecial or non-spectial charac+ter replacement(s).",
    // },
    {
        search: "To use our library, a <a href='https://surveyjs.io/licensing'>developer license</a> is required. If you have an active license, <a href='https://surveyjs.io/remove-alert-banner'>set up your license key</a> and ensure you're using the latest version.",
        replace: "there is a license here",
    },
    {
        search: "SurveyJS PDF | Please purchase a SurveyJS PDF developer license to use it in your app | https://surveyjs.io/Buy",
        replace: "this is the other license",
    },
    {
        search: "Please purchase a SurveyJS Analytics developer license to use it in your app.",
        replace: "this is the license",
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

async function replaceInFile(filePath: string): Promise<void> {
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

async function walkDir(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    const results: string[] = [];
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

async function processTargetFiles(): Promise<void> {
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
                    console.error(
                        `Error processing ${file}:`,
                        (error as Error).message
                    );
                }
            }
        }
    }
}

async function main(): Promise<void> {
    try {
        console.log("Installing dependencies...");
        execSync("pnpm install", { stdio: "inherit" });

        console.log("\nModifying SurveyJS files...");
        await processTargetFiles();

        console.log("\nBuilding the project...");
        execSync("pnpm run build", { stdio: "inherit" });

        // console.log("\nRemoving generated next.config.js...");
        // execSync("rm next.config.js", { stdio: "inherit" });

        console.log("\nBuild process completed successfully.");
    } catch (error) {
        console.error("Build process failed:", error);
        process.exit(1);
    }
}

main();
