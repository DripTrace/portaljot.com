import * as React from "react";

interface TagProps {
    color: string;
    label: string;
}

const Tag: React.FC<TagProps> = ({ color, label }) => (
    <div className="flex gap-1.5">
        <div className={`shrink-0 rounded h-[15px] w-[15px] ${color}`} />
        <div>{label}</div>
    </div>
);

const tags = [
    { color: "bg-yellow-600", label: "Art" },
    { color: "bg-stone-600", label: "Metaverse" },
    { color: "bg-amber-700", label: "Music" },
    { color: "bg-yellow-700", label: "Collectibles" },
    { color: "bg-stone-600", label: "PFP" },
];

const GaugeChart: React.FC = () => {
    return (
        <div className="max-w-[983px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <article className="flex flex-col grow justify-center rounded-3xl border border-solid border-white border-opacity-10 max-md:mt-5 max-md:max-w-full">
                        <div className="flex flex-col py-9 pr-14 pl-5 rounded-lg border border-solid bg-zinc-900 border-white border-opacity-10 max-md:pr-5 max-md:max-w-full">
                            <div className="self-start text-sm font-medium uppercase text-zinc-500">
                                NFT ASSET
                            </div>
                            <figure className="flex overflow-hidden relative flex-col justify-center self-center mt-12 max-w-full rounded-full aspect-[2] w-[306px] max-md:pr-5 max-md:mt-10">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfb4c6734752fa51155196bd100eab6fc5d6e89b6ffe417b8b409cb9c1d72274?apiKey=305a6c025418439087e8bfc27b932f06&"
                                    alt=""
                                    className="object-cover absolute inset-0 size-full"
                                />
                                <div className="flex overflow-hidden relative flex-col justify-center items-start rounded-full aspect-[1.84] max-md:pr-5">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e1096eb-b7c8-4033-bfc8-46d90631ec7f?apiKey=305a6c025418439087e8bfc27b932f06&"
                                        alt=""
                                        className="object-cover absolute inset-0 size-full"
                                    />
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac6f13c9dfe517283a77c7a62f886d137f0a6d5ad34bb1c1a1b6ef2f29c64799?apiKey=305a6c025418439087e8bfc27b932f06&"
                                        alt=""
                                        className="max-w-full rounded-full aspect-square w-[153px]"
                                    />
                                </div>
                            </figure>
                            <div className="flex gap-4 self-end mt-20 text-xs leading-4 whitespace-nowrap text-zinc-400 max-md:mt-10">
                                {tags.map((tag, index) => (
                                    <Tag key={index} {...tag} />
                                ))}
                            </div>
                        </div>
                    </article>
                </section>
                <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <article className="flex flex-col grow justify-center self-stretch w-full text-white rounded-3xl border border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-5 max-md:max-w-full">
                        <div className="flex overflow-hidden relative flex-col py-9 pr-10 pl-5 w-full min-h-[371px] max-md:pr-5 max-md:max-w-full">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c318ce9a11a8d86ce9517bcd468befd969ac111eaa88a7e74bbe18f84bccff93?apiKey=305a6c025418439087e8bfc27b932f06&"
                                alt=""
                                className="object-cover absolute inset-0 size-full"
                            />
                            <div className="relative text-sm font-medium uppercase text-zinc-500 max-md:max-w-full">
                                PORTFOLIO VALUE
                            </div>
                            <div className="relative self-center mt-8 text-3xl font-semibold tracking-normal leading-7">
                                $2355.00
                            </div>
                            <div className="flex relative gap-5 justify-between self-start mt-56 ml-4 text-xs leading-4 whitespace-nowrap max-md:mt-10 max-md:ml-2.5">
                                <div>Mon</div>
                                <div>Tues</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                                <div>Sun</div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
};

export default GaugeChart;
