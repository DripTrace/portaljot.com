import * as React from "react";

interface LogoProps {
    src: string;
    alt: string;
    width: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, width }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`shrink-0 max-w-full aspect-[2.33] w-[${width}]`}
    />
);

const logos: LogoProps[] = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f59e1be0ed7a85c6ed56fc3de814d1c3910243bf4cf443bff5960334c0939f06?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Logo 1",
        width: "140px",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c8a16399630fa1114c31ae0837acee2fcd458636f5f645f21acc16baff0bbab3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Logo 2",
        width: "139px",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/94fc18de3229e9965f77ce3d430399eb63e0145a9d5da42a38d8ed04bdce9ef2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Logo 3",
        width: "184px",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e1db8f1fb17d0eb441a777169d2c5d7abe70b8611ac12efbae5c15473001990?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Logo 4",
        width: "184px",
    },
];

const AsSeenOn: React.FC = () => {
    return (
        <section className="flex justify-center items-center px-16 py-20 bg-zinc-950 max-md:px-5">
            <div className="flex flex-col items-center mt-5 w-full max-w-[1226px] max-md:max-w-full">
                <h2 className="self-stretch text-5xl font-bold tracking-tighter text-center text-gray-200 uppercase leading-[78px] max-md:max-w-full max-md:text-4xl">
                    As seen on
                </h2>
                <hr className="shrink-0 mt-14 max-w-full h-px w-[970px] max-md:mt-10" />
                <div className="flex gap-5 justify-between mt-5 max-w-full w-[970px] max-md:flex-wrap">
                    {logos.map((logo, index) => (
                        <Logo
                            key={index}
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                        />
                    ))}
                </div>
                <hr className="shrink-0 mt-5 max-w-full h-px w-[970px]" />
            </div>
        </section>
    );
};

export default AsSeenOn;
