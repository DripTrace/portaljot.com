import * as React from "react";
// import Land from "@/stories/figma/Landing/Land";
// import { Route } from "react-router";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link as DomLink,
} from "react-router-dom";
import { HomePage } from "@/app/HomePage";
import { ProfilePage } from "@/app/ProfilePage";
import { SettingsPage } from "@/app/SettingsPage";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: "lazy" | "eager";
}

const Image: React.FC<ImageProps> = ({ src, alt, className, loading }) => (
    <img src={src} alt={alt} className={className} loading={loading} />
);

interface MakeLinkProps {
    children: React.ReactNode;
    className?: string;
}

const MakeLink: React.FC<MakeLinkProps> = ({ children, className }) => (
    <div className={className}>{children}</div>
);

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => (
    <div
        className={`text-5xl font-bold tracking-tighter text-center text-gray-200 uppercase leading-[78px] max-md:max-w-full max-md:text-4xl ${className}`}
    >
        {children}
    </div>
);

interface SectionSubtitleProps {
    children: React.ReactNode;
    className?: string;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
    children,
    className,
}) => (
    <div
        className={`mt-2 text-2xl font-medium tracking-tighter leading-9 text-center text-zinc-500 w-[919px] max-md:max-w-full ${className}`}
    >
        {children}
    </div>
);

interface FeatureProps {
    icon: string;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/298332e60e69e5f1b94a502a3c3bb686aefe3f44aa38abb1f35310f776564e3a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "NFTs Enthusiast",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f9f3d3349f8bb0f276269a489a1d1e976224e372098ea13e0ede27e6fd511d4?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "WALLETS",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5db5de88adaed16e9e0d8b8b8e10df42d53f208b97bff393f1ca25cb5a6a13c6?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "OVATION",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
];

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-10 rounded-xl max-md:mt-10">
            <Image src={icon} alt="" className="w-14 aspect-square" />
            <div className="mt-6 text-2xl font-semibold leading-9 text-white uppercase">
                {title}
            </div>
            <div className="mt-1 text-xl leading-7 text-zinc-400">
                {description}
            </div>
        </div>
    </div>
);

interface PartnerLogoProps {
    src: string;
    alt: string;
}

const partnerLogos: PartnerLogoProps[] = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5769f44a43bb2b5de53434618d318e6a5ac43c2e521f04d98b5d2e68e639ef14?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 1",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7e7d9999aaf959a1a4b5f54fa8704531c16e750d99d8d92f0772eea68ee31c1?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 2",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f69e2ce0fc2ebf0355f5925d9d5531fe9c3b08f7dc50e036360ac09d4f69824?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 3",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f09efa2d76d436dee4b2abb3415add76ec4471b80b89ace2456a9b96f42e26f2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 4",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7451e88a8822666598793013f70eb2c68474b1fd1790fa60ad94b35c4aacffc8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 5",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/174a2a4fbfdfca1c10faddadde0b37d3f5a027f82cf33eb62abe2da0dab556b5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 6",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/42ea3ecfc96f67c741a85c8d9ef0b08967ec6d09e63188e7b831e209de0c0d6f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 7",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/751290f187cab410e3c019fea18330d94945241407b7845b7cc3fc6a56bc0027?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 8",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eea4bc338214961c36bfa220bced24885057804084b88c94f0402a918146dd7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 9",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4839658f9e8b708d3809cd20adabaccf2f032310ca0a65d8d925d46084924b2b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 10",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/df7af98021ccb099d9dd5393404684acadaa5d065cfeb50565b473aec250b571?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 11",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d05e39f4266e5fa1990e09a007fe799d71667447e4acb6aee0b32aa03b4401a6?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 12",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c55e6ec8ce239b83adc5d3c260f1aef8e8193f15f0be019d58bf0c51dd7bba21?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 13",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/17e6823b59fe5e1fc2283599d223ba9718846095ab385fd2262142df6d69d80c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 14",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2d27c5cd42bfa741b381830b8560905fc67910a74021038699a8d341b093d51?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Partner 15",
    },
];

