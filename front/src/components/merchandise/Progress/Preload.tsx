// "use client";

// import CatsAndSkullsPatternBanner from "@/lib/merchandise/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner";
// import { useEffect, useRef } from "react";

// const Preload = () => {
//     const ref = useRef(null);

//     useEffect(() => {
//         const loader: any = ref.current;
//         let bannerRef = loader.querySelector(
//             "#cats-and-skulls-pattern-banner0"
//         );
//         const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
//             (acc, el) => {
//                 const { x, y, width, height } = el.getBBox();
//                 if (!acc.xMin || x < acc.xMin) acc.xMin = x;
//                 if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
//                 if (!acc.yMin || y < acc.yMin) acc.yMin = y;
//                 if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
//                 return acc;
//             },
//             {}
//         );
//         const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
//         bannerRef.setAttribute("viewBox", viewbox);
//     }, []);

//     useEffect(() => {
//         const loader: any = ref.current;
//         let bannerRef = loader.querySelector(
//             "#cats-and-skulls-pattern-banner1"
//         );
//         const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
//             (acc, el) => {
//                 const { x, y, width, height } = el.getBBox();
//                 if (!acc.xMin || x < acc.xMin) acc.xMin = x;
//                 if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
//                 if (!acc.yMin || y < acc.yMin) acc.yMin = y;
//                 if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
//                 return acc;
//             },
//             {}
//         );
//         const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
//         bannerRef.setAttribute("viewBox", viewbox);
//     }, []);

//     useEffect(() => {
//         const loader: any = ref.current;
//         let bannerRef = loader.querySelector(
//             "#cats-and-skulls-pattern-banner2"
//         );
//         const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
//             (acc, el) => {
//                 const { x, y, width, height } = el.getBBox();
//                 if (!acc.xMin || x < acc.xMin) acc.xMin = x;
//                 if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
//                 if (!acc.yMin || y < acc.yMin) acc.yMin = y;
//                 if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
//                 return acc;
//             },
//             {}
//         );
//         const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
//         bannerRef.setAttribute("viewBox", viewbox);
//     }, []);

//     useEffect(() => {
//         const loader: any = ref.current;
//         let bannerRef = loader.querySelector(
//             "#cats-and-skulls-pattern-banner3"
//         );
//         const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
//             (acc, el) => {
//                 const { x, y, width, height } = el.getBBox();
//                 if (!acc.xMin || x < acc.xMin) acc.xMin = x;
//                 if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
//                 if (!acc.yMin || y < acc.yMin) acc.yMin = y;
//                 if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
//                 return acc;
//             },
//             {}
//         );
//         const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
//         bannerRef.setAttribute("viewBox", viewbox);
//     }, []);

//     return (
//         <>
//             <section
//                 className="h-screen flex overflow-hidden relative first:bg-gray-300 nth-child:bg-gray-800"
//                 ref={ref}
//             >
//                 <div className="w-1/2 relative overflow-hidden first:stroke-[0.125em] first:stroke-black first:fill-transparent">
//                     <div className="initial-page-loaders right-[-80%]">
//                         <CatsAndSkullsPatternBanner
//                             id="cats-and-skulls-pattern-banner0"
//                             name=""
//                             className="h-[12em]"
//                         />
//                         <CatsAndSkullsPatternBanner
//                             id="cats-and-skulls-pattern-banner1"
//                             name=""
//                             className="h-[12em]"
//                         />
//                     </div>
//                 </div>
//                 <div className="w-1/2 relative overflow-hidden">
//                     <div className="initial-page-loaders left-[-20%]">
//                         <CatsAndSkullsPatternBanner
//                             id="cats-and-skulls-pattern-banner2"
//                             name=""
//                             className="h-[12em]"
//                         />
//                         <CatsAndSkullsPatternBanner
//                             id="cats-and-skulls-pattern-banner3"
//                             name=""
//                             className="h-[12em]"
//                         />
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Preload;

"use client";

import CatsAndSkullsPatternBanner from "@/lib/merchandise/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner";
import { useEffect, useRef, RefObject } from "react";

const calculateViewBox = (bannerRef: SVGSVGElement) => {
    const { xMin, xMax, yMin, yMax } = Array.from(bannerRef.children).reduce(
        (acc, el) => {
            const { x, y, width, height } = (
                el as SVGGraphicsElement
            ).getBBox();
            return {
                xMin: acc.xMin === null || x < acc.xMin ? x : acc.xMin,
                xMax:
                    acc.xMax === null || x + width > acc.xMax
                        ? x + width
                        : acc.xMax,
                yMin: acc.yMin === null || y < acc.yMin ? y : acc.yMin,
                yMax:
                    acc.yMax === null || y + height > acc.yMax
                        ? y + height
                        : acc.yMax,
            };
        },
        {
            xMin: null as number | null,
            xMax: null as number | null,
            yMin: null as number | null,
            yMax: null as number | null,
        }
    );

    // Ensure that xMin, xMax, yMin, and yMax are not null before creating the viewbox string
    if (xMin !== null && xMax !== null && yMin !== null && yMax !== null) {
        return `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    }
    return "0 0 100 100"; // Default viewBox if something goes wrong
};

const Preload = () => {
    const ref: RefObject<HTMLDivElement> = useRef(null);

    const setViewBoxForBanner = (bannerId: string) => {
        const loader = ref.current;
        if (loader) {
            const bannerRef = loader.querySelector<SVGSVGElement>(
                `#${bannerId}`
            );
            if (bannerRef) {
                const viewBox = calculateViewBox(bannerRef);
                bannerRef.setAttribute("viewBox", viewBox);
            }
        }
    };

    useEffect(() => {
        [
            "cats-and-skulls-pattern-banner0",
            "cats-and-skulls-pattern-banner1",
            "cats-and-skulls-pattern-banner2",
            "cats-and-skulls-pattern-banner3",
        ].forEach((bannerId) => setViewBoxForBanner(bannerId));
    }, []);

    return (
        <section
            className="h-screen flex overflow-hidden relative first:bg-gray-300 nth-child:bg-gray-800"
            ref={ref}
        >
            <div className="w-1/2 relative overflow-hidden first:stroke-[0.125em] first:stroke-black first:fill-transparent">
                <div className="initial-page-loaders right-[-80%]">
                    <CatsAndSkullsPatternBanner
                        id="cats-and-skulls-pattern-banner0"
                        name=""
                        className="h-[12em]"
                    />
                    <CatsAndSkullsPatternBanner
                        id="cats-and-skulls-pattern-banner1"
                        name=""
                        className="h-[12em]"
                    />
                </div>
            </div>
            <div className="w-1/2 relative overflow-hidden">
                <div className="initial-page-loaders left-[-20%]">
                    <CatsAndSkullsPatternBanner
                        id="cats-and-skulls-pattern-banner2"
                        name=""
                        className="h-[12em]"
                    />
                    <CatsAndSkullsPatternBanner
                        id="cats-and-skulls-pattern-banner3"
                        name=""
                        className="h-[12em]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Preload;
