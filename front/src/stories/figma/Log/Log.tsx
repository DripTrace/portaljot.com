import * as React from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
    return (
        <button
            className={`justify-center items-center px-16 py-4 w-full text-center leading-[143%] rounded-[50px] max-md:px-5 max-md:max-w-full ${className}`}
        >
            {children}
        </button>
    );
};

interface InputProps {
    label: string;
    placeholder: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, className }) => {
    return (
        <>
            <div className="w-full text-white leading-[143%] max-md:max-w-full">
                {label}
            </div>
            <div
                className={`justify-center items-start px-3.5 py-5 mt-2 w-full text-xs leading-4 whitespace-nowrap rounded-md border border-solid border-neutral-700 text-zinc-500 max-md:pr-5 max-md:max-w-full ${className}`}
            >
                {placeholder}
            </div>
        </>
    );
};

const LoginForm: React.FC = () => {
    return (
        <form className="flex flex-col text-sm max-w-[500px]">
            <header>
                <h1 className="w-full text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full">
                    Login
                </h1>
                <p className="mt-1 w-full leading-[143%] text-zinc-400 max-md:max-w-full">
                    Hi, Welcome back ✋
                </p>
            </header>
            <Button className="mt-11 bg-white border border-gray-200 border-solid text-slate-800 max-md:mt-10">
                Connect your wallet
            </Button>
            <div className="flex gap-1.5 items-center px-5 py-1 mt-4 text-xs font-medium tracking-wider leading-3 text-center uppercase text-stone-300 max-md:flex-wrap">
                <div className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-stone-300 border-stone-300" />
                <div className="self-stretch">OR login with username</div>
                <div className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-stone-300 border-stone-300" />
            </div>
            <Input
                label="Username"
                placeholder="Username101"
                className="mt-11 max-md:mt-10"
            />
            <div className="mt-6 w-full text-white leading-[143%] max-md:max-w-full">
                Password
            </div>
            <div className="flex gap-5 p-4 mt-2 w-full text-xs leading-4 rounded-md border border-solid border-neutral-700 text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto">
                    <label htmlFor="password" className="sr-only">
                        Enter your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea18f9fa519b2de2f12200833941e4bc08cd27dc514301241953477f1c5448bd?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    className="shrink-0 aspect-[1.35] w-[23px]"
                />
            </div>
            <div className="flex gap-5 justify-between pr-5 mt-2 w-full text-xs max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-1.5 self-start text-white leading-[136%]">
                    <input
                        type="checkbox"
                        id="remember"
                        className="shrink-0 rounded-sm border border-solid border-zinc-400 h-[15px] w-[15px]"
                    />
                    <label htmlFor="remember" className="my-auto">
                        Remember me
                    </label>
                </div>
                <a href="#" className="text-right text-lime-300">
                    Forgot Password?
                </a>
            </div>
            <Button className="mt-7 bg-lime-300 text-zinc-950 max-md:px-5 font-semibold text-xs py-5">
                Login
            </Button>
            <div className="flex justify-center items-center p-0.5 mt-8 w-full text-xs leading-5 text-center max-md:px-5 max-md:max-w-full">
                <p className="flex gap-2">
                    <span className="text-stone-300">Not registered yet?</span>
                    <a href="#" className="text-lime-300">
                        Create Account
                    </a>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
