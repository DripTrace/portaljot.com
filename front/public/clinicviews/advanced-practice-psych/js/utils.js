// /**
//  * Preloads images specified by the CSS selector.
//  * @function
//  * @param {string} [selector='img'] - CSS selector for target images.
//  * @returns {Promise} - Resolves when all specified images are loaded.
//  */
// const preloadImages = (selector = 'img') => {
//     return new Promise((resolve) => {
//         // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
//         imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
//     });
// };

// // Preload fonts
// // const preloadFonts = (id) => {
// //     return new Promise((resolve) => {
// //         WebFont.load({
// //             typekit: {
// //                 id: id
// //             },
// //             active: resolve
// //         });
// //     });
// // };
// const preloadFonts = (id) => {
//     return new Promise((resolve) => {
//         if (typeof WebFont !== 'undefined') {
//             WebFont.load({
//                 typekit: {
//                     id: id
//                 },
//                 active: resolve
//             });
//         } else {
//             console.warn('WebFont is not defined. Skipping font preloading.');
//             resolve();
//         }
//     });
// };

// // Exporting utility functions for use in other modules.
// export {
//     preloadImages,
//     preloadFonts
// };


/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */
export const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
};

/**
 * Preload fonts
 * @function
 * @param {string} id - The Typekit ID
 * @returns {Promise} - Resolves when fonts are loaded
 */
export const preloadFonts = (id) => {
    return new Promise((resolve) => {
        if (typeof WebFont !== 'undefined') {
            WebFont.load({
                typekit: {
                    id: id
                },
                active: resolve
            });
        } else {
            console.warn('WebFont is not defined. Skipping font preloading.');
            resolve();
        }
    });
};