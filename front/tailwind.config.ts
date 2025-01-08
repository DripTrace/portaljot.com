import type { Config } from "tailwindcss";
import Nth from "tailwindcss-nth-child";
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
				background: "var(--background)",
				foreground: "var(--foreground)",
				boxShadow: {
					glass: "0 0.9375em 1.5625em rgba(0, 0, 0, 0.05)",

					// glass: "0 25px 45px rgba(0, 0, 0, 0.1)",
					"active-menu": "0 0 0 #111827",
					"active-dark-menu": "0 0 0 #4C8EFF",
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
export default config;
