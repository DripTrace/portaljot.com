import { style } from "@vanilla-extract/css";
import { tokens } from "@/styles/modify/ui-tokens";

const mobileBreakpoint = "930px";

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