const PartnerLogo: React.FC<PartnerLogoProps> = ({ src, alt }) => (
    <Image
        src={src}
        alt={alt}
        className="shrink-0 rounded-full aspect-square w-[95px]"
    />
);

interface ArticleProps {
    image: string;
    title: string;
    date: string;
}

const articles: ArticleProps[] = [
    {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a93e0c8eca88cafa0dd724d42baddf8b3bee384a4b6ebcee17e8217251415?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "Ovation. The First NFT Superapp Working to Transform Your NFT Experience.",
        date: "15/3/2023",
    },
    {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/638cbb79e21daa077d95de0b3e5b6547849a1048318fe87e7c669304bc437dc5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "Ovation is speaking at NFT NYC 2023!",
        date: "15/3/2023",
    },
    {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/047a0ecb535cfc825512d357a144d50f5ecc4dae601f8bc41556b59b6812a328?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "Is your NFT project a Security? It is if it passes the Howey Test.",
        date: "15/3/2023",
    },
];

const Article: React.FC<ArticleProps> = ({ image, title, date }) => (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow justify-between w-full bg-gray-900 max-md:mt-9">
            <Image src={image} alt={title} className="w-full aspect-[1.41]" />
            <div className="flex flex-col justify-end py-4 pl-3.5">
                <div className="text-xl font-semibold leading-7 text-white">
                    {title}
                </div>
                <div className="mt-3.5 text-lg leading-8 text-zinc-400">
                    {date}
                </div>
            </div>
        </div>
    </div>
);

