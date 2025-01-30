import * as React from "react";

type BalanceProps = {
    balance: string;
    unit: string;
    imgSrc: string;
    imgAlt: string;
};

type UserProps = {
    username: string;
    avatarSrc: string;
    avatarAlt: string;
    balanceProps: BalanceProps;
};

const Balance: React.FC<BalanceProps> = ({ balance, unit, imgSrc, imgAlt }) => {
    return (
        <div className="flex gap-1 pr-1.5 mt-2 text-sm font-medium leading-5 text-zinc-400">
            <div>
                {balance} {unit}
            </div>
            <img
                loading="lazy"
                src={imgSrc}
                alt={imgAlt}
                className="shrink-0 my-auto w-3.5 aspect-square"
            />
        </div>
    );
};

const UserCard: React.FC<UserProps> = ({
    username,
    avatarSrc,
    avatarAlt,
    balanceProps,
}) => {
    return (
        <section className="flex gap-2.5 justify-between">
            <img
                loading="lazy"
                src={avatarSrc}
                alt={avatarAlt}
                className="shrink-0 aspect-square w-[60px]"
            />
            <div className="flex flex-col justify-center px-5 my-auto">
                <div className="text-lg font-semibold leading-5 text-white">
                    {username}
                </div>
                <Balance {...balanceProps} />
            </div>
        </section>
    );
};

function WalletInfo() {
    const userProps: UserProps = {
        username: "0xrxc.....d67579",
        avatarSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/e31f138f733b711f9f9dfb9db0f2634e696eb4e3105442f0c5eb1097601fb81f?apiKey=305a6c025418439087e8bfc27b932f06&",
        avatarAlt: "User Avatar",
        balanceProps: {
            balance: "2,000",
            unit: "&OVA",
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cfcbef6b9d01adb676452225b1d17b1dc59945296d2d04b615a074fc04a9fc8f?apiKey=305a6c025418439087e8bfc27b932f06&",
            imgAlt: "Balance Icon",
        },
    };

    return <UserCard {...userProps} />;
}

export default WalletInfo;
