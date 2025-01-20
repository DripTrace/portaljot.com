import { MetadataRoute } from "next";

export interface ManifestConfigItem {
    name: string;
    shortName: string;
    description: string;
    themeColor: string;
    backgroundColor: string;
    iconPrefix: string;
}

export const manifestConfig: Record<string, ManifestConfigItem> = {
    llpmg: {
        name: "LomaLindaPsychMedGroup",
        shortName: "LLPMG",
        description: "Loma Linda Psychiatric Medical Group",
        themeColor: "#255378",
        backgroundColor: "#6497B0",
        iconPrefix: "llpmg-logo",
    },
    fsclinicals: {
        name: "FourSquareClinicals",
        shortName: "FSClinicals",
        description: "Four Square Clinicals",
        themeColor: "#1FABC7",
        backgroundColor: "#D1E0EB",
        iconPrefix: "fsc-logo",
    },
    amh: {
        name: "AccessMentalHealth",
        shortName: "AMH",
        description: "Access Mental Health Organization",
        themeColor: "#055d5c",
        backgroundColor: "#FFFFFF",
        iconPrefix: "amh-logo",
    },
    ap: {
        name: "AdvancedPractice",
        shortName: "AP",
        description: "Advanced Practice Education",
        themeColor: "#055d5c",
        backgroundColor: "#FFFFFF",
        iconPrefix: "ap-logo",
    },
    driptrace: {
        name: "DripTrace Medical",
        shortName: "DripTrace",
        description: "DripTrace Medical Services",
        themeColor: "#0C3C60",
        backgroundColor: "#99AAC0",
        iconPrefix: "driptrace-logo",
    },
};

export function getManifestIcons(
    prefix: string
): MetadataRoute.Manifest["icons"] {
    return [
        {
            src: `${prefix}-favicon.ico`,
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
        },
        {
            src: `${prefix}-x192.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
        },
        {
            src: `${prefix}-x256.png`,
            sizes: "256x256",
            type: "image/png",
        },
        {
            src: `${prefix}-x512.png`,
            sizes: "512x512",
            type: "image/png",
        },
        {
            src: `${prefix}-maskable-icon_x512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ];
}
