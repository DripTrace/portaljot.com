// // // import * as fabric from "fabric";
// // // import { EditorElement, EffecType } from "@/types/change/fabric-types";
// // // // https://jsfiddle.net/i_prikot/pw7yhaLf/

// // // export const CoverImage = fabric.util.createClass(fabric.Image, {
// // // 	type: "coverImage",

// // // 	customFilter: "none",
// // // 	disableCrop: false,
// // // 	cropWidth: 0,
// // // 	cropHeight: 0,

// // // 	initialize(element: HTMLImageElement | HTMLVideoElement, options: any) {
// // // 		options = options || {};

// // // 		options = Object.assign(
// // // 			{
// // // 				cropHeight: this.height,
// // // 				cropWidth: this.width,
// // // 			},
// // // 			options
// // // 		);
// // // 		this.callSuper("initialize", element, options);
// // // 	},

// // // 	getCrop(
// // // 		image: { width: number; height: number },
// // // 		size: { width: number; height: number }
// // // 	) {
// // // 		const width = size.width;
// // // 		const height = size.height;
// // // 		const aspectRatio = width / height;

// // // 		let newWidth;
// // // 		let newHeight;

// // // 		const imageRatio = image.width / image.height;

// // // 		if (aspectRatio >= imageRatio) {
// // // 			newWidth = image.width;
// // // 			newHeight = image.width / aspectRatio;
// // // 		} else {
// // // 			newWidth = image.height * aspectRatio;
// // // 			newHeight = image.height;
// // // 		}
// // // 		const x = (image.width - newWidth) / 2;
// // // 		const y = (image.height - newHeight) / 2;
// // // 		return {
// // // 			cropX: x,
// // // 			cropY: y,
// // // 			cropWidth: newWidth,
// // // 			cropHeight: newHeight,
// // // 		};
// // // 	},

// // // 	_render(ctx: CanvasRenderingContext2D) {
// // // 		if (this.disableCrop) {
// // // 			this.callSuper("_render", ctx);
// // // 			return;
// // // 		}
// // // 		const width = this.width;
// // // 		const height = this.height;
// // // 		const crop = this.getCrop(this.getOriginalSize(), {
// // // 			width: this.getScaledWidth(),
// // // 			height: this.getScaledHeight(),
// // // 		});
// // // 		const { cropX, cropY, cropWidth, cropHeight } = crop;
// // // 		ctx.save();
// // // 		const customFilter: EffecType = this.customFilter;
// // // 		ctx.filter = getFilterFromEffectType(customFilter);
// // // 		ctx.drawImage(
// // // 			this._element,
// // // 			Math.max(cropX, 0),
// // // 			Math.max(cropY, 0),
// // // 			Math.max(1, cropWidth),
// // // 			Math.max(1, cropHeight),
// // // 			-width / 2,
// // // 			-height / 2,
// // // 			Math.max(0, width),
// // // 			Math.max(0, height)
// // // 		);
// // // 		ctx.filter = "none";
// // // 		ctx.restore();
// // // 	},
// // // });

// // // export const CoverVideo = fabric.util.createClass(fabric.Image, {
// // // 	type: "coverVideo",
// // // 	customFilter: "none",
// // // 	disableCrop: false,
// // // 	cropWidth: 0,
// // // 	cropHeight: 0,

// // // 	initialize(element: HTMLVideoElement, options: any) {
// // // 		options = options || {};

// // // 		options = Object.assign(
// // // 			{
// // // 				cropHeight: this.height,
// // // 				cropWidth: this.width,
// // // 			},
// // // 			options
// // // 		);
// // // 		this.callSuper("initialize", element, options);
// // // 	},

// // // 	getCrop(
// // // 		image: { width: number; height: number },
// // // 		size: { width: number; height: number }
// // // 	) {
// // // 		const width = size.width;
// // // 		const height = size.height;
// // // 		const aspectRatio = width / height;
// // // 		let newWidth;
// // // 		let newHeight;

// // // 		const imageRatio = image.width / image.height;

// // // 		if (aspectRatio >= imageRatio) {
// // // 			newWidth = image.width;
// // // 			newHeight = image.width / aspectRatio;
// // // 		} else {
// // // 			newWidth = image.height * aspectRatio;
// // // 			newHeight = image.height;
// // // 		}
// // // 		const x = (image.width - newWidth) / 2;
// // // 		const y = (image.height - newHeight) / 2;
// // // 		return {
// // // 			cropX: x,
// // // 			cropY: y,
// // // 			cropWidth: newWidth,
// // // 			cropHeight: newHeight,
// // // 		};
// // // 	},

