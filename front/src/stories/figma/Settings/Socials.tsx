import * as React from "react";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
    <img loading="lazy" src={src} alt={alt} className={className} />
);

interface IconProps {
    src: string;
    alt: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, className }) => (
    <Image src={src} alt={alt} className={`shrink-0 ${className}`} />
);

interface NavItemProps {
    icon: string;
    label: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
    <div
        className={`flex gap-3.5 justify-center items-center px-8 py-4 text-lg whitespace-nowrap ${
            active
                ? "bg-white text-neutral-900 rounded-[50px] font-medium"
                : "text-zinc-400"
        } max-md:px-5`}
    >
        <Icon
            src={icon}
            alt={label}
            className="my-auto aspect-square w-[22px]"
        />
        <div>{label}</div>
    </div>
);

const navItems: NavItemProps[] = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab80f229e02dd41626bc686e65e97c52b968164a0fda02d23e8b446ea800d248?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        label: "Home",
        active: true,
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/27b449cb22e92ce8b9bf3aca64d25f57f9e4df9db510308fadf712eeb230e611?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        label: "Discover",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f6e012ff4c19e9a6b1780ebc8232cf5a294d1c97c7f1e99fcc73d57bb498a016?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        label: "Profile",
    },
];

const Sidebar: React.FC = () => (
    <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
            <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e71c71b85be92f4815537f7a92e966462c3e46776722562540fac5a2b2de2d3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                alt="Logo"
                className="self-center max-w-full aspect-[5.26] w-[214px]"
            />
            <nav className="mt-14 max-md:mt-10">
                {navItems.map((item) => (
                    <NavItem key={item.label} {...item} />
                ))}
            </nav>
            <div className="flex gap-2.5 justify-between mt-[962px] max-md:mt-10">
                <Image
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e31f138f733b711f9f9dfb9db0f2634e696eb4e3105442f0c5eb1097601fb81f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt="User avatar"
                    className="shrink-0 aspect-square w-[60px]"
                />
                <div className="flex flex-col justify-center my-auto">
                    <div className="text-lg font-semibold leading-5 text-white">
                        0xru.....579
                    </div>
                    <div className="flex gap-1 pr-3.5 mt-2.5 text-sm font-medium leading-5 text-stone-300">
                        <div>2,000 &OVA</div>
                        <Icon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/71238a3033bd8823eae9de093e2713208b504b22ef463ac58e712f8961f1aa8a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="OVA icon"
                            className="my-auto w-3.5 aspect-square"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Header: React.FC = () => (
    <header className="flex gap-5 justify-end items-start p-7 w-full border-b border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
            <Icon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/70940f8050d63fb4ae25a44112781b64d2cb4ecbf37b7db281992d07cac10c27?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                alt="Greeting icon"
                className="aspect-[0.97] w-[39px]"
            />
            <div className="flex-auto my-auto">Good morning, John</div>
        </div>
        <div className="flex gap-2.5 justify-between">
            <div className="flex flex-col">
                <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
                    0xrxc.....d67579
                </div>
                <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
                    <Icon
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e576a96f6fcf0dfabc2e71fa55779396b18e3baf6e60e17ea1600e206b8023b7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt="OVA icon"
                        className="my-auto aspect-[1.1] w-[11px]"
                    />
                    <div>2,000 &OVA</div>
                </div>
            </div>
            <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c99a17a5921d53cfb9bcc64623766954633566b53e9825caf087bafe66dd94f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                alt="User avatar"
                className="shrink-0 self-start aspect-square w-[37px]"
            />
        </div>
    </header>
);

interface SettingsNavItemProps {
    icon?: string;
    label: string;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ icon, label }) => (
    <div
        className={`${
            icon ? "flex gap-3.5" : "self-start ml-8 max-md:ml-2.5"
        } px-5 py-4 text-base font-medium text-white ${
            icon
                ? "rounded-xl border border-solid border-white border-opacity-30"
                : ""
        } max-md:flex-wrap max-md:px-5 max-md:mr-2.5`}
    >
        {icon && (
            <Icon
                src={icon}
                alt={label}
                className="shrink-0 aspect-[0.96] w-[23px]"
            />
        )}
        <div className={icon ? "flex-auto my-auto" : ""}>{label}</div>
    </div>
);

