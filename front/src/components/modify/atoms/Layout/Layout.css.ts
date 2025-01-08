// import { style } from "@vanilla-extract/css";
// import { tokens } from "@/styles/modify/ui-tokens";

// // @TODO: make it adaptive
// export const boxStyles = style({
// 	height: "100%",
// 	width: "100%",
// 	display: "grid",
// 	gap: tokens.spacings["7"],
// 	padding: tokens.spacings["7"],
// 	gridTemplateRows: "1fr 360px",
// 	gridTemplateColumns: "532px 1fr",
// 	gridTemplateAreas: "'controls player'" + "'track track'",
// });

// export const playerStyles = style({
// 	gridArea: "player",
// 	minWidth: 0,
// });

// export const controlsStyles = style({
// 	gridArea: "controls",
// 	minHeight: 0,
// });

// export const trackStyles = style({
// 	gridArea: "track",
// 	position: "relative",
// });

import { style } from "@vanilla-extract/css";
import { tokens } from "@/styles/modify/ui-tokens";

// Define breakpoints
// const mobileBreakpoint = "768px"; // Adjust for your specific needs
const mobileBreakpoint = "930px"; // Adjust for your specific needs

export const boxStyles = style({
	height: "100%",
	width: "100%",
	display: "grid",
	gap: tokens.spacings["7"],
	padding: tokens.spacings["7"],
	gridTemplateRows: "1fr 360px",
	gridTemplateColumns: "532px 1fr",
	gridTemplateAreas: "'controls player' 'track track'",

	"@media": {
		[`(max-width: ${mobileBreakpoint})`]: {
			gridTemplateColumns: "1fr",
			gridTemplateRows: "360px 1fr 1fr",
			gridTemplateAreas: "'player' 'controls' 'track'",
		},
	},
});

export const playerStyles = style({
	gridArea: "player",
	minWidth: 0,

	"@media": {
		[`(max-width: ${mobileBreakpoint})`]: {
			width: "100%",
		},
	},
});

export const controlsStyles = style({
	gridArea: "controls",
	minHeight: 0,

	"@media": {
		[`(max-width: ${mobileBreakpoint})`]: {
			width: "100%",
		},
	},
});

export const trackStyles = style({
	gridArea: "track",
	position: "relative",
	overflowX: "auto", // Ensures timeline scrolls on smaller screens

	"@media": {
		[`(max-width: ${mobileBreakpoint})`]: {
			width: "100%",
		},
	},
});

// import { style } from "@vanilla-extract/css";
// import { tokens } from "@/styles/modify/ui-tokens";

// // Define the layout for the video editor
// export const boxStyles = style({
// 	height: "100%",
// 	width: "100%",
// 	display: "grid",
// 	gap: tokens.spacings["7"],
// 	padding: tokens.spacings["7"],
// 	gridTemplateRows: "1fr 360px",
// 	gridTemplateColumns: "532px 1fr",
// 	gridTemplateAreas: "'controls player' 'track track'",

// 	"@media": {
// 		"(max-width: 768px)": {
// 			// Trigger for mobile/smaller screens
// 			gridTemplateColumns: "1fr",
// 			gridTemplateRows: "360px auto", // Stack player on top of controls
// 			gridTemplateAreas: "'player' 'controls' 'track'",
// 		},
// 	},
// });

// export const playerStyles = style({
// 	gridArea: "player",
// 	width: "100%", // Full width for mobile
// 	justifySelf: "center", // Centered in desktop mode
// 	minHeight: 0,

// 	"@media": {
// 		"(max-width: 768px)": {
// 			width: "100%", // Ensure it takes up the entire width on mobile
// 		},
// 	},
// });

// export const controlsStyles = style({
// 	gridArea: "controls",
// 	minHeight: 0,

// 	"@media": {
// 		"(max-width: 768px)": {
// 			width: "100%", // Make sure the controls take full width on mobile
// 		},
// 	},
// });

// export const trackStyles = style({
// 	gridArea: "track",
// 	position: "relative",
// 	overflowX: "auto", // Horizontal scrolling for overflow

// 	"@media": {
// 		"(max-width: 768px)": {
// 			width: "100%",
// 		},
// 	},
// });
