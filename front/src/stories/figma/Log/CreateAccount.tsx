import * as React from "react";

interface NavLinkProps {
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ children }) => {
    return (
        <div className="text-base font-medium leading-5 text-gray-200">
            {children}
        </div>
    );
};

const NavBar: React.FC = () => {
    return (
        <header className="flex justify-center items-center self-stretch px-16 py-7 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-w-full w-[958px] max-md:flex-wrap">
                <div className="flex justify-center items-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/18afa439a05afb7d1ce4906cfd88f61fe7a8b47de1dbb7a094d4088776f2ddd8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt="Logo"
                        className="aspect-[3.45] w-[133px]"
                    />
                </div>
                <nav className="flex gap-5 justify-between my-auto">
                    <NavLink>Home</NavLink>
                    <NavLink>Learn</NavLink>
                    <NavLink>News</NavLink>
                    <NavLink>Genesis NFT</NavLink>
                </nav>
            </div>
        </header>
    );
};

interface ProgressStepProps {
    step: string;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ step }) => {
    return (
        <>
            <div
                className={`${step === "Personal info" ? "text-neutral-200" : "text-zinc-500"}`}
            >
                {step}
            </div>
            <img
                loading="lazy"
                src={
                    step === "Connect wallet"
                        ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b637f0a2dbba2acc61b39bf4f9705c3a4559dae9d5ebde318249e314f12beea7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        : "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd9ceb2f076caa0975f89fa8d173cec31dbde2de61ae91a17d03764392838f3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                }
                alt=""
                className={`shrink-0 my-auto ${
                    step === "Connect wallet"
                        ? "aspect-[0.5] w-[3px]"
                        : "aspect-[0.67] w-1"
                } border-2 border-lime-300 border-solid stroke-[1.5px] stroke-lime-300`}
            />
        </>
    );
};

const InputField: React.FC<{ label: string }> = ({ label }) => {
    return (
        <>
            <div className="mt-6 text-sm leading-5 text-white max-md:max-w-full">
                {label}
            </div>
            <div className="justify-center items-start px-3.5 py-5 mt-2 max-w-full text-xs leading-4 whitespace-nowrap rounded-md border border-solid border-neutral-700 text-zinc-500 w-[500px] max-md:pr-5">
                Username101
            </div>
        </>
    );
};

const CreateAccount: React.FC = () => {
    return (
        <main className="flex flex-col items-center pb-20 bg-zinc-950">
            <NavBar />
            <h1 className="mt-48 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mt-10 max-md:max-w-full">
                Create Account
            </h1>
            <div className="flex gap-2 pr-5 mt-1 max-w-full text-sm leading-5 text-zinc-500 w-[500px] max-md:flex-wrap">
                <ProgressStep step="Personal info" />
                <ProgressStep step="Choose path" />
                <ProgressStep step="Connect wallet" />
            </div>
            <InputField label="Display name" />
            <InputField label="Username" />
            <InputField label="Email" />
            <div className="mt-6 text-sm leading-5 text-white max-md:max-w-full">
                Password
            </div>
            <div className="flex gap-5 p-4 mt-2 max-w-full text-xs leading-4 rounded-md border border-solid border-neutral-700 text-zinc-500 w-[500px] max-md:flex-wrap">
                <div className="flex-auto">Enter your password</div>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca9bfed244242b025cedfcb4332b0636fcd04f5fe1d8ebe165191b10abcdc8c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt="Password visibility toggle"
                    className="shrink-0 aspect-[1.35] w-[23px]"
                />
            </div>
            <InputField label="Confirm password" />
            <button className="justify-center items-center px-16 py-5 mt-7 max-w-full text-xs font-semibold text-center whitespace-nowrap bg-lime-300 rounded text-zinc-950 w-[500px] max-md:px-5">
                Login
            </button>
            <div className="flex justify-center items-center p-0.5 mt-8 max-w-full text-xs leading-5 text-center w-[500px] max-md:px-5">
                <div className="flex gap-2">
                    <div className="text-stone-300">
                        Already have an account?
                    </div>
                    <div className="text-lime-300">Login</div>
                </div>
            </div>
        </main>
    );
};

export default CreateAccount;