// // // 	_render(ctx: CanvasRenderingContext2D) {
// // // 		if (this.disableCrop) {
// // // 			this.callSuper("_render", ctx);
// // // 			return;
// // // 		}
// // // 		const width = this.width;
// // // 		const height = this.height;
// // // 		const crop = this.getCrop(this.getOriginalSize(), {
// // // 			width: this.getScaledWidth(),
// // // 			height: this.getScaledHeight(),
// // // 		});
// // // 		const { cropX, cropY, cropWidth, cropHeight } = crop;

// // // 		const video = this._element as HTMLVideoElement;
// // // 		const videoScaledX = video.width / video.videoWidth;
// // // 		const videoScaledY = video.height / video.videoHeight;

// // // 		ctx.save();
// // // 		const customFilter: EffecType = this.customFilter;
// // // 		ctx.filter = getFilterFromEffectType(customFilter);
// // // 		ctx.drawImage(
// // // 			this._element,
// // // 			Math.max(cropX, 0) / videoScaledX,
// // // 			Math.max(cropY, 0) / videoScaledY,
// // // 			Math.max(1, cropWidth) / videoScaledX,
// // // 			Math.max(1, cropHeight) / videoScaledY,
// // // 			-width / 2,
// // // 			-height / 2,
// // // 			Math.max(0, width),
// // // 			Math.max(0, height)
// // // 		);
// // // 		ctx.filter = "none";
// // // 		ctx.restore();
// // // 	},
// // // });

// // // function getFilterFromEffectType(effectType: EffecType) {
// // // 	switch (effectType) {
// // // 		case "blackAndWhite":
// // // 			return "grayscale(100%)";
// // // 		case "sepia":
// // // 			return "sepia(100%)";
// // // 		case "invert":
// // // 			return "invert(100%)";
// // // 		case "saturate":
// // // 			return "saturate(100%)";
// // // 		default:
// // // 			return "none";
// // // 	}
// // // }

// // // declare module "fabric" {
// // // 	namespace fabric {
// // // 		class CoverVideo extends Image {
// // // 			type: "coverVideo";
// // // 			disableCrop: boolean;
// // // 			cropWidth: number;
// // // 			cropHeight: number;
// // // 		}
// // // 		class CoverImage extends Image {
// // // 			type: "coverImage";
// // // 			disableCrop: boolean;
// // // 			cropWidth: number;
// // // 			cropHeight: number;
// // // 		}
// // // 	}
// // // }

// // // fabric.CoverImage = CoverImage;
// // // fabric.CoverVideo = CoverVideo;

// // // export class FabricUitls {
// // // 	static getClipMaskRect(editorElement: EditorElement, extraOffset: number) {
// // // 		const extraOffsetX = extraOffset / editorElement.placement.scaleX;
// // // 		const extraOffsetY = extraOffsetX / editorElement.placement.scaleY;
// // // 		const clipRectangle = new fabric.Rect({
// // // 			left: editorElement.placement.x - extraOffsetX,
// // // 			top: editorElement.placement.y - extraOffsetY,
// // // 			width: editorElement.placement.width + extraOffsetX * 2,
// // // 			height: editorElement.placement.height + extraOffsetY * 2,
// // // 			scaleX: editorElement.placement.scaleX,
// // // 			scaleY: editorElement.placement.scaleY,
// // // 			absolutePositioned: true,
// // // 			fill: "transparent",
// // // 			stroke: "transparent",
// // // 			opacity: 0.5,
// // // 			strokeWidth: 0,
// // // 		});
// // // 		return clipRectangle;
// // // 	}
// // // }

// // import { fabric as Fabric } from "fabric";
// // import { type EditorElement, type EffecType } from "@/types/change/fabric-types";

