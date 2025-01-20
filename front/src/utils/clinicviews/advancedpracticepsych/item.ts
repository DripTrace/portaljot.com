// import imagesLoaded from "imagesloaded";
// import WebFont from "webfontloader";

// export const preloadImages = (selector: string = "img"): Promise<void> => {
//     return new Promise<void>((resolve) => {
//         imagesLoaded(
//             document.querySelectorAll(selector),
//             { background: true },
//             () => resolve()
//         );
//     });
// };

// export const preloadFonts = (id: string): Promise<void> => {
//     return new Promise((resolve) => {
//         WebFont.load({
//             typekit: {
//                 id: id,
//             },
//             active: resolve,
//             inactive: resolve, // Add this to ensure the promise resolves even if fonts fail to load
//         });
//     });
// };

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
