import React from "react";

type BadgeProps = {
    src: string;
    alt: string;
    label: string;
};

type SocialProps = {
    src: string;
    alt: string;
};

type NFTProps = {
    src: string;
    alt: string;
};

const Badge: React.FC<BadgeProps> = ({ src, alt, label }) => (
    <div className="flex flex-col">
        <img
            loading="lazy"
            src={src}
            alt={alt}
            className="self-center aspect-square w-[50px]"
        />
        <div className="mt-2">{label}</div>
    </div>
);

const Social: React.FC<SocialProps> = ({ src, alt }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 aspect-square w-[39px]"
    />
);

const NFT: React.FC<NFTProps> = ({ src, alt }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 max-w-full aspect-[1.49] w-[104px]"
    />
);

const About: React.FC = () => {
    const badges = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/53937dff1c55ec911e238426ecbee249169aa2e362ab04c447bfafa240ceb148?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Portfolio badge",
            label: "Portfolio",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7d4f9baea9b7d8d500f61f7be16028f61602b2942165762529016aa129722a4?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Portfolio badge",
            label: "Portfolio",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0705ea2d065e33f7e892ff887de61ab75ab1445efe18040969743c0c21e47af0?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Portfolio badge",
            label: "Portfolio",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0714b3f473c544749998dfde9f8e1a5562637c21f13249f4753b3b01fd7d8e4?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Portfolio badge",
            label: "Portfolio",
        },
    ];

    const socials = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/caedc9f95da2d75def640caa01921bcdf924b93bee579f9fe4d31394c4c75144?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Social 1",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a269343d0ef8dfe56e51fd6c101c5c5975d182153aa7376cbc3f90e9074a2d66?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Social 2",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/373a6380407789fcd8242827c34e0339128f83b8dc9ab123989b296f63596466?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Social 3",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2022c3fbacb0ad58485c234ab23fe0d0b194e97cc685ef0a1688fcc3eacf0aee?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Social 4",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/755fb9c0e02930d42d8592819d9e10e689d4b570f454aa450939ae7dd330edb0?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Social 5",
        },
    ];

    const nfts = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c33cd2c89a5aa379e07d5b5dd90494c1833020e27c57dae0942ecc8f65608e4?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Favorite NFT 1",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f64d4f716b0b09084927050aa0f6c31972f39f5d140c03a4e2922577a748d8f?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Favorite NFT 2",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e9d1295f66bcbcb25196c94de6d8acc52e153e55e20790c37bc84bb8415628?apiKey=305a6c025418439087e8bfc27b932f06&",
            alt: "Favorite NFT 3",
        },
    ];

    return (
        <div className="flex flex-col mx-auto w-full max-w-[480px]">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ed76ed46ee08f9f8044ebdb1290e732d7d0b463e53f841a4aaf94ab8e26ae5f?apiKey=305a6c025418439087e8bfc27b932f06&"
                className="w-40 max-w-full aspect-[1.01]"
                alt="Profile"
            />
            <div className="flex gap-4 px-5 mt-11 text-3xl font-semibold tracking-normal leading-7 text-white">
                <h1 className="text-3xl font-semibold">The pancake chief</h1>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4fbe89bcb06679e2da245fe95b457b65039fd6dadf0325bc78c8c57a97f232d?apiKey=305a6c025418439087e8bfc27b932f06&"
                    className="shrink-0 my-auto aspect-square w-[26px]"
                    alt="Verified Badge"
                />
            </div>
            <div className="flex gap-1 justify-center px-5 mt-2">
                <div className="text-xl tracking-normal leading-8 text-zinc-400">
                    @pancakeguy
                </div>
                <div className="justify-center px-2.5 py-1 my-auto text-xs leading-4 text-white border border-solid bg-neutral-800 border-white border-opacity-10 rounded-[44.113px]">
                    OVA TOKEN: 10
                </div>
            </div>
            <section className="flex flex-col px-5 py-4 mt-9 w-full text-sm rounded-3xl bg-zinc-900">
                <div className="font-semibold tracking-normal text-white leading-[143%]">
                    CEO @ Slack
                </div>
                <div className="self-start mt-5 text-base leading-7 text-neutral-200">
                    Web3 dude, focusing on getting more foes friends and
                    collections, WAGMI, Web3
                </div>
                <div className="flex gap-5 justify-between mt-8 text-lg whitespace-nowrap">
                    <div className="flex gap-2.5">
                        <div className="my-auto font-semibold leading-[111%] text-neutral-200">
                            752
                        </div>
                        <div className="font-medium capitalize text-zinc-500">
                            Following
                        </div>
                    </div>
                    <div className="flex gap-2.5">
                        <div className="my-auto font-semibold leading-[111%] text-neutral-200">
                            11k
                        </div>
                        <div className="font-medium capitalize text-zinc-500">
                            Followers
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-between py-1.5 pr-1.5 mt-5 leading-[143%] text-zinc-400">
                    <div className="flex gap-2 justify-between">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bf577849a9ed5bd9ef3b7c7b41354874b925683c02416bbe8dd0696e1b10ca3?apiKey=305a6c025418439087e8bfc27b932f06&"
                            className="shrink-0 self-start aspect-square w-[18px]"
                            alt="Content Creator Icon"
                        />
                        <div>Content creator</div>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c74e25d5091b8a595c1608032c4515d16d5f91323c31f1f6c693c3ab54dc3d2?apiKey=305a6c025418439087e8bfc27b932f06&"
                            className="shrink-0 self-start aspect-square w-[18px]"
                            alt="Web3 Icon"
                        />
                        <div>Web3</div>
                    </div>
                    <div className="flex gap-2">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c09484ce9b568b6967394f1e840f4e759e3d6947c0273a46f41a2825ed1d0514?apiKey=305a6c025418439087e8bfc27b932f06&"
                            className="shrink-0 self-start aspect-[1.05] w-[19px]"
                            alt="Date Icon"
                        />
                        <div>Dec 2021</div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col px-5 py-5 mt-9 w-full rounded-3xl bg-zinc-900">
                <div className="text-sm font-medium uppercase text-zinc-500">
                    BADGES
                </div>
                <div className="flex gap-3 justify-between py-1.5 mt-4 text-xs leading-4 text-zinc-400">
                    {badges.map((badge, index) => (
                        <Badge key={index} {...badge} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
                <div className="text-sm font-medium uppercase text-zinc-500">
                    SOCIALS
                </div>
                <div className="flex gap-4 justify-between py-1.5 mt-4">
                    {socials.map((social, index) => (
                        <Social key={index} {...social} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
                <div className="text-sm font-medium uppercase text-zinc-500">
                    FAVOURITE NFT
                </div>
                <div className="flex gap-1.5 py-1.5 mt-4">
                    {nfts.map((nft, index) => (
                        <NFT key={index} {...nft} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