// // declare module "fabric" {
// // 	namespace fabric {
// // 		class CoverVideo extends Image {
// // 			type: "coverVideo";
// // 			customFilter: string;
// // 			disableCrop: boolean;
// // 			cropWidth: number;
// // 			cropHeight: number;
// // 		}
// // 		class CoverImage extends Image {
// // 			type: "coverImage";
// // 			customFilter: string;
// // 			disableCrop: boolean;
// // 			cropWidth: number;
// // 			cropHeight: number;
// // 		}
// //         const util: {
// //             createClass: (parent: any, properties: any) => any;
// //         };
// //         class Rect {
// //             constructor(options?: any);
// //             rx?: number;
// //             ry?: number;
// //             type: string;
// //             width: number;
// //             height: number;
// //             strokeDashArray?: number[];
// //             strokeLineCap?: string;
// //             strokeLineJoin?: string;
// //             strokeMiterLimit?: number;
// //             scaleX: number;
// //             scaleY: number;
// //             flipX: boolean;
// //             flipY: boolean;
// //             opacity: number;
// //             src: string;
// //             crossOrigin: string;
// //             alignX: string;
// //             alignY: string;
// //             meetOrSlice: string;
// //         }
// //         class Image {
// //             constructor(options?: any);
// //             type: string;
// //             width: number;
// //             height: number;
// //             scaleX: number;
// //             scaleY: number;
// //             flipX: boolean;
// //             flipY: boolean;
// // 	}
// // }

// // export const CoverImage = Fabric.util.createClass(Fabric.Image, {
// // 	type: "coverImage",
// // 	customFilter: "none",
// // 	disableCrop: false,
// // 	cropWidth: 0,
// // 	cropHeight: 0,

// // 	initialize(element: HTMLImageElement | HTMLVideoElement, options: any) {
// // 		options = options || {};

// // 		options = Object.assign(
// // 			{
// // 				cropHeight: this.height,
// // 				cropWidth: this.width,
// // 			},
// // 			options
// // 		);
// // 		this.callSuper("initialize", element, options);
// // 	},

// // 	getCrop(
// // 		image: { width: number; height: number },
// // 		size: { width: number; height: number }
// // 	) {
// // 		const width = size.width;
// // 		const height = size.height;
// // 		const aspectRatio = width / height;

// // 		let newWidth: number;
// // 		let newHeight: number;

// // 		const imageRatio = image.width / image.height;

// // 		if (aspectRatio >= imageRatio) {
// // 			newWidth = image.width;
// // 			newHeight = image.width / aspectRatio;
// // 		} else {
// // 			newWidth = image.height * aspectRatio;
// // 			newHeight = image.height;
// // 		}
// // 		const x = (image.width - newWidth) / 2;
// // 		const y = (image.height - newHeight) / 2;
// // 		return {
// // 			cropX: x,
// // 			cropY: y,
// // 			cropWidth: newWidth,
// // 			cropHeight: newHeight,
// // 		};
// // 	},

// // 	_render(ctx: CanvasRenderingContext2D) {
// // 		if (this.disableCrop) {
// // 			this.callSuper("_render", ctx);
// // 			return;
// // 		}
// // 		const width = this.width;
// // 		const height = this.height;
// // 		const crop = this.getCrop(this.getOriginalSize(), {
// // 			width: this.getScaledWidth(),
// // 			height: this.getScaledHeight(),
// // 		});
// // 		const { cropX, cropY, cropWidth, cropHeight } = crop;
// // 		ctx.save();
// // 		const customFilter: EffecType = this.customFilter;
// // 		ctx.filter = getFilterFromEffectType(customFilter);
// // 		ctx.drawImage(
// // 			this._element,
// // 			Math.max(cropX, 0),
// // 			Math.max(cropY, 0),
// // 			Math.max(1, cropWidth),
// // 			Math.max(1, cropHeight),
// // 			-width / 2,
// // 			-height / 2,
// // 			Math.max(0, width),
// // 			Math.max(0, height)
// // 		);
// // 		ctx.filter = "none";
// // 		ctx.restore();
// // 	},
// // });

// // export const CoverVideo = Fabric.util.createClass(Fabric.Image, {
// // 	type: "coverVideo",
// // 	customFilter: "none",
// // 	disableCrop: false,
// // 	cropWidth: 0,
// // 	cropHeight: 0,

// // 	initialize(element: HTMLVideoElement, options: any) {
// // 		options = options || {};

// // 		options = Object.assign(
// // 			{
// // 				cropHeight: this.height,
// // 				cropWidth: this.width,
// // 			},
// // 			options
// // 		);
// // 		this.callSuper("initialize", element, options);
// // 	},

// // 	getCrop(
// // 		image: { width: number; height: number },
// // 		size: { width: number; height: number }
// // 	) {
// // 		const width = size.width;
// // 		const height = size.height;
// // 		const aspectRatio = width / height;
// // 		let newWidth: number;
// // 		let newHeight: number;

