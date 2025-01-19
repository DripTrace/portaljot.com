import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import Nth from "tailwindcss-nth-child";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import { PluginAPI } from "tailwindcss/types/config";
// import withPlugins from "next-compose-plugins";
const plugin = new Nth("2");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		extend: {
			screens: {
				vs: { min: "20em" }, //  Smallest  @ 320px * 787px
				xs: { min: "23.4375em" }, //  iPhone SE @ 375px * 667px
				"0xs": { min: "24.375em" }, //  iPhone 12 Pro @ 390px * 884px
				"1xs": { min: "24.5625em" }, //  Pixel 5 @ 393px * 851px
				"2xs": { min: "25.875em" }, //  iPhone XR @ 414px * 896px
				"mobile-l": { min: "26.5625em" }, //  MobileL @425px * 787px
				sm: { min: "40em" },
				tablet: { min: "48em" }, //  Tablet / iPadMini
				"tablet-l": { min: "51.25em" }, //  Tablet L / iPadAir
				md: { min: "60em" },
				laptop: { min: "64em" }, //  Laptop
				lg: { min: "80em" },
				"laptop-l": { min: "90em" }, //  Laptop L
				xl: { min: "100em" },
				"2xl": { min: "120em" },
				"3xl": { min: "140em" },
				"4vl": { min: "160em" },
			},
			colors: {
                tremor: {
                    brand: {
                        faint: colors.blue[50],
                        muted: colors.blue[200],
                        subtle: colors.blue[400],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[700],
                        inverted: colors.white,
                    },
                    background: {
                        muted: colors.gray[50],
                        subtle: colors.gray[100],
                        DEFAULT: colors.white,
                        emphasis: colors.gray[700],
                    },
                    border: {
                        DEFAULT: colors.gray[200],
                    },
                    ring: {
                        DEFAULT: colors.gray[200],
                    },
                    content: {
                        subtle: colors.gray[400],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[700],
                        strong: colors.gray[900],
                        inverted: colors.white,
                    },
                },
                "dark-tremor": {
                    brand: {
                        faint: "#0B1229",
                        muted: colors.blue[950],
                        subtle: colors.blue[800],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[400],
                        inverted: colors.blue[950],
                    },
                    background: {
                        muted: "#131A2B",
                        subtle: colors.gray[800],
                        DEFAULT: colors.gray[900],
                        emphasis: colors.gray[300],
                    },
                    border: {
                        DEFAULT: colors.gray[700],
                    },
                    ring: {
                        DEFAULT: colors.gray[800],
                    },
                    content: {
                        subtle: colors.gray[600],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[200],
                        strong: colors.gray[50],
                        inverted: colors.gray[950],
                    },
                },
				background: "var(--background)",
				foreground: "var(--foreground)",
				boxShadow: {
					glass: "0 0.9375em 1.5625em rgba(0, 0, 0, 0.05)",

					// glass: "0 25px 45px rgba(0, 0, 0, 0.1)",
					"active-menu": "0 0 0 #111827",
					"active-dark-menu": "0 0 0 #4C8EFF",
                    // light
                    "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    "tremor-card":
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    "tremor-dropdown":
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    // dark
                    "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    "dark-tremor-card":
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    "dark-tremor-dropdown":
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    DEFAULT:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
                    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
                    none: "none",
                    "social-glass": "0 5px 45px rgba(0, 0, 0, 0.1)",
                    "dark-glass":
                        "0 0.9375em 1.5625em rgba(255, 255, 255, 0.1)",
                    menu: "0 -0.5em 0 #111827",
                    "dark-menu": "0 -0.5em 0 #4C8EFF",
                    "login-modal": "0 0 10px rgba(0,0,0,0.25)",
                    "login-modal-dark": "0 0 10px rgba(255,255,255,0.25)",
                    "glass-form": "0 25px 45px rgba(0, 0, 0, 0.1)",
                    "glass-form-dark": "0 25px 45px rgba(255, 255, 255, 0.1)",
                    glass1: "0 15px 35px rgba(0, 0, 0,0.05)",
                    glass1a: "0 5px 10px rgba(0, 0, 0, 0.1)",
                    glass2: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    glass3: "0 25px 45px rgba(0, 0, 0, 0.1)",
                    glass3a: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    size: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    button: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    svg_display:
                        "0.1875em 0.3125em 0.4375em rgba(0, 0, 0, 0.5)",
                    svg_display_dark:
                        "0.1875em 0.3125em 0.4375em rgba(255, 255, 255, 0.5)",

                    imageCapture: "1px -7px 7px -6px rgba(0, 0, 0, 0.44)",
				},
			},
			keyframes: {
				"glass-square-move": {
					"0%, 100%": {
						transform: "translateY(-40px)",
					},
					"50%": {
						transform: "translateY(40px)",
					},
				},
			},
			animation: {
				"glass-square-move": "glass-square-move 10s linear infinite",
			},
			gridTemplateColumns: {
				mobile: "repeat(4, minmax(0, 1fr))",
				mobile_medium: "repeat(6, minmax(0, 1fr))",
				desktop: "repeat(11, minmax(0, 1fr))",
				onboarding_form: "repeat(auto-fit, minmax(10em, 1fr))",
				onboarding_form_bigger:
					"repeat(auto-fit, minmax(15.625em, 1fr))",
				svg_grid: "repeat(3, 1fr)",
			},
		},
	},
	variants: {
		extend: {
			boxShadow: ["active", "hover"],
			transform: ["hover"],
			rotate: ["hover"],
			scale: ["hover"],
			translate: ["hover"],
			background: ["hover", "active", "nth-child"],
			top: ["nth-child"],
			bottom: ["nth-child"],
			left: ["nth-child"],
			right: ["nth-child"],
			width: ["nth-child"],
			height: ["nth-child"],
			backgroundColor: ["checked", "nth-child"],
			strokeWidth: ["nth-child", "first"],
			strokeColor: ["nth-child", "first"],
			fillColor: ["nth-child", "first"],
			fill: ["nth-child", "first"],
			typography: ["dark"],
			padding: {
				xs: "6em",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin.nthChild(),
		require("@tailwindcss/typography"),
	],
};
export default withUt(config);
