import { style } from "@vanilla-extract/css";
import { tokens } from "@/styles/modify/ui-tokens";

export const sectionBoxStyles = style({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	paddingBlock: tokens.spacings["5"],
	paddingInline: tokens.spacings["7"],
	gap: tokens.spacings["8"],
	overflowY: "auto",
});

export const titleStyles = style({
	color: tokens.colors["white100"],
	fontSize: "22px",
	fontWeight: "normal",
});

export const activeTrackBoxStyles = style({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	justifyContent: "space-between",
	gap: tokens.spacings["8"],
});

export const slidersBoxStyles = style({
	display: "flex",
	flexDirection: "column",
	gap: tokens.spacings["6"],
});

export const resetButtonBoxStyles = style({
	display: "flex",
	justifyContent: "center",
});

export const contentLabelStyles = style({
	color: tokens.colors["white50"],
	fontSize: "14px",
	lineHeight: 1.6,
	textAlign: "center",
});

export const boxBorderStyles = style({
	borderRadius: tokens.borderRadiuses["2.5"],
	height: "100%",
	border: `dashed 2px ${tokens.colors["secondary-border"]}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 32,
});