// // 		const imageRatio = image.width / image.height;

// // 		if (aspectRatio >= imageRatio) {
// // 			newWidth = image.width;
// // 			newHeight = image.width / aspectRatio;
// // 		} else {
// // 			newWidth = image.height * aspectRatio;
// // 			newHeight = image.height;
// // 		}
// // 		const x = (image.width - newWidth) / 2;
// // 		const y = (image.height - newHeight) / 2;
// // 		return {
// // 			cropX: x,
// // 			cropY: y,
// // 			cropWidth: newWidth,
// // 			cropHeight: newHeight,
// // 		};
// // 	},

// // 	_render(ctx: CanvasRenderingContext2D) {
// // 		if (this.disableCrop) {
// // 			this.callSuper("_render", ctx);
// // 			return;
// // 		}
// // 		const width = this.width;
// // 		const height = this.height;
// // 		const crop = this.getCrop(this.getOriginalSize(), {
// // 			width: this.getScaledWidth(),
// // 			height: this.getScaledHeight(),
// // 		});
// // 		const { cropX, cropY, cropWidth, cropHeight } = crop;

// // 		const video = this._element as HTMLVideoElement;
// // 		const videoScaledX = video.width / video.videoWidth;
// // 		const videoScaledY = video.height / video.videoHeight;

// // 		ctx.save();
// // 		const customFilter: EffecType = this.customFilter;
// // 		ctx.filter = getFilterFromEffectType(customFilter);
// // 		ctx.drawImage(
// // 			this._element,
// // 			Math.max(cropX, 0) / videoScaledX,
// // 			Math.max(cropY, 0) / videoScaledY,
// // 			Math.max(1, cropWidth) / videoScaledX,
// // 			Math.max(1, cropHeight) / videoScaledY,
// // 			-width / 2,
// // 			-height / 2,
// // 			Math.max(0, width),
// // 			Math.max(0, height)
// // 		);
// // 		ctx.filter = "none";
// // 		ctx.restore();
// // 	},
// // });

// // function getFilterFromEffectType(effectType: EffecType) {
// // 	switch (effectType) {
// // 		case "blackAndWhite":
// // 			return "grayscale(100%)";
// // 		case "sepia":
// // 			return "sepia(100%)";
// // 		case "invert":
// // 			return "invert(100%)";
// // 		case "saturate":
// // 			return "saturate(100%)";
// // 		default:
// // 			return "none";
// // 	}
// // }

// // Fabric.CoverImage = CoverImage;
// // Fabric.CoverVideo = CoverVideo;

// // export class FabricUitls {
// //     static getClipMaskRect(editorElement: EditorElement, extraOffset: number) {
// //       const extraOffsetX = extraOffset / editorElement.placement.scaleX
// //       const extraOffsetY = extraOffsetX / editorElement.placement.scaleY
// //       const clipRectangle = new Fabric.Rect({
// //         left: editorElement.placement.x - extraOffsetX,
// //         top: editorElement.placement.y - extraOffsetY,
// //         width: editorElement.placement.width + extraOffsetX * 2,
// //         height: editorElement.placement.height + extraOffsetY * 2,
// //         scaleX: editorElement.placement.scaleX,
// //         scaleY: editorElement.placement.scaleY,
// //         absolutePositioned: true,
// //         fill: 'transparent',
// //         stroke: 'transparent',
// //         opacity: 0.5,
// //         strokeWidth: 0,
// //       })
// //       return clipRectangle
// //     }
// // }

// import { EditorElement, EffecType } from "@/types/change/fabric-types";
// // import { fabric } from "fabric";
// import * as fabric from "fabric";
// // import { type EditorElement, type EffecType } from "@/types/change/fabric-types";
// import { IObjectOptions, IRectOptions } from "fabric/fabric-impl";

// // Extend the fabric namespace
// // declare module "fabric" {
// // 	// namespace fabric {
// // 	interface IUtilMethods {
// // 		createClass(parent: any, properties: any): any;
// // 	}

// // 	interface StaticCanvas {
// // 		util: IUtilMethods;
// // 	}

// // 	interface IImageOptions extends IObjectOptions {
// // 		customFilter?: string;
// // 		disableCrop?: boolean;
// // 		cropWidth?: number;
// // 		cropHeight?: number;
// // 	}