const settingsNavItems: SettingsNavItemProps[] = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9431ff587f76c1b3a7b5ab14fd60fdbf1da98277d83a94a52ad789b9d4e126f3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        label: "Search settings",
    },
    {
        label: "Personal info",
    },
    {
        label: "Socials",
    },
    {
        label: "Experience",
    },
    {
        label: "Wallets",
    },
    {
        label: "Password",
    },
];

const SettingsSidebar: React.FC = () => (
    <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow pt-8 pb-20 border-r border-l border-solid border-white border-opacity-10 max-md:max-w-full">
            <h2 className="mx-8 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
                Settings
            </h2>
            <nav className="mt-5">
                {settingsNavItems.map((item, index) => (
                    <React.Fragment key={item.label}>
                        <SettingsNavItem {...item} />
                        {index === 0 && (
                            <div className="self-start mt-14 ml-8 text-lg font-medium text-white capitalize max-md:mt-10 max-md:ml-2.5">
                                Personal info
                            </div>
                        )}
                        {index === 0 && (
                            <div className="self-start mt-2 ml-8 text-sm leading-5 text-zinc-400 max-md:ml-2.5">
                                Update your information and details here
                            </div>
                        )}
                        {index === 1 && (
                            <div className="flex flex-col items-start px-8 py-5 mt-10 bg-zinc-900 max-md:px-5 max-md:max-w-full">
                                <div className="text-lg font-medium text-white capitalize">
                                    Socials
                                </div>
                                <div className="mt-2 text-sm leading-5 text-zinc-400">
                                    Set your social profile to build trust and
                                    security
                                </div>
                            </div>
                        )}
                        {index === 2 && (
                            <>
                                <div className="self-stretch mt-2 text-sm leading-5 text-zinc-400">
                                    Set your work profile to build trust and
                                    security
                                </div>
                                <div className="mt-14 capitalize max-md:mt-10">
                                    Wallets
                                </div>
                            </>
                        )}
                        {index === 3 && (
                            <div className="mt-2 text-sm leading-5 text-zinc-400">
                                Update your wallet info and details here
                            </div>
                        )}
                        {index === 4 && (
                            <>
                                <div className="mt-14 capitalize max-md:mt-10">
                                    Password
                                </div>
                                <div className="mt-2 text-sm leading-5 text-zinc-400">
                                    Make your account secure
                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </div>
    </div>
);

const SocialsForm: React.FC = () => (
    <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow px-5 mt-8 max-md:max-w-full">
            <h2 className="mr-16 ml-16 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
                Socials
            </h2>
            <p className="mt-2 mr-16 ml-16 text-xl tracking-normal leading-8 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                Set your social profile to build trust and secuirty
            </p>
            <form>
                <label
                    htmlFor="linkedin"
                    className="mt-14 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full"
                >
                    Linkedin
                </label>
                <div className="flex flex-col justify-center items-start self-center px-5 py-3.5 mt-2 max-w-full text-lg tracking-normal leading-7 rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                    <div className="flex gap-2 justify-center">
                        <Icon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/779436399b427f05aa7865a823bba593e06b22a90f61106c2b32e411c1cf9bb0?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="LinkedIn icon"
                            className="aspect-square w-[30px]"
                        />
                        <span className="justify-center self-start pr-2 text-white whitespace-nowrap border-r border-white border-solid">
                            https://
                        </span>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            placeholder="input LinkedIn link"
                            className="text-zinc-500 bg-transparent outline-none"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="flex gap-2 justify-center self-start mt-5 ml-16 text-sm leading-5 text-center text-stone-300 max-md:ml-2.5"
                >
                    <span>View more</span>
                    <Icon
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/299ecf8287ed1fb31d197bbced8a4ca3bb9f0e1eea1b9d8bf88511d110f44154?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt="Expand icon"
                        className="self-start aspect-square w-[18px]"
                    />
                </button>
            </form>
            <div className="flex flex-col justify-center px-16 py-9 text-base font-semibold text-center border-t border-solid bg-zinc-900 border-neutral-700 mt-[926px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-4 pl-20 mr-5 ml-6 max-md:flex-wrap max-md:pl-5 max-md:mr-2.5">
                    <button
                        type="button"
                        className="justify-center p-6 text-white whitespace-nowrap border border-solid border-neutral-700 max-md:px-5"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="justify-center p-6 bg-lime-300 rounded-md text-zinc-950 max-md:px-5"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Socials: React.FC = () => (
    <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <Sidebar />
            <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:max-w-full">
                    <Header />
                    <div className="max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <SettingsSidebar />
                            <SocialsForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Socials;
