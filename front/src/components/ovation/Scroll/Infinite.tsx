// import React, { useEffect, useState } from "react";

// interface TagRow {
//     duration: number;
//     tags: string[];
//     reverse: boolean;
// }

// const App: React.FC = () => {
//     const [rows, setRows] = useState<TagRow[]>([]);

//     useEffect(() => {
//         const newRows = Array.from({ length: 5 }, (_, i) => ({
//             duration: Math.random() * (15000 - 10000) + 10000, // Random duration between 10s and 15s
//             tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "GraphQL"],
//             reverse: i % 2 === 0,
//         }));
//         setRows(newRows);
//     }, []);

//     return (
//         <div className="app">
//             <header>
//                 <h1>Infinite Scroll Animation</h1>
//                 <p>
//                     CSS only, content independent, bi-directional, customizable
//                 </p>
//             </header>
//             {rows.map((row, index) => (
//                 <InfiniteLoopSlider
//                     key={index}
//                     duration={row.duration}
//                     reverse={row.reverse}
//                     tags={row.tags}
//                 />
//             ))}
//         </div>
//     );
// };

// interface InfiniteLoopSliderProps {
//     duration: number;
//     reverse: boolean;
//     tags: string[];
// }

// const InfiniteLoopSlider: React.FC<InfiniteLoopSliderProps> = ({
//     duration,
//     reverse,
//     tags,
// }) => {
//     const sliderStyle: React.CSSProperties = {
//         "--duration": `${duration}ms`,
//         "--direction": reverse ? "reverse" : "normal",
//     } as React.CSSProperties;

//     return (
//         <div className="loop-slider" style={sliderStyle}>
//             <div className="inner">
//                 {tags.map((tag) => (
//                     <Tag key={tag} text={tag} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const Tag: React.FC<{ text: string }> = ({ text }) => (
//     <div className="tag">#{text}</div>
// );

// export default App;

import { useEffect, useState } from "react";

// Constants for setup
const TAGS = [
    "HTML",
    "CSS",
    "JavaScript",
    "Typescript",
    "Tailwind",
    "React",
    "Next.js",
    "Gatsby",
    "UI/UX",
    "SVG",
    "animation",
    "webdev",
];
const DURATION = 30000; // Duration of each scroll cycle

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const InfiniteScrollTags = () => {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        // Repeat tags to ensure there is enough content to scroll continuously
        setTags(shuffle([...TAGS, ...TAGS, ...TAGS])); // Triple the tags for longer scrolling
    }, []);

    return (
        <div className="overflow-hidden relative max-w-[80rem]">
            <div
                className="whitespace-nowrap animate-marquee"
                style={{ animationDuration: `${DURATION}ms` }}
            >
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-800 text-white p-2 mr-2 rounded"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScrollTags;
