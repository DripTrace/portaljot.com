// scripts/runGenerateManifest.js

const { execSync } = require("child_process");
const path = require("path");

try {
    execSync(
        'ts-node -O \'{"module":"commonjs"}\' ' +
            path.join(__dirname, "generateManifest.js"),
        { stdio: "inherit" }
    );
} catch (error) {
    console.error("Failed to generate manifest:", error);
    process.exit(1);
}
