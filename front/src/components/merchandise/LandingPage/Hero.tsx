"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero = () => {
    if (typeof window !== "undefined") {
        gsap.registerPlugin(MotionPathPlugin);
        gsap.registerPlugin(ScrollTrigger);
    }

    const ref = useRef<HTMLDivElement>(null); // Change ref type to HTMLDivElement

    useEffect(() => {
        const featuredOne = ref.current;

        if (!featuredOne) return; // Early return if featuredOne is null

        const path_1 = featuredOne.querySelector<SVGPathElement>("#path1");
        const rectRef =
            featuredOne.querySelector<HTMLElement>("#whiskers-and-pipe");
        const landing = featuredOne.querySelector<HTMLElement>("#landing");

        if (path_1 && rectRef && landing) {
            const path_1_length = path_1.getTotalLength();

            path_1.style.strokeDasharray = `${path_1_length} ${path_1_length}`;
            path_1.style.strokeDashoffset = path_1_length.toString();

            document.addEventListener("scroll", (e) => {
                e.preventDefault();

                const event: any = e.target;
                const scrollPercentage =
                    (event.documentElement.scrollTop +
                        event.getElementById("landing").scrollTop) /
                    (event.documentElement.scrollHeight -
                        event.documentElement.clientHeight);
                const drawLength = path_1_length * scrollPercentage;
                path_1.style.strokeDashoffset = `${path_1_length - drawLength}`;
            });

            gsap.set(rectRef, { autoAlpha: 1 });

            gsap.defaults({ ease: "none" });
            gsap.timeline({
                scrollTrigger: {
                    trigger: landing,
                    scrub: true,
                },
            }).to(rectRef, {
                rotate: "90deg",
                rotationY: "-3rad",
                skewY: "10deg",
                immediateRender: true,
                motionPath: {
                    path: path_1,
                    align: path_1,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                },
            });
        }
    }, []);

    return <div ref={ref}>hero</div>;
};

export default Hero;
