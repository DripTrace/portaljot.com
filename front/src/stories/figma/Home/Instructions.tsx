import * as React from "react";

type SectionProps = {
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: React.ReactNode;
    buttonText: string;
    buttonAction: () => void;
};

const Section: React.FC<SectionProps> = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    buttonAction,
}) => (
    <section className="flex gap-5 justify-between px-8 py-10 mt-8 w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap">
            <img
                loading="lazy"
                src={imgSrc}
                alt={imgAlt}
                className="shrink-0 w-11 aspect-square"
            />
            <article className="flex flex-col grow shrink-0 self-start basis-0 w-fit max-md:max-w-full">
                <h2 className="text-sm font-semibold leading-5 text-white max-md:max-w-full">
                    {title}
                </h2>
                <p className="mt-4 text-xs leading-5 text-neutral-400 max-md:max-w-full">
                    {description}
                </p>
            </article>
        </div>
        <button
            onClick={buttonAction}
            className="justify-center self-start p-3.5 text-xs font-medium bg-lime-300 rounded-[30px] text-neutral-900"
        >
            {buttonText}
        </button>
    </section>
);

function Instructions() {
    return (
        <div className="flex flex-col p-6 rounded-2xl border border-solid border-neutral-700 max-md:px-5">
            <header className="text-base font-medium text-white uppercase max-md:max-w-full">
                GET STARTED
            </header>
            <p className="mt-1 text-base leading-7 text-zinc-400 max-md:max-w-full">
                Complete your profile to win rewards!
            </p>
            <Section
                imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/90d33256e35cf86fff055dc56a465e3b96357908b8ee6e08469d5a2474441b19?apiKey=305a6c025418439087e8bfc27b932f06&"
                imgAlt="Ranking Icon"
                title="SEE HOW YOU RANK AGAINST OTHER WEB3 CREATORS"
                description={
                    <span>
                        <span className="font-semibold text-white">
                            50 $OVA
                        </span>{" "}
                        for every additional wallet after the first (This wallet
                        must have at least 1 NFT)
                    </span>
                }
                buttonText="See More"
                buttonAction={() => alert("See More clicked!")}
            />
            <Section
                imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ccb8489c4e7d4cae7e66701a66b546dadc86986980dfa3a798378bd47af02d30?apiKey=305a6c025418439087e8bfc27b932f06&"
                imgAlt="Complete Profile Icon"
                title="COMPLETE PROFILE"
                description={
                    <span>
                        Finish your profile to earn{" "}
                        <span className="font-semibold text-white">
                            250 $OVA!
                        </span>
                    </span>
                }
                buttonText="Go to profile"
                buttonAction={() => alert("Go to profile clicked!")}
            />
            <Section
                imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/5ccc54201b427f7497c9b3755ae6763cea7bcd50bd47889fb74ad9d6c187ca8d?apiKey=305a6c025418439087e8bfc27b932f06&"
                imgAlt="Invite Users Icon"
                title="INVITE USERS"
                description={
                    <span>
                        For every user you invite, you get{" "}
                        <span className="font-semibold text-white">
                            50 $OVA
                        </span>
                        . Send proof to hello@ovation.network or on Twitter
                        ovation_network
                    </span>
                }
                buttonText="Copy referral link"
                buttonAction={() => alert("Copy referral link clicked!")}
            />
        </div>
    );
}

export default Instructions;
