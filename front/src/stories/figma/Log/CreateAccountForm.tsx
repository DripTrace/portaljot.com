import * as React from "react";

interface InputFieldProps {
    label: string;
    value: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value }) => {
    return (
        <>
            <div className="mt-6 w-full text-sm text-white max-md:max-w-full">
                {label}
            </div>
            <div className="justify-center items-start px-3.5 py-5 mt-2 w-full whitespace-nowrap rounded-md border border-solid border-neutral-700 leading-[133%] text-zinc-500 max-md:pr-5 max-md:max-w-full">
                {value}
            </div>
        </>
    );
};

const CreateAccountForm: React.FC = () => {
    const inputFields = [
        { label: "Display name", value: "Username101" },
        { label: "Username", value: "Username101" },
        { label: "Email", value: "Username101" },
    ];

    return (
        <form className="flex flex-col text-xs leading-4 max-w-[500px]">
            <h1 className="w-full text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full">
                Create Account
            </h1>
            <div className="flex gap-2 pr-5 mt-1 text-sm text-zinc-500 max-md:flex-wrap">
                <div className="text-neutral-200">Personal info</div>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd9ceb2f076caa0975f89fa8d173cec31dbde2de61ae91a17d03764392838f3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    className="shrink-0 my-auto w-1 border-2 border-lime-300 border-solid aspect-[0.67] stroke-[1.5px] stroke-lime-300"
                />
                <div>Choose path</div>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b637f0a2dbba2acc61b39bf4f9705c3a4559dae9d5ebde318249e314f12beea7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    className="shrink-0 my-auto border-2 border-lime-300 border-solid aspect-[0.5] stroke-[1.5px] stroke-lime-300 w-[3px]"
                />
                <div>Connect wallet</div>
            </div>
            {inputFields.map((field) => (
                <InputField
                    key={field.label}
                    label={field.label}
                    value={field.value}
                />
            ))}
            <div className="mt-6 w-full text-sm text-white max-md:max-w-full">
                Password
            </div>
            <div className="flex gap-5 p-4 mt-2 w-full rounded-md border border-solid border-neutral-700 leading-[133%] text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto">
                    <label htmlFor="password" className="sr-only">
                        Enter your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        aria-label="Enter your password"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca9bfed244242b025cedfcb4332b0636fcd04f5fe1d8ebe165191b10abcdc8c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt="Password visibility toggle"
                    className="shrink-0 aspect-[1.35] w-[23px]"
                />
            </div>
            <div className="mt-6 w-full text-sm text-white max-md:max-w-full">
                Confirm password
            </div>
            <div className="justify-center items-start px-3.5 py-5 mt-2 w-full whitespace-nowrap rounded-md border border-solid border-neutral-700 leading-[133%] text-zinc-500 max-md:pr-5 max-md:max-w-full">
                <label htmlFor="confirmPassword" className="sr-only">
                    Confirm your password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    aria-label="Confirm your password"
                    className="w-full bg-transparent outline-none"
                />
            </div>
            <button
                type="submit"
                className="justify-center items-center px-16 py-5 mt-7 w-full font-semibold text-center whitespace-nowrap bg-lime-300 rounded text-zinc-950 max-md:px-5 max-md:max-w-full"
            >
                Login
            </button>
            <div className="flex justify-center items-center p-0.5 mt-8 w-full text-center leading-[150%] max-md:px-5 max-md:max-w-full">
                <div className="flex gap-2">
                    <div className="text-stone-300">
                        Already have an account?
                    </div>
                    <a href="#" className="text-lime-300">
                        Login
                    </a>
                </div>
            </div>
        </form>
    );
};

export default CreateAccountForm;