// // 	interface ICoverImageOptions extends IImageOptions {
// // 		type: "coverImage";
// // 	}

// // 	interface ICoverVideoOptions extends IImageOptions {
// // 		type: "coverVideo";
// // 	}

// // 	// class Image {
// // 	// 	static fromURL(
// // 	// 		url: string,
// // 	// 		callback: Function,
// // 	// 		imgOptions?: IImageOptions
// // 	// 	): void;
// // 	// }

// // 	// class Rect extends Object {
// // 	// 	constructor(options?: IRectOptions);
// // 	// }

// // 	class CoverImage extends Image {
// // 		customFilter: string;
// // 		disableCrop: boolean;
// // 		cropWidth: number;
// // 		cropHeight: number;
// // 		getCrop(
// // 			image: { width: number; height: number },
// // 			size: { width: number; height: number }
// // 		): {
// // 			cropX: number;
// // 			cropY: number;
// // 			cropWidth: number;
// // 			cropHeight: number;
// // 		};
// // 	}

// // 	class CoverVideo extends Image {
// // 		customFilter: string;
// // 		disableCrop: boolean;
// // 		cropWidth: number;
// // 		cropHeight: number;
// // 		getCrop(
// // 			image: { width: number; height: number },
// // 			size: { width: number; height: number }
// // 		): {
// // 			cropX: number;
// // 			cropY: number;
// // 			cropWidth: number;
// // 			cropHeight: number;
// // 		};
// // 	}
// // 	// }
// // }

// declare module "fabric" {
//     interface IUtilMethods {
//         createClass(parent: any, properties: any): any;
//     }

//     interface StaticCanvas {
//         util: IUtilMethods;
//     }

//     interface IImageOptions extends IObjectOptions {
//         customFilter?: string;
//         disableCrop?: boolean;
//         cropWidth?: number;
//         cropHeight?: number;
//     }

//     interface ICoverImageOptions extends IImageOptions {
//         type: "coverImage";
//     }

//     interface ICoverVideoOptions extends IImageOptions {
//         type: "coverVideo";
//     }

//     // class Image {
//     //     static fromURL(
//     //         url: string,
//     //         callback: Function,
//     //         imgOptions?: IImageOptions
//     //     ): void;
//     // }

//     interface Image {
//         customFilter: string;
//         disableCrop: boolean;
//         cropWidth: number;
//         cropHeight: number;
//         getCrop(
//             image: { width: number; height: number },
//             size: { width: number; height: number }
//         ): {
//             cropX: number;
//             cropY: number;
//             cropWidth: number;
//             cropHeight: number;
//         };
//         _render(ctx: CanvasRenderingContext2D): void;
//     }

//     class Rect extends Object {
//         constructor(options?: IRectOptions);
//     }

//     class CoverImage extends Image {
//         customFilter: string;
//         disableCrop: boolean;
//         cropWidth: number;
//         cropHeight: number;
//         getCrop(
//             image: { width: number; height: number },
//             size: { width: number; height: number }
//         ): {
//             cropX: number;
//             cropY: number;
//             cropWidth: number;
//             cropHeight: number;
//         };
//     }

//     class CoverVideo extends Image {
//         customFilter: string;
//         disableCrop: boolean;
//         cropWidth: number;
//         cropHeight: number;
//         getCrop(
//             image: { width: number; height: number },
//             size: { width: number; height: number }
//         ): {
//             cropX: number;
//             cropY: number;
//             cropWidth: number;
//             cropHeight: number;
//         };
//     }
// }

// // Implement CoverImage
// const CoverImage = fabric.util.createClass(fabric.Image, {
//     type: "coverImage",
//     customFilter: "none",
//     disableCrop: false,
//     cropWidth: 0,
//     cropHeight: 0,

//     initialize: function (
//         element: HTMLImageElement,
//         options: fabric.ICoverImageOptions
//     ) {
// 		options = options || {};
// 		this.callSuper("initialize", element, options);
// 		this.customFilter = options.customFilter || "none";
// 		this.disableCrop = options.disableCrop || false;
// 		this.cropWidth = options.cropWidth || this.width!;
// 		this.cropHeight = options.cropHeight || this.height!;
// 	},

// 	getCrop: function (
// 		image: { width: number; height: number },
// 		size: { width: number; height: number }
// 	) {
// 		const width = size.width;
// 		const height = size.height;
// 		const aspectRatio = width / height;

