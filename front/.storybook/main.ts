import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import process from "process";

const __dirname = process.cwd();

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-styling-webpack",
		"@storybook/addon-themes",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	core: {
		builder: "@storybook/builder-webpack5",
	},
	docs: {
		autodocs: "tag",
	},
	staticDirs: ["../public"],
	webpackFinal: (config) => {
		config.module = config.module ?? {};
		config.module.rules = config.module.rules ?? [];
		config.module.rules.push({
			test: /\.scss$/,
			use: [
				"style-loader",
				"css-loader",
				"postcss-loader",
				"sass-loader",
			],
		});
		/**
		 * Add support for alias-imports
		 * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
		 */
		config.resolve = config.resolve ?? {};
		config.resolve.alias = {
			...config.resolve.alias,
			"@": [
				path.resolve(__dirname, "../src/"),
				path.resolve(__dirname, "../"),
			],
		};

		/**
		 * Fixes font import with /
		 * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
		 */
		config.resolve.roots = [
			path.resolve(__dirname, "../public"),
			"node_modules",
		];

		return config;
	},
};
export default config;
