import gsap from "https://cdn.skypack.dev/gsap@3.12.0";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
    const toSplit = document.querySelector("[data-split]");
    if (!toSplit) return;

    const content = toSplit.innerText;
    const contentLength = content.length;

    const PPC = 10; // Pixels per character...
    const BUFFER = 40;

    document.documentElement.style.setProperty("--buffer", BUFFER.toString());
    document.documentElement.style.setProperty("--ppc", PPC.toString());
    document.documentElement.style.setProperty("--pad", "8");
    document.documentElement.style.setProperty(
        "--content-length",
        (contentLength + 2).toString()
    );

    const words = content.split(" ");
    toSplit.innerHTML = "";
    let cumulation = 10;
    words.forEach((word, index) => {
        const text = Object.assign(document.createElement("span"), {
            innerHTML: `<span>${word} </span>`,
            className: "word",
        });
        text.dataset.index = index.toString();
        text.dataset.start = cumulation.toString();
        text.dataset.end = (cumulation + word.length).toString();
        cumulation += word.length + 1;
        toSplit.appendChild(text);
    });

    if (!CSS.supports("animation-timeline: scroll()")) {
        gsap.registerPlugin(ScrollTrigger);
        console.info("GSAP ScrollTrigger: Registered");
        // Animate the words
        gsap.utils.toArray(".word").forEach((word) => {
            gsap.to(word, {
                scrollTrigger: {
                    trigger: ".reader",
                    start: `top top-=${word.dataset.start * PPC}`,
                    end: `top top-=${word.dataset.end * PPC}`,
                    toggleClass: "active",
                    scrub: true,
                },
            });
        });

        // ... rest of the GSAP animations ...
    } else {
        // Use CSS scroll-driven animations if supported
        toSplit.style.viewTimeline = "--reader block";
        gsap.utils.toArray(".word").forEach((word) => {
            word.style.animation = "activate both steps(1)";
            word.style.animationTimeline = "--reader";
            word.style.animationRange = `contain ${word.dataset.start * PPC}px contain ${word.dataset.end * PPC}px`;
        });
    }

    // ... rest of the script ...
});

// Theme toggling
const TOGGLE = document.querySelector(".theme-toggle");

const SWITCH = () => {
    const isDark = TOGGLE.matches("[aria-pressed=true]") ? false : true;
    TOGGLE.setAttribute("aria-pressed", isDark);
    document.documentElement.dataset.theme = isDark ? "light" : "dark";
};

const TOGGLE_THEME = () => {
    if (!document.startViewTransition) SWITCH();
    document.startViewTransition(SWITCH);
};

document.documentElement.dataset.theme = "dark";
TOGGLE.addEventListener("click", TOGGLE_THEME);