// 		let newWidth: number;
// 		let newHeight: number;

// 		const imageRatio = image.width / image.height;

// 		if (aspectRatio >= imageRatio) {
// 			newWidth = image.width;
// 			newHeight = image.width / aspectRatio;
// 		} else {
// 			newWidth = image.height * aspectRatio;
// 			newHeight = image.height;
// 		}
// 		const x = (image.width - newWidth) / 2;
// 		const y = (image.height - newHeight) / 2;
// 		return {
// 			cropX: x,
// 			cropY: y,
// 			cropWidth: newWidth,
// 			cropHeight: newHeight,
// 		};
// 	},

// 	_render: function (ctx: CanvasRenderingContext2D) {
// 		if (this.disableCrop) {
// 			this.callSuper("_render", ctx);
// 			return;
// 		}
// 		const width = this.width!;
// 		const height = this.height!;
// 		const crop = this.getCrop(this.getOriginalSize(), {
// 			width: this.getScaledWidth(),
// 			height: this.getScaledHeight(),
// 		});
// 		const { cropX, cropY, cropWidth, cropHeight } = crop;
// 		ctx.save();
// 		const customFilter: EffecType = this.customFilter as EffecType;
// 		ctx.filter = getFilterFromEffectType(customFilter);
// 		ctx.drawImage(
// 			this._element as HTMLImageElement,
// 			Math.max(cropX, 0),
// 			Math.max(cropY, 0),
// 			Math.max(1, cropWidth),
// 			Math.max(1, cropHeight),
// 			-width / 2,
// 			-height / 2,
// 			Math.max(0, width),
// 			Math.max(0, height)
// 		);
// 		ctx.filter = "none";
// 		ctx.restore();
// 	},
// });

// // Implement CoverVideo
// const CoverVideo = (fabric as any).util.createClass(fabric.Image, {
// 	type: "coverVideo",
// 	customFilter: "none",
// 	disableCrop: false,
// 	cropWidth: 0,
// 	cropHeight: 0,

// 	initialize: function (
// 		element: HTMLVideoElement,
// 		options: fabric.ICoverVideoOptions
// 	) {
// 		options = options || {};
// 		this.callSuper("initialize", element, options);
// 		this.customFilter = options.customFilter || "none";
// 		this.disableCrop = options.disableCrop || false;
// 		this.cropWidth = options.cropWidth || this.width!;
// 		this.cropHeight = options.cropHeight || this.height!;
// 	},

// 	getCrop: function (
// 		image: { width: number; height: number },
// 		size: { width: number; height: number }
// 	) {
// 		const width = size.width;
// 		const height = size.height;
// 		const aspectRatio = width / height;
// 		let newWidth: number;
// 		let newHeight: number;

// 		const imageRatio = image.width / image.height;

// 		if (aspectRatio >= imageRatio) {
// 			newWidth = image.width;
// 			newHeight = image.width / aspectRatio;
// 		} else {
// 			newWidth = image.height * aspectRatio;
// 			newHeight = image.height;
// 		}
// 		const x = (image.width - newWidth) / 2;
// 		const y = (image.height - newHeight) / 2;
// 		return {
// 			cropX: x,
// 			cropY: y,
// 			cropWidth: newWidth,
// 			cropHeight: newHeight,
// 		};
// 	},

// 	_render: function (ctx: CanvasRenderingContext2D) {
// 		if (this.disableCrop) {
// 			this.callSuper("_render", ctx);
// 			return;
// 		}
// 		const width = this.width!;
// 		const height = this.height!;
// 		const crop = this.getCrop(this.getOriginalSize(), {
// 			width: this.getScaledWidth(),
// 			height: this.getScaledHeight(),
// 		});
// 		const { cropX, cropY, cropWidth, cropHeight } = crop;

// 		const video = this._element as HTMLVideoElement;
// 		const videoScaledX = video.width / video.videoWidth;
// 		const videoScaledY = video.height / video.videoHeight;

// 		ctx.save();
// 		const customFilter: EffecType = this.customFilter as EffecType;
// 		ctx.filter = getFilterFromEffectType(customFilter);
// 		ctx.drawImage(
// 			this._element as HTMLVideoElement,
// 			Math.max(cropX, 0) / videoScaledX,
// 			Math.max(cropY, 0) / videoScaledY,
// 			Math.max(1, cropWidth) / videoScaledX,
// 			Math.max(1, cropHeight) / videoScaledY,
// 			-width / 2,
// 			-height / 2,
// 			Math.max(0, width),
// 			Math.max(0, height)
// 		);
// 		ctx.filter = "none";
// 		ctx.restore();
// 	},
// });

