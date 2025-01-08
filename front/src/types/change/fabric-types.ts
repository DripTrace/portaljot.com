// // import * as fabric from "fabric";
// import * as fabric from "fabric";

// import { FabricImage, FabricObject, FabricText } from "fabric";
import * as fabric from "fabric";

// // interface GraphemeBBox {
// // 	width: number;
// // 	left: number;
// // 	height?: number;
// // 	top?: number;
// // }

// // Extend the fabric.IText interface
// declare module "fabric" {
// 	namespace fabric {
// 		// interface IText {
// 		// 	__charBounds: fabric.GraphemeBBox[][];
// 		// 	getHeightOfLine(lineIndex: number): number;
// 		// 	scaleX: number;
// 		// 	scaleY: number;
// 		// 	fontWeight: string | number;
// 		// }
// 		// interface IEvent<T extends Event> {
// 		// 	target: EventTarget | null;
// 		// 	pointer: PointerEvent;
// 		// 	originalEvent: T;
// 		// }
// 		// interface Util {
// 		// 	createClass(baseClass: any, properties: any): any;
// 		// }
// 		// class CoverVideo extends Image {
// 		// 	type: "coverVideo";
// 		// 	disableCrop: boolean;
// 		// 	cropWidth: number;
// 		// 	cropHeight: number;
// 		// }
// 		// class CoverImage extends Image {
// 		// 	type: "coverImage";
// 		// 	disableCrop: boolean;
// 		// 	cropWidth: number;
// 		// 	cropHeight: number;
// 		// }
//         // interface Canvas {
//         //     getObjects(): fabric.Object[];
//         // }
// 	}
// }

// export type EditorElementBase<T extends string, P> = {
// 	readonly id: string;
// 	fabricObject?: fabric.Object;
// 	name: string;
// 	readonly type: T;
// 	placement: Placement;
// 	timeFrame: TimeFrame;
// 	properties: P;
// };

// export type VideoEditorElement = EditorElementBase<
// 	"video",
// 	{
// 		src: string;
// 		elementId: string;
// 		imageObject?: fabric.Image;
// 		effect: Effect;
// 	}
// >;

// export type ImageEditorElement = EditorElementBase<
// 	"image",
// 	{
// 		src: string;
// 		elementId: string;
// 		imageObject?: fabric.Object;
// 		effect: Effect;
// 	}
// >;

// export type AudioEditorElement = EditorElementBase<
// 	"audio",
// 	{ src: string; elementId: string }
// >;

// export type TextEditorElement = EditorElementBase<
// 	"text",
// 	{
// 		text: string;
// 		fontSize: number;
// 		fontWeight: number;
// 		splittedTexts: fabric.Text[];
// 	}
// >;

// export type EditorElement =
// 	| VideoEditorElement
// 	| ImageEditorElement
// 	| AudioEditorElement
// 	| TextEditorElement;

// export type EditorElementBase<T extends string, P> = {
// 	readonly id: string;
// 	fabricObject?: fabric.Object | any;
// 	name: string;
// 	readonly type: T;
// 	placement: Placement;
// 	timeFrame: TimeFrame;
// 	properties: P;
// };
// export type VideoEditorElement = EditorElementBase<
// 	"video",
// 	{
// 		src: string;
// 		elementId: string;
// 		imageObject?: fabric.Image;
// 		effect: Effect;
// 	}
// >;
// export type ImageEditorElement = EditorElementBase<
// 	"image",
// 	{
// 		src: string;
// 		elementId: string;
// 		imageObject?: fabric.Object;
// 		effect: Effect;
// 	}
// >;

// export type AudioEditorElement = EditorElementBase<
// 	"audio",
// 	{ src: string; elementId: string }
// >;
// export type TextEditorElement = EditorElementBase<
// 	"text",
// 	{
// 		text: string;
// 		fontSize: number;
// 		fontWeight: number;
// 		splittedTexts: fabric.Text[];
// 	}
// >;

// export type EditorElement =
// 	| VideoEditorElement
// 	| ImageEditorElement
// 	| AudioEditorElement
// 	| TextEditorElement;

// export type Placement = {
// 	x: number;
// 	y: number;
// 	width: number;
// 	height: number;
// 	rotation: number;
// 	scaleX: number;
// 	scaleY: number;
// };

// export type TimeFrame = {
// 	start: number;
// 	end: number;
// };

// export type EffectBase<T extends string> = {
// 	type: T;
// };

