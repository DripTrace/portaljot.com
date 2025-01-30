import * as React from "react";

type CardProps = {
    imgSrc: string;
    altText: string;
};

type UserProfileProps = {
    username: string;
    handle: string;
    userImgSrc: string;
    altText: string;
};

const Card: React.FC<CardProps> = ({ imgSrc, altText }) => (
    <div className="flex flex-col grow justify-center w-full bg-white rounded-3xl max-md:mt-10 max-md:max-w-full">
        <img
            loading="lazy"
            src={imgSrc}
            alt={altText}
            className="w-full aspect-[1.75]"
        />
    </div>
);

const UserProfile: React.FC<UserProfileProps> = ({
    username,
    handle,
    userImgSrc,
    altText,
}) => (
    <div className="flex gap-3 justify-between py-1 pr-5 w-full whitespace-nowrap max-md:pr-5">
        <div className="flex gap-2.5">
            <img
                loading="lazy"
                src={userImgSrc}
                alt={altText}
                className="shrink-0 aspect-square w-[60px]"
            />
            <div className="flex flex-col my-auto">
                <div className="text-2xl font-semibold text-white">
                    {username}
                </div>
                <div className="flex gap-1 justify-between pr-2.5 mt-1 text-xs tracking-normal text-zinc-400">
                    <div>@{handle}</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8fd13a8e3f9f1acc0364bdd7b49d933ff3af71f84cf2a16864a640bf72d37d44?apiKey=305a6c025418439087e8bfc27b932f06&"
                        alt="Icon"
                        className="shrink-0 my-auto aspect-square w-[11px]"
                    />
                </div>
            </div>
        </div>
        <button className="justify-center px-2 py-1.5 my-auto text-xs font-medium leading-loose bg-lime-300 rounded text-zinc-950">
            FOLLOW
        </button>
    </div>
);

const Badge: React.FC<{ text: string }> = ({ text }) => (
    <div className="justify-center px-2.5 py-1 border border-solid bg-neutral-100 border-black border-opacity-10 rounded-[44.113px]">
        {text}
    </div>
);

const MyComponent: React.FC = () => {
    return (
        <section className="flex flex-col px-7 pt-7 rounded-2xl border-2 border-solid border-white border-opacity-10 max-w-[924px] max-md:px-5">
            <header className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <span className="my-auto text-base font-medium text-white uppercase">
                    Featured
                </span>
                <button className="justify-center px-4 py-3 text-xs font-semibold border border-solid bg-neutral-100 border-neutral-200 rounded-[400.862px] text-zinc-950">
                    View all
                </button>
            </header>
            <main className="mt-10 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <Card
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ece5db594b536a910c5b51a8d027aabef33c102e40f7190f29c76063493b45cb?apiKey=305a6c025418439087e8bfc27b932f06&"
                        altText="Featured Image"
                    />
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <UserProfile
                            username="username.eth"
                            handle="username"
                            userImgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/31d0a05d0115fb1a46097ae5a38a58d41fddad7b73ef6ce8c23dcf949f52b37f?apiKey=305a6c025418439087e8bfc27b932f06&"
                            altText="User Image"
                        />
                        <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                        <p className="mt-4 text-sm tracking-normal text-zinc-400">
                            Passionate NFT holder exploring the future of
                            digital ownership. Join me in discovering the
                            limitless possibilities of the NFT ecosystem.
                            #NFTCommunity
                        </p>
                        <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                        <div className="flex gap-2 justify-between pr-5 mt-4 text-xs text-black max-md:pr-5">
                            <Badge text="NFT count: 11" />
                            <Badge text="OVA TOKEN: 10" />
                            <Badge text="Arch Tokens: 11" />
                            <Badge text="Badges: 3" />
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default MyComponent;
