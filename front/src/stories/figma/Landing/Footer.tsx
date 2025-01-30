import * as React from "react";

interface SocialIconProps {
    src: string;
    alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 w-8 aspect-square"
    />
);

const socialIcons = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5088ff4a1da0799f99d4c86462922103cf14454af462608fd2529db9767f9cf3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Twitter",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/603745465baf6f8c3fbb5e779bb304740d9727ad6b33d34d138656755ae4ea70?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Facebook",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/406f77ee7a9e3a737822dadcca7ffb2bac655a05316c7ed6ad0614d8ceb604d8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "Instagram",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/009f1c8cd5368a30d64d5c70cb261beeb1fd72c55e119d4bff6e90ec9e9e65fd?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        alt: "LinkedIn",
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col p-20 bg-gray-950 max-md:px-5">
            <section className="flex gap-5 mx-3 mt-10 max-md:flex-wrap max-md:mr-2.5">
                <div className="flex flex-col flex-1 my-auto max-md:max-w-full">
                    <h2 className="text-2xl font-semibold leading-9 text-white uppercase max-md:max-w-full">
                        SUBSCRIBE
                    </h2>
                    <p className="mt-1 text-lg leading-8 text-zinc-400 max-md:max-w-full">
                        Learn about the Ovation alpha launch and other important
                        updates.
                    </p>
                </div>
                <div className="flex flex-col flex-1 justify-center p-1.5 max-md:max-w-full">
                    <form className="flex gap-5 justify-between px-5 py-3.5 rounded-2xl border border-solid bg-white bg-opacity-10 border-white border-opacity-20 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
                        <label htmlFor="email" className="sr-only">
                            Your email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email address"
                            aria-label="Your email address"
                            className="my-auto text-lg leading-8 text-zinc-400 bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="justify-center px-4 py-3.5 text-xs font-medium leading-4 whitespace-nowrap bg-lime-300 rounded-[50px] text-zinc-950"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
            <div className="pt-20 mx-3 mt-20 border-t border-solid border-white border-opacity-50 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-sm leading-6 text-gray-300 max-md:mt-10">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9bc110c94800f348c5e2e99b5853239cd77b366c476aa651c5a8bbbbe7013f8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                alt="Ovation Technologies Logo"
                                className="max-w-full aspect-[3.57] w-[225px]"
                            />
                            <p className="mt-10">
                                © 2024 Ovation Technologies.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                        <div className="max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col whitespace-nowrap max-md:mt-8">
                                        <h3 className="text-xl font-medium leading-8 text-white">
                                            Contact
                                        </h3>
                                        <p className="mt-6 text-base leading-7 text-gray-300">
                                            hello@ovation.network
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col grow text-base leading-7 text-gray-300 max-md:mt-8">
                                        <h3 className="text-xl font-medium leading-8 text-white">
                                            Support
                                        </h3>
                                        <p className="mt-6">Terms of service</p>
                                        <p className="mt-3">Privacy policy</p>
                                    </div>
                                </div>
                                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col max-md:mt-8">
                                        <h3 className="text-xl font-medium leading-8 text-white">
                                            Socials
                                        </h3>
                                        <div className="flex gap-4 pr-16 mt-6 max-md:pr-5">
                                            {socialIcons.map((icon, index) => (
                                                <SocialIcon
                                                    key={index}
                                                    src={icon.src}
                                                    alt={icon.alt}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