// function getFilterFromEffectType(effectType: EffecType): string {
// 	switch (effectType) {
// 		case "blackAndWhite":
// 			return "grayscale(100%)";
// 		case "sepia":
// 			return "sepia(100%)";
// 		case "invert":
// 			return "invert(100%)";
// 		case "saturate":
// 			return "saturate(100%)";
// 		default:
// 			return "none";
// 	}
// }

// // Add the new classes to the fabric namespace
// (fabric as any).CoverImage = CoverImage;
// (fabric as any).CoverVideo = CoverVideo;

// export class FabricUtils {
// 	static getClipMaskRect(editorElement: EditorElement, extraOffset: number) {
// 		const extraOffsetX = extraOffset / editorElement.placement.scaleX;
// 		const extraOffsetY = extraOffsetX / editorElement.placement.scaleY;
// 		const clipRectangle = new (fabric as any).Rect({
// 			left: editorElement.placement.x - extraOffsetX,
// 			top: editorElement.placement.y - extraOffsetY,
// 			width: editorElement.placement.width + extraOffsetX * 2,
// 			height: editorElement.placement.height + extraOffsetY * 2,
// 			scaleX: editorElement.placement.scaleX,
// 			scaleY: editorElement.placement.scaleY,
// 			absolutePositioned: true,
// 			fill: "transparent",
// 			stroke: "transparent",
// 			opacity: 0.5,
// 			strokeWidth: 0,
// 		});
// 		return clipRectangle;
// 	}
// }

// // Export the new classes
// export { CoverImage, CoverVideo };

import * as fabric from "fabric";
import { EditorElement, EffecType } from "@/types/change/fabric-types";
import { IImageOptions } from "fabric/fabric-impl";

/**
 * Interface for custom options for CoverImage
 */
export interface ICoverImageOptions extends IImageOptions {
	type: "coverImage";
	customFilter?: string;
	disableCrop?: boolean;
	cropWidth?: number;
	cropHeight?: number;
}

/**
 * Interface for custom options for CoverVideo
 */
export interface ICoverVideoOptions extends IImageOptions {
	type: "coverVideo";
	customFilter?: string;
	disableCrop?: boolean;
	cropWidth?: number;
	cropHeight?: number;
}

/**
 * Class representing a CoverImage, extending fabric.Image
 */
export class CoverImage extends fabric.Image {
	customFilter: string;
	disableCrop: boolean;
	cropWidth: number;
	cropHeight: number;

	constructor(element: HTMLImageElement, options: ICoverImageOptions) {
		super(element, options as any);
		this.type = "coverImage";
		this.customFilter = options.customFilter || "none";
		this.disableCrop = options.disableCrop || false;
		this.cropWidth = options.cropWidth || this.width!;
		this.cropHeight = options.cropHeight || this.height!;
	}

	/**
	 * Calculates the crop dimensions based on the aspect ratio
	 */
	getCrop(
		image: { width: number; height: number },
		size: { width: number; height: number }
	) {
		const width = size.width;
		const height = size.height;
		const aspectRatio = width / height;

		let newWidth: number;
		let newHeight: number;

		const imageRatio = image.width / image.height;

		if (aspectRatio >= imageRatio) {
			newWidth = image.width;
			newHeight = image.width / aspectRatio;
		} else {
			newWidth = image.height * aspectRatio;
			newHeight = image.height;
		}
		const x = (image.width - newWidth) / 2;
		const y = (image.height - newHeight) / 2;
		return {
			cropX: x,
			cropY: y,
			cropWidth: newWidth,
			cropHeight: newHeight,
		};
	}

	/**
	 * Overrides the _render method to apply cropping and filters
	 */
	_render(ctx: CanvasRenderingContext2D) {
		if (this.disableCrop) {
			super._render(ctx);
			return;
		}
		const width = this.width!;
		const height = this.height!;
		const crop = this.getCrop(this.getOriginalSize(), {
			width: this.getScaledWidth(),
			height: this.getScaledHeight(),
		});
		const { cropX, cropY, cropWidth, cropHeight } = crop;
		ctx.save();
		ctx.filter = getFilterFromEffectType(this.customFilter as EffecType);
		ctx.drawImage(
			this.getElement(),
			Math.max(cropX, 0),
			Math.max(cropY, 0),
			Math.max(1, cropWidth),
			Math.max(1, cropHeight),
			-width / 2,
			-height / 2,
			Math.max(0, width),
			Math.max(0, height)
		);
		ctx.filter = "none";
		ctx.restore();
	}
}

