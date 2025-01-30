import * as React from "react";

interface LaunchPartnerImageProps {
    src: string;
    alt: string;
}

const LaunchPartnerImage: React.FC<LaunchPartnerImageProps> = ({
    src,
    alt,
}) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 rounded-full aspect-square w-[95px]"
    />
);

const launchPartners = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3456668059020c470552608e3b2a4ab9be165fae5d2e7bac14d1edbb0a75633a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 1",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1869508cc55837940000fd9d69b090588f1641f3ef8667f7d245206a1748f74?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 2",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5581c4136658feaa228356b2666200f9e7b7b51f92d17fd87477e0b51fb5fac6?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 3",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/52daa363fae8ef1e53bf9cd769b3113842af34d4911404c226d22a3f5e3a7208?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 4",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b94c3fa6e4f99b6327794a1173f853adc24a6e4c188d888f3de90b92278529f9?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 5",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/77e162ced56274ed893d0e59f16dcce8f5a34d400bc3bf93652ef3c6b08138ee?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 6",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b415931fddf548a49bce1a63b58868dd3d9c16d9657c8281c788d4d878ff8f82?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 7",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/31834814b4d1c40cd4a975c166e19807e2a9bc6a698350fe0a1d844a2f571d0c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 8",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a872add904ba5dd07b8c8ae306f5f1e69cff96bd6b2d8acae9d5e84394d4a96e?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 9",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f32970fea1e237df086f1c6fc259a527d31191484bcdeec64ecc8c75fbccd0c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 10",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b51356f2d2e04ac3600859af96107dffe731f7a69c1a6c5c857ff9d6cab2b665?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 11",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e08d81814f24bd9be26c110aa5bc6c02c2ac66573519cdb5336cc7b8e67e9f3d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 12",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/849a80ca10e53897396fa2879dc78cafc89c094c543adb5e59ce08a55412a5d5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 13",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6747f799d83f4110d8d74ce031a3ce0cb2da576ae93cb7177249f1885a137237?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 14",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b26311dea9a9e96e1edaab825d3d8055067b8e846226502716b7c54b2768b9b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Launch partner 15",
    },
];

const LaunchPartners: React.FC = () => (
    <div className="flex gap-5 justify-between py-3.5 mt-2 max-md:flex-wrap">
        {launchPartners.map((partner, index) => (
            <LaunchPartnerImage
                key={index}
                src={partner.src}
                alt={partner.alt}
            />
        ))}
    </div>
);

const Partners: React.FC = () => (
    <section className="flex justify-center items-center px-16 pb-20 bg-zinc-950 max-md:px-5">
        <div className="flex-wrap content-start w-full max-w-[1226px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <h2 className="self-stretch text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                        Over 40 launch partners have already joined us on our
                        journey
                    </h2>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                        <p className="text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                            Are you ready to build your community on Ovation
                            before anyone else?
                        </p>
                        <LaunchPartners />
                        <LaunchPartners />
                        <LaunchPartners />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Partners;
