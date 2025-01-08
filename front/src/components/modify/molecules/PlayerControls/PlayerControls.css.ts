// import { style } from "@vanilla-extract/css";
// import { tokens } from "@/styles/modify/ui-tokens";

// export const playerControlsStyles = style({
// 	position: "absolute",
// 	bottom: tokens.spacings["6"],
// 	left: tokens.spacings["12"],
// 	right: tokens.spacings["12"],
// 	display: "flex",
// 	// zIndex: 100,
// });

// const controlBoxStyles = style({
// 	backgroundColor: "rgba(54, 54, 54, 1)",
// 	borderRadius: tokens.borderRadiuses["3"],
// 	paddingBlock: tokens.spacings["3"],
// 	paddingInline: tokens.spacings["4"],
// 	display: "flex",
// 	alignItems: "center",
// 	maxWidth: "max-content",
// });

// export const firstControlsStyles = style([
// 	controlBoxStyles,
// 	{
// 		gap: tokens.spacings["2"],
// 	},
// ]);

// export const secondControlsStyles = style([
// 	controlBoxStyles,
// 	{
// 		marginLeft: tokens.spacings["7"],
// 		gap: tokens.spacings["3"],
// 	},
// ]);

import { style } from "@vanilla-extract/css";
import { tokens } from "@/styles/modify/ui-tokens";

// Main container for the player controls
export const playerControlsStyles = style({
	display: "flex", // Flexbox for centering
	justifyContent: "center", // Center horizontally
	alignItems: "center", // Center vertically
	position: "absolute", // Keep it inside the canvas
	bottom: "5%", // Adjust the bottom margin
	left: "50%", // Start from the center horizontally
	transform: "translateX(-50%)", // Ensure it's centered based on its width
	width: "90%", // Take up 90% of the canvas width
	zIndex: 100, // Ensure it stays on top

	"@media": {
		"(max-width: 768px)": {
			width: "100%", // Take up full width on smaller screens
			bottom: "3%", // Adjust the bottom margin on smaller screens
			left: "50%",
			transform: "translateX(-50%)", // Still centered horizontally
		},
	},
});

const controlBoxStyles = style({
	backgroundColor: "rgba(54, 54, 54, 0.7)", // Transparent background
	borderRadius: tokens.borderRadiuses["3"],
	paddingBlock: tokens.spacings["3"], // Control the padding
	paddingInline: tokens.spacings["4"], // Reduce padding for smaller screens
	display: "flex",
	alignItems: "center",
	width: "auto", // Auto width to fit content
	maxWidth: "100%",

	"@media": {
		"(max-width: 768px)": {
			paddingBlock: tokens.spacings["2"], // Adjust padding for mobile
			paddingInline: tokens.spacings["3"],
		},
	},
});

export const firstControlsStyles = style([
	controlBoxStyles,
	{
		gap: tokens.spacings["2"], // Space between elements
	},
]);

export const secondControlsStyles = style([
	controlBoxStyles,
	{
		marginLeft: tokens.spacings["3"], // Space between groups of controls
		gap: tokens.spacings["2"],
	},
]);
