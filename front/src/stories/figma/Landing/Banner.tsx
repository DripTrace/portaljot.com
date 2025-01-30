import * as React from "react";

interface JoinUsProps {
    title: string;
    highlightedText: string;
}

const JoinUs: React.FC<JoinUsProps> = ({ title, highlightedText }) => {
    return (
        <section className="flex justify-center items-end px-16 py-16 font-medium tracking-tighter text-lime-300 uppercase bg-zinc-950 leading-[355px] text-[279px] max-md:pl-5 max-md:max-w-full max-md:text-4xl max-md:leading-[57px]">
            {title} <span className="text-lime-300">{highlightedText}</span>
        </section>
    );
};

const Banner: React.FC = () => {
    return (
        <main>
            <JoinUs title="JOIN US AS A" highlightedText="PATNER" />
        </main>
    );
};

export default Banner;