// export type BlackAndWhiteEffect =
// 	| EffectBase<"none">
// 	| EffectBase<"blackAndWhite">
// 	| EffectBase<"sepia">
// 	| EffectBase<"invert">
// 	| EffectBase<"saturate">;
// export type Effect = BlackAndWhiteEffect;
// export type EffecType = Effect["type"];

// export type AnimationBase<T, P = {}> = {
// 	id: string;
// 	targetId: string;
// 	duration: number;
// 	type: T;
// 	properties: P;
// };

// export type FadeInAnimation = AnimationBase<"fadeIn">;
// export type FadeOutAnimation = AnimationBase<"fadeOut">;

// export type BreatheAnimation = AnimationBase<"breathe">;

// export type SlideDirection = "left" | "right" | "top" | "bottom";
// export type SlideTextType = "none" | "character";
// export type SlideInAnimation = AnimationBase<
// 	"slideIn",
// 	{
// 		direction: SlideDirection;
// 		useClipPath: boolean;
// 		textType: "none" | "character";
// 	}
// >;

// export type SlideOutAnimation = AnimationBase<
// 	"slideOut",
// 	{
// 		direction: SlideDirection;
// 		useClipPath: boolean;
// 		textType: SlideTextType;
// 	}
// >;

// export type Animation =
// 	| FadeInAnimation
// 	| FadeOutAnimation
// 	| SlideInAnimation
// 	| SlideOutAnimation
// 	| BreatheAnimation;

// export type MenuOption =
// 	| "Video"
// 	| "Audio"
// 	| "Text"
// 	| "Image"
// 	| "Export"
// 	| "Animation"
// 	| "Effect"
// 	| "Fill";

// // export * from fabric;

// import {
// 	fabric,
// 	Object as FabricObject,
// 	Image as FabricImage,
// 	Text as FabricText,
// } from "fabric";

export type EditorElementBase<T extends string, P> = {
	readonly id: string;
	fabricObject?: fabric.Object | any;
	name: string;
	readonly type: T;
	placement: Placement;
	timeFrame: TimeFrame;
	properties: P;
};
export type VideoEditorElement = EditorElementBase<
	"video",
	{
		src: string;
		elementId: string;
		imageObject?: fabric.Image;
		effect: Effect;
	}
>;
export type ImageEditorElement = EditorElementBase<
	"image",
	{
		src: string;
		elementId: string;
		imageObject?: fabric.Object;
		effect: Effect;
	}
>;

export type AudioEditorElement = EditorElementBase<
	"audio",
	{ src: string; elementId: string }
>;
export type TextEditorElement = EditorElementBase<
	"text",
	{
		text: string;
		fontSize: number;
		fontWeight: number;
		splittedTexts: fabric.Text[];
	}
>;

export type EditorElement =
	| VideoEditorElement
	| ImageEditorElement
	| AudioEditorElement
	| TextEditorElement;

export type Placement = {
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	scaleX: number;
	scaleY: number;
};

export type TimeFrame = {
	start: number;
	end: number;
};

export type EffectBase<T extends string> = {
	type: T;
};

export type BlackAndWhiteEffect =
	| EffectBase<"none">
	| EffectBase<"blackAndWhite">
	| EffectBase<"sepia">
	| EffectBase<"invert">
	| EffectBase<"saturate">;
export type Effect = BlackAndWhiteEffect;
export type EffecType = Effect["type"];

export type AnimationBase<T, P = {}> = {
	id: string;
	targetId: string;
	duration: number;
	type: T;
	properties: P;
};

export type FadeInAnimation = AnimationBase<"fadeIn">;
export type FadeOutAnimation = AnimationBase<"fadeOut">;

export type BreatheAnimation = AnimationBase<"breathe">;

export type SlideDirection = "left" | "right" | "top" | "bottom";
export type SlideTextType = "none" | "character";
export type SlideInAnimation = AnimationBase<
	"slideIn",
	{
		direction: SlideDirection;
		useClipPath: boolean;
		textType: "none" | "character";
	}
>;

export type SlideOutAnimation = AnimationBase<
	"slideOut",
	{
		direction: SlideDirection;
		useClipPath: boolean;
		textType: SlideTextType;
	}
>;

export type Animation =
	| FadeInAnimation
	| FadeOutAnimation
	| SlideInAnimation
	| SlideOutAnimation
	| BreatheAnimation;

export type MenuOption =
	| "Video"
	| "Audio"
	| "Text"
	| "Image"
	| "Export"
	| "Animation"
	| "Effect"
	| "Fill";
