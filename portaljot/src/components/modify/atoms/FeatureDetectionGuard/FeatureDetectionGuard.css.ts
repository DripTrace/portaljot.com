import { style } from "@vanilla-extract/css";
import { tokens } from "@/styles/modify/ui-tokens";

export const boxStyles = style({
	minHeight: "100%",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

export const textStyles = style({
	fontSize: 18,
	color: tokens.colors["white80"],
	maxWidth: 700,
	width: "100%",
	paddingInline: tokens.spacings["4"],
	textAlign: "center",
});
