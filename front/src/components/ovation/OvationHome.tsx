import { useViewportContext } from "@/lib/hooks/useViewportContext";
import Link from "next/link";
import OvationLogo from "./OvationLogo";

const OvationHome = () => {
    const { width, height, fontSize, deviceInfo } = useViewportContext();
    const GetWidth = (width: number, dynamicScreenSize: number) => {
        const strWidth = Math.round(width * dynamicScreenSize).toString();
        return { strWidth };
    };

    const { strWidth } = GetWidth(width, 30.0);

    return (
        <div className="max-size-full base-box">
            <div className="base-box object-scale-down">
                <Link
                    href="/"
                    passHref
                    className="base-box cursor-pointer gap-[0.35rem] 2xl:gap-[0.35rem] "
                >
                    <OvationLogo
                        id="ovation_logo"
                        className="size-[2.2rem] sm:size-[2.25rem] md:size-[2.3rem] lg:size-[2.35rem] xl:size-[2.4rem] 2xl:size-[2.5rem]"
                    />
                    <h1
                        className="text-center place-self-center antialiased font-stretch 2xl:font-stretch font-expanded 2xl:font-expanded font-medium 
                    lg:font-medium 2xl:font-medium tracking-wider 2xl:tracking-wider text-[1.8rem] sm:text-[1.85rem] md:text-[1.9rem] lg:text-[1.95rem] xl:text-[2rem] 2xl:text-[2.05rem]"
                    >
                        Ovation
                    </h1>
                </Link>
            </div>
        </div>
    );
};

export default OvationHome;
