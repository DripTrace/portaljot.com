import * as React from "react";

interface ConnectWalletProps {
    walletAddress: string;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ walletAddress }) => {
    return (
        <div className="flex flex-col justify-center px-6 py-2.5 mt-11 w-full text-white whitespace-nowrap border border-solid border-neutral-700 leading-[143%] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="my-auto">{walletAddress}</div>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34e41c277f8bf05f55add24549a4bc8067bcc307f2e410c73649bd23a41a7ffb?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt="Wallet icon"
                    className="shrink-0 aspect-square w-[38px]"
                />
            </div>
        </div>
    );
};

interface ProgressStepProps {
    steps: string[];
}

const ProgressStep: React.FC<ProgressStepProps> = ({ steps }) => {
    return (
        <div className="flex gap-2 pr-5 mt-1 leading-[143%] text-neutral-200 max-md:flex-wrap">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div>{step}</div>
                    {index < steps.length - 1 && (
                        <img
                            src={`http://b.io/ext_${index + 1}-`}
                            alt=""
                            className="shrink-0 my-auto border-2 border-lime-300 border-solid aspect-[0.5] stroke-[1.5px] stroke-lime-300 w-[3px]"
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const Create: React.FC = () => {
    const walletAddress = "OXrvsh.srvydubhjnikm";
    const steps = ["Personal info", "Choose path", "Connect wallet"];

    return (
        <div className="flex flex-col text-sm font-semibold max-w-[500px]">
            <h1 className="w-full text-3xl tracking-normal leading-7 text-white max-md:max-w-full">
                Create Account
            </h1>
            <ProgressStep steps={steps} />
            <ConnectWallet walletAddress={walletAddress} />
            <button className="justify-center items-center px-16 py-5 mt-11 w-full text-xs text-center bg-lime-300 rounded text-zinc-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                Make my profile
            </button>
            <div className="flex justify-center items-center p-0.5 mt-7 w-full text-xs leading-5 text-center max-md:px-5 max-md:max-w-full">
                <div className="flex gap-2">
                    <div className="text-stone-300">Not you?</div>
                    <button className="text-lime-300">Change wallet</button>
                </div>
            </div>
        </div>
    );
};

export default Create;
