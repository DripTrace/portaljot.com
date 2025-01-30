import * as React from "react";

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
    return (
        <button
            onClick={onClick}
            className={`justify-center items-center px-16 py-3 rounded-sm max-md:px-5 ${className}`}
        >
            {children}
        </button>
    );
};

const Changes: React.FC = () => {
    return (
        <section className="flex justify-center items-center px-16 py-20 text-center bg-black bg-opacity-80 max-md:px-5">
            <div className="flex flex-col py-11 mt-96 max-w-full bg-neutral-800 rounded-[30px] w-[461px] max-md:mt-10">
                <div className="flex flex-col justify-center px-9 bg-neutral-800 max-md:px-5 max-md:max-w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d40ab4df35817aec940d8b6414419c75e3b7bd71790cd60085e1d8388c9d56d2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                        alt="Decorative icon"
                        className="self-center aspect-square w-[66px]"
                    />
                    <h2 className="mt-7 text-xl font-semibold leading-5 text-white">
                        Unsaved changes
                    </h2>
                    <p className="mt-3 text-sm leading-5 text-zinc-400">
                        If you choose to cancel without saving, your changes
                        will not be retained. Make sure to save any changes{" "}
                        <br /> before exiting the window
                    </p>
                </div>
                <div className="flex flex-col px-9 mt-11 text-xs font-medium leading-4 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <Button
                        onClick={() => console.log("Yes clicked")}
                        className="bg-lime-300 text-zinc-950"
                    >
                        Yes, don't save my changes
                    </Button>
                    <Button
                        onClick={() => console.log("No clicked")}
                        className="mt-2 text-white border-solid border-neutral-700"
                    >
                        No, I want to save my changes
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Changes;