function Land() {
    return (
        <div className="flex flex-col">
            <header className="flex flex-col items-center pb-20 w-full bg-zinc-950 max-md:max-w-full">
                <nav className="flex justify-center items-center self-stretch px-16 py-7 w-full border-solid border-b-[0.667px] border-b-white border-b-opacity-30 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-5 justify-between max-w-full w-[958px] max-md:flex-wrap">
                        <div className="flex justify-center items-center">
                            <Image
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3220a868e30920dc75b96998451ac32c242568c4b15dd8a333b4b6949b626a1?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                alt="Logo"
                                className="aspect-[3.45] w-[133px]"
                            />
                        </div>
                        <div className="flex gap-5 justify-between my-auto text-base font-medium leading-5 text-gray-200">
                            {/* <ul>
                        <li>
                            <Link to="/">Welcome</Link>
                        </li>
                        <li>
                            <Link to="/landing">LandingPage</Link>
                        </li>
                        <li>
                            <Link to="/home">HomePage</Link>
                        </li>
                        <li>
                            <Link to="/profile">ProfilePage</Link>
                        </li>
                        <li>
                            <Link to="/settings">SettingsPage</Link>
                        </li>
                    </ul> */}
                            <MakeLink>
                                <DomLink to="/">Welcome</DomLink>
                            </MakeLink>
                            <MakeLink>Learn</MakeLink>
                            <MakeLink>News</MakeLink>
                            <MakeLink>Genesis NFT</MakeLink>
                            <MakeLink>
                                <DomLink to="/home">HomePage</DomLink>
                            </MakeLink>
                            <MakeLink>
                                <DomLink to="/profile">ProfilePage</DomLink>
                            </MakeLink>
                            <MakeLink>
                                <DomLink to="/settings">SettingsPage</DomLink>
                            </MakeLink>
                            {/* <Routes>
                                <Route path="/" element={<h1>Welcome</h1>} />
                                <Route path="/home" element={<HomePage />} />
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                                <Route
                                    path="/settings"
                                    element={<SettingsPage />}
                                />
                            </Routes> */}
                        </div>
                    </div>
                </nav>
                <section className="flex overflow-hidden relative flex-col items-center px-20 pt-20 mt-9 w-full font-medium max-w-[1151px] min-h-[529px] max-md:px-5 max-md:max-w-full">
                    <Image
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/42fb96992e8466d03c3d75a994d894561e460bf9ba98fbf66f0c3482ae9840b7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt=""
                        className="object-cover absolute inset-0 size-full"
                    />
                    <div className="flex relative gap-3 justify-between px-4 py-2 mt-10 text-lg leading-7 text-lime-400 border border-solid border-neutral-500 rounded-[30px] max-md:flex-wrap">
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf25f789c3242fd7ef59151c276aa40b6a32d0f19cf4fc2ca5519fca8b000b47?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt=""
                            className="shrink-0 self-start aspect-square w-[25px]"
                        />
                        <div className="max-md:max-w-full">
                            DISCOVER, SHARE, & EARN | PERSONALIZED NFT PORTFOLIO
                        </div>
                    </div>
                    <h1 className="relative self-stretch mx-7 mt-6 text-6xl font-bold text-center text-gray-200 leading-[75px] max-md:mr-2.5 max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
                        THE NFT SOCIAL MEDIA PLATFORM
                    </h1>
                    <p className="relative mt-2.5 text-2xl tracking-tighter leading-9 text-center text-zinc-400 w-[683px] max-md:max-w-full">
                        Ovation is a web3 social platform that brings
                        intelligent profiles, personalized portfolios, and a
                        blockchain-enabled UI to a unified NFT social
                        experience.
                    </p>
                    <div className="relative z-10 justify-center items-start p-6 mt-12 -mb-8 max-w-full text-lg font-semibold leading-3 bg-lime-300 rounded-[50px] text-zinc-950 w-[165px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
                        Lauch app
                    </div>
                </section>
                <div className="flex justify-center items-center px-16 py-20 mt-44 mb-2.5 max-w-full bg-neutral-800 w-[958px] max-md:px-5 max-md:mt-10">
                    <Image
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f167460f13cb890754a3d23514af75db0e53b910c7a961d2959417bb7246c14c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt=""
                        className="mt-14 mb-7 max-w-full aspect-square w-[150px] max-md:mt-10"
                    />
                </div>
            </header>
            <section className="flex justify-center items-center px-16 py-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col items-center my-5 w-full max-w-[1226px] max-md:max-w-full">
                    <SectionTitle>As seen on</SectionTitle>
                    <div className="shrink-0 mt-14 max-w-full h-px w-[970px] max-md:mt-10" />
                    <div className="flex gap-5 justify-between mt-5 max-w-full w-[970px] max-md:flex-wrap">
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1bed2aee3eea41c90f2e2b3b44b7bc5f3f3ca8e9f6907771e90019c7fca1f36?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="As seen on 1"
                            className="shrink-0 max-w-full aspect-[2.33] w-[140px]"
                        />
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/24d3b448d5fdbcc66b372599a12889c7186b73c8ff2b583d06a9b21805f0e978?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="As seen on 2"
                            className="shrink-0 max-w-full aspect-[2.33] w-[139px]"
                        />
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/529ffecfa40e98d1ac9995f1aae90b299056d36f12a1d5bf01990f1f2cc0917c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="As seen on 3"
                            className="shrink-0 max-w-full aspect-[3.13] w-[184px]"
                        />
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0399012f352327588cea3b6af5df16ea985030746e3074d8eeaacc3a7838e20f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="As seen on 4"
                            className="shrink-0 max-w-full aspect-[3.13] w-[184px]"
                        />
                    </div>
                    <div className="shrink-0 mt-5 max-w-full h-px w-[970px]" />
                </div>
            </section>
            <section className="flex justify-center items-center px-16 py-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col mt-16 mb-10 w-full max-w-[1226px] max-md:mt-10 max-md:max-w-full">
                    <SectionTitle>Ovation makes web3 easier.</SectionTitle>
                    <SectionSubtitle>
                        Artists, projects, and enthusiasts can effortlessly and
                        impactfully showcase their NFTs, contributions, and
                        notoriety
                    </SectionSubtitle>
                    <div className="mt-16 max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            {features.map((feature, index) => (
                                <Feature key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                    <div className="p-10 mt-28 bg-lime-300 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow justify-center max-md:mt-10 max-md:max-w-full">
                                    <div className="text-3xl font-bold leading-10 text-zinc-950 max-md:max-w-full">
                                        THE NFT SOCIAL MEDIA PLATFORM
                                    </div>
                                    <div className="mt-2 text-2xl font-medium leading-8 text-neutral-500 max-md:max-w-full">
                                        Ovation is a web3 social platform that
                                        brings intelligent profiles,
                                        personalized portfolios, and a
                                        blockchain-enabled UI to a unified NFT
                                        social experience.
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col justify-center items-end self-stretch px-16 my-auto text-lg font-medium leading-4 text-lime-300 max-md:mt-10">
                                    <div className="flex flex-col justify-center max-w-full bg-red-600 rounded-[50px] w-[197px]">
                                        <div className="justify-center px-6 py-4 rounded-md shadow-2xl bg-zinc-950 max-md:px-5">
                                            See how it works
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center px-16 pt-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col mt-16 w-full max-w-[1226px] max-md:mt-10 max-md:max-w-full">
                    <div className="max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow py-10 rounded-xl border border-solid border-white border-opacity-20 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                    <Image
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/44c99b5248d22929f1efe5324d5e1421d7b69df0c5a0189119c5177d42d2e10f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt="Social media"
                                        className="self-center max-w-full aspect-[1.14] w-[386px]"
                                    />
                                    <div className="mt-16 text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                                        SOCIAL MEDIA
                                    </div>
                                    <div className="mt-3 text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                                        On the timeline, users will be enabled
                                        to have more meaningful interactions due
                                        to real-time data, the ability to create
                                        unique posts, recognize post
                                        contributions, and filtering.
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow px-7 py-16 rounded-xl border border-solid border-white border-opacity-20 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                    <Image
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/72e13063592eeef6bd30f596b3042c1c04ad8b1aec2e6b3ccf1daab57363221c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt="Intelligent profile and personalized portfolio"
                                        className="self-center max-w-full aspect-[1.14] w-[386px]"
                                    />
                                    <div className="mt-16 text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                                        Intelligent Profile & Personalized
                                        Portfolio
                                    </div>
                                    <div className="mt-3 text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                                        Through blockchain interoperability, and
                                        an NFT centric UI/UX, users have one
                                        pane into their NFT portfolio,
                                        notoriety, and social notoriety.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch px-7 py-16 rounded-xl border border-solid border-white border-opacity-20 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                    <Image
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/73f6ad32843d28708e1d644e34b3b7b57d013a68d17b21150edc63738270b0bc?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt="Earn $OVA"
                                        className="self-center max-w-full aspect-[1.14] w-[386px]"
                                    />
                                    <div className="mt-16 text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                                        EARN $OVA
                                    </div>
                                    <div className="mt-3 text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                                        Earn $OVA tokens in a variety of ways:
                                        Sharing NFTs, Earning badges, Drawing
                                        engagement, Interacting on the platform,
                                        Owning a Genesis NFT
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow px-7 py-16 rounded-xl border border-solid border-white border-opacity-20 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                    <Image
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be6b78a500656528edb60d156c70fdaaa8444ab3c83dfb547b86198eca2bce69?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt="Discover collections"
                                        className="self-center max-w-full aspect-[1.14] w-[386px]"
                                    />
                                    <div className="mt-16 text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                                        DISCOVER COLLECTIONS
                                    </div>
                                    <div className="mt-3 text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                                        Discover NFT collections on multiple
                                        blockchains by genre, ranking, trending,
                                        and other metrics.
                                        <br />
                                        Users are recommended collections based
                                        upon their interests and NFT portfolio.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="justify-center items-end px-16 py-16 w-full font-medium tracking-tighter text-lime-300 uppercase bg-zinc-950 leading-[355px] text-[279px] max-md:pl-5 max-md:max-w-full max-md:text-4xl max-md:leading-[57px]">
                JOIN US AS A <span className="text-lime-300">PATNER</span>
            </section>
            <section className="flex justify-center items-center px-16 pb-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <div className="flex-wrap content-start mb-10 w-full max-w-[1226px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="self-stretch text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                                Over 40 launch partners have already joined us
                                on our journey
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                                <div className="text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                                    Are you ready to build your community on
                                    Ovation before anyone else?
                                </div>
                                <div className="flex gap-5 justify-between py-3.5 mt-12 max-md:flex-wrap max-md:mt-10">
                                    {partnerLogos
                                        .slice(0, 5)
                                        .map((logo, index) => (
                                            <PartnerLogo
                                                key={index}
                                                {...logo}
                                            />
                                        ))}
                                </div>
                                <div className="flex gap-5 justify-between py-3.5 mt-2 max-md:flex-wrap">
                                    {partnerLogos
                                        .slice(5, 10)
                                        .map((logo, index) => (
                                            <PartnerLogo
                                                key={index}
                                                {...logo}
                                            />
                                        ))}
                                </div>
                                <div className="flex gap-5 justify-between py-3.5 mt-2 max-md:flex-wrap">
                                    {partnerLogos
                                        .slice(10)
                                        .map((logo, index) => (
                                            <PartnerLogo
                                                key={index}
                                                {...logo}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col p-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <SectionTitle className="mt-16 max-md:mt-10">
                    MORE FROM OVATION
                </SectionTitle>
                <div className="mt-12 mb-10 w-full max-w-[1254px] max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {articles.map((article, index) => (
                            <Article key={index} {...article} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center p-20 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 mx-3 mt-10 max-md:flex-wrap max-md:mr-2.5">
                    <div className="flex flex-col flex-1 my-auto max-md:max-w-full">
                        <div className="text-2xl font-semibold leading-9 text-white uppercase max-md:max-w-full">
                            SUBSCRIBE
                        </div>
                        <div className="mt-1 text-lg leading-8 text-zinc-400 max-md:max-w-full">
                            Learn about the Ovation alpha launch and other
                            important updates.
                        </div>
                    </div>
                    <form className="flex flex-col flex-1 justify-center p-1.5 max-md:max-w-full">
                        <div className="flex gap-5 justify-between px-5 py-3.5 rounded-2xl border border-solid bg-white bg-opacity-10 border-white border-opacity-20 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
                            <label htmlFor="email" className="sr-only">
                                Your email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                aria-label="Your email address"
                                className="my-auto text-lg leading-8 text-zinc-400 bg-transparent border-none outline-none"
                            />
                            <button
                                type="submit"
                                className="justify-center px-4 py-3.5 text-xs font-medium leading-4 whitespace-nowrap bg-lime-300 rounded-[50px] text-zinc-950"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
                <div className="pt-20 mx-3 mt-20 mb-4 border-t border-solid border-white border-opacity-50 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow text-sm leading-6 text-gray-300 max-md:mt-10">
                                <Image
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/301b5acff51944d0ed253379bdfd5495ee14fcbcaa46372d4f220e47fb0e2507?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                    alt="Ovation logo"
                                    className="max-w-full aspect-[3.57] w-[225px]"
                                />
                                <div className="mt-10">
                                    © 2024 Ovation Technologies.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                            <div className="max-md:mt-10 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col whitespace-nowrap max-md:mt-8">
                                            <div className="text-xl font-medium leading-8 text-white">
                                                Contact
                                            </div>
                                            <div className="mt-6 text-base leading-7 text-gray-300">
                                                hello@ovation.network
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow text-base leading-7 text-gray-300 max-md:mt-8">
                                            <div className="text-xl font-medium leading-8 text-white">
                                                Support
                                            </div>
                                            <div className="mt-6">
                                                Terms of service
                                            </div>
                                            <div className="mt-3">
                                                Privacy policy
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col max-md:mt-8">
                                            <div className="text-xl font-medium leading-8 text-white">
                                                Socials
                                            </div>
                                            <div className="flex gap-4 pr-16 mt-6 max-md:pr-5">
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bff44faab5e7c89e3e2b0396379b3df8c646dbb47cfc345de5f1dea7ae436fb?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt="Twitter"
                                                    className="shrink-0 w-8 aspect-square"
                                                />
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5973b31c3b96798d9a506410168492e2eb2a2127e9001b1bc6ec028470c2d677?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt="Discord"
                                                    className="shrink-0 w-8 aspect-square"
                                                />
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2314104ec4366babc2dace894fe9b00b12d4403a632c8b87d7bb5e960dec759e?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt="Instagram"
                                                    className="shrink-0 w-8 aspect-square"
                                                />
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/76ff133e170f449f54bc6a6dbffb4ff741a977913ce5fb59f714bdae872564f2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt="LinkedIn"
                                                    className="shrink-0 w-8 aspect-square"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Land;
