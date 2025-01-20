const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Function to run a command and log its output
function runCommand(command) {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error);
        process.exit(1);
    }
}

// Function to set the app context and get the port
function setAppContextAndGetPort() {
    const setAppContextPath = path.join(__dirname, "set-app-context.sh");
    if (fs.existsSync(setAppContextPath)) {
        const result = execSync(`bash ${setAppContextPath}`).toString().trim();
        console.log(result);
        const portMatch = result.match(/Port set to: (\d+)/);
        if (portMatch) {
            return portMatch[1];
        }
    } else {
        console.error(
            "set-app-context.sh not found. Make sure it exists in the project root."
        );
        process.exit(1);
    }
    return null;
}

// Determine if we're in production based on NODE_ENV
const isProduction = process.env.NODE_ENV === "production";

// Set the app context and get the port
const port = setAppContextAndGetPort();

if (!port) {
    console.error(
        "Failed to determine the port. Check set-app-context.sh script."
    );
    process.exit(1);
}

// Run the appropriate command based on the environment
if (isProduction) {
    console.log(`Starting app in production mode on port ${port}...`);
    runCommand("next build");
    runCommand(`next start -p ${port}`);
} else {
    console.log(`Starting app in development mode on port ${port}...`);
    runCommand(`next dev -p ${port}`);
}
