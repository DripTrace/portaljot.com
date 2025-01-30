import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import "../src/styles/globals.css";
// import {AuthProvider}  from "../src/state/auth/AuthProvider";
// import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css"
// import "!style-loader!css-loader!postcss-loader!../src/app/styles/globals.css";

const BREAKPOINTS_INT = {
	xs: 375,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const customViewports = Object.fromEntries(
	Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
		console.log(val);
		return [
			key,
			{
				name: key,
				styles: {
					width: `${val}px`,
					height: `${(idx + 5) * 10}vh`,
				},
			},
		];
	})
);

// Allow Storybook to handle Next's <Image> component
// const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, "default", {
//     configurable: true,
//     value: function (props) {
//         return OriginalNextImage(
//             Object.assign(Object.assign({}, props), { unoptimized: true })
//         );
//     },
// });

//   <OriginalNextImage {...props} unoptimized />

// export const decorators = [
//     (Story) => (
//       <AuthProvider>
//         <Story />
//       </AuthProvider>
//     ),
//   ];

// export const parameters = {
// 	actions: { argTypesRegex: "^on[A-Z].*" },
// 	controls: {
// 		matchers: {
// 			color: /(background|color)$/i,
// 			date: /Date$/,
// 		},
// 	},
// 	viewport: { viewports: customViewports },
// 	layout: "fullscreen",
// 	nextRouter: {
// 		Provider: RouterContext.Provider,
// 	},
// };

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		previewTabs: {
			"storybook/docs/panel": { index: -1 },
		},
		// actions: { argTypesRegex: "^on[A-Z].*" },
		// actions: { argTypesRegex: "^on.*" },
		viewport: { viewports: customViewports },
		layout: "fullscreen",
		nextRouter: {
			Provider: RouterContext.Provider,
		},
	},

	decorators: [
		withThemeByClassName({
			themes: {
				// nameOfTheme: 'classNameForTheme',
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
		// (Story) => Story(),
		// (Story) => (<AuthProvider><Story /></AuthProvider>),
	],
};

export default preview;