/**
 * Class representing a CoverVideo, extending fabric.Image
 */
export class CoverVideo extends fabric.Image {
	customFilter: string;
	disableCrop: boolean;
	cropWidth: number;
	cropHeight: number;

	constructor(element: HTMLVideoElement, options: ICoverVideoOptions) {
		super(element, options as any);
		this.type = "coverVideo";
		this.customFilter = options.customFilter || "none";
		this.disableCrop = options.disableCrop || false;
		this.cropWidth = options.cropWidth || this.width!;
		this.cropHeight = options.cropHeight || this.height!;
	}

	/**
	 * Calculates the crop dimensions based on the aspect ratio
	 */
	getCrop(
		image: { width: number; height: number },
		size: { width: number; height: number }
	) {
		const width = size.width;
		const height = size.height;
		const aspectRatio = width / height;

		let newWidth: number;
		let newHeight: number;

		const imageRatio = image.width / image.height;

		if (aspectRatio >= imageRatio) {
			newWidth = image.width;
			newHeight = image.width / aspectRatio;
		} else {
			newWidth = image.height * aspectRatio;
			newHeight = image.height;
		}
		const x = (image.width - newWidth) / 2;
		const y = (image.height - newHeight) / 2;
		return {
			cropX: x,
			cropY: y,
			cropWidth: newWidth,
			cropHeight: newHeight,
		};
	}

	/**
	 * Overrides the _render method to apply cropping and filters
	 */
	_render(ctx: CanvasRenderingContext2D) {
		if (this.disableCrop) {
			super._render(ctx);
			return;
		}
		const width = this.width!;
		const height = this.height!;
		const crop = this.getCrop(this.getOriginalSize(), {
			width: this.getScaledWidth(),
			height: this.getScaledHeight(),
		});
		const { cropX, cropY, cropWidth, cropHeight } = crop;

		const video = this.getElement() as HTMLVideoElement;
		const videoScaledX = video.width / video.videoWidth;
		const videoScaledY = video.height / video.videoHeight;

		ctx.save();
		ctx.filter = getFilterFromEffectType(this.customFilter as EffecType);
		ctx.drawImage(
			video,
			Math.max(cropX, 0) / videoScaledX,
			Math.max(cropY, 0) / videoScaledY,
			Math.max(1, cropWidth) / videoScaledX,
			Math.max(1, cropHeight) / videoScaledY,
			-width / 2,
			-height / 2,
			Math.max(0, width),
			Math.max(0, height)
		);
		ctx.filter = "none";
		ctx.restore();
	}
}

/**
 * Utility function to get CSS filter string from effect type
 */
function getFilterFromEffectType(effectType: EffecType): string {
	switch (effectType) {
		case "blackAndWhite":
			return "grayscale(100%)";
		case "sepia":
			return "sepia(100%)";
		case "invert":
			return "invert(100%)";
		case "saturate":
			return "saturate(100%)";
		default:
			return "none";
	}
}

/**
 * Utility class for fabric-related helper methods
 */
export class FabricUtils {
	/**
	 * Creates a clip mask rectangle based on the editor element's placement and an extra offset
	 */
	static getClipMaskRect(editorElement: EditorElement, extraOffset: number) {
		const extraOffsetX = extraOffset / editorElement.placement.scaleX;
		const extraOffsetY = extraOffsetX / editorElement.placement.scaleY;
		const clipRectangle = new fabric.Rect({
			left: editorElement.placement.x - extraOffsetX,
			top: editorElement.placement.y - extraOffsetY,
			width: editorElement.placement.width + extraOffsetX * 2,
			height: editorElement.placement.height + extraOffsetY * 2,
			scaleX: editorElement.placement.scaleX,
			scaleY: editorElement.placement.scaleY,
			absolutePositioned: true,
			fill: "transparent",
			stroke: "transparent",
			opacity: 0.5,
			strokeWidth: 0,
		});
		return clipRectangle;
	}
}

// Export the custom classes
// export { CoverImage, CoverVideo };
