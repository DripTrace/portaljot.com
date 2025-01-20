const fs = require("fs");
const path = require("path");

async function generateManifest() {
    try {
        const { manifestConfig, getManifestIcons } = await import(
            "../config/manifestConfig.ts"
        );

        Object.entries(manifestConfig).forEach(([domain, config]) => {
            const manifest = {
                name: config.name,
                short_name: config.shortName,
                description: config.description,
                start_url:
                    domain === "driptrace"
                        ? "/"
                        : `${
                              domain && domain === "fsclinicals"
                          } ? /${domain}/${domain}-landing : /${domain}/landing`,
                scope: "/",
                display: "standalone",
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                orientation: "portrait",
                icons: getManifestIcons(config.iconPrefix).map((icon) => ({
                    ...icon,
                    src: `/manifest-icons/${icon.src}`,
                })),
            };

            const manifestJson = JSON.stringify(manifest, null, 2);
            const outputPath = path.join(
                __dirname,
                "..",
                "public",
                `manifest_${domain}.webmanifest`
            );

            fs.writeFileSync(outputPath, manifestJson);
            console.log(`Generated manifest for ${domain} at ${outputPath}`);
        });
    } catch (error) {
        console.error("Error generating manifests:", error);
        process.exit(1);
    }
}

generateManifest();
