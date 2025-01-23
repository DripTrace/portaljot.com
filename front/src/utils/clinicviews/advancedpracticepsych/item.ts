// utils.ts
import imagesLoaded from "imagesloaded";

export const preloadImages = (selector: string = "img"): Promise<void> => {
	return new Promise((resolve) => {
		imagesLoaded(
			document.querySelectorAll(selector),
			{ background: true },
			() => {
				resolve();
			}
		);
	});
};

export const preloadFonts = (id: string): Promise<void> => {
	return new Promise((resolve) => {
		(window as any).WebFont.load({
			typekit: {
				id: id,
			},
			active: () => resolve(),
			inactive: () => resolve(), // Adding this to handle font loading failures
		});
	});
};
