"use client";

import { useState } from "react";
import { FaChild, FaTshirt } from "react-icons/fa";
import { GiArmoredPants } from "react-icons/gi";
import { IoIosMan, IoIosPhonePortrait, IoIosWoman } from "react-icons/io";
import { MdFilterFrames, MdKeyboardArrowRight } from "react-icons/md";
import { SiRedhat } from "react-icons/si";

const Sidebar = () => {
    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    return (
        <div
            className={`z-50 glass-container sticky top-[20%] xs:top-[25%] mobile-l:top-[26%] tablet:top-[27%] md:top-[26%] laptop:top-[26%] laptop-l:top-[30%] xl:top-[] left-0 h-[35%] laptop-l:h-[] transition-all duration-150 ease-in-out ${
                filterOpen
                    ? "w-[70%] xs:w-[60%] mobile-l:w-[59%] tablet:w-[33%] laptop:w-[25%]"
                    : "w-[6.5em] xs:w-[6em] mobile-l:w-[5.5em] tablet:w-[5.3em] laptop-l:w-[16%] 2xl:w-[13%] 3xl:w-[11%] 4vl:w-[10%]"
            } z-40 overflow-hidden translate-x-[0%] -mb-[43em] xs:-mb-[40em] mobile-l:-mb-[37em] md:-mb-[40em] laptop-l:-mb-[32em] xl:-mb-[30em] 4vl:-mb-[33em] px-[1.5em] laptop-l:px-[0.5em] py-[1%] laptop-l:py-[1%] text-center flex flex-row items-center justify-start hover:translate-x-[0%] self-start ml-[3%] laptop-l:ml-[0.5%] 2xl:ml-[2%]`}
        >
            <ul className="flex flex-col justify-center items-start gap-[1em] relative ml-[0%]">
                <li className="laptop-l:hidden">
                    <a
                        href="#filter"
                        className="flex items-center justify-center gap-[1.5em]"
                    >
                        <button
                            className="h-[2.5rem] min-w-[2.5rem] flex items-center justify-center"
                            onClick={handleFilter}
                        >
                            <MdKeyboardArrowRight
                                className={`transition-all duration-150 linear transform ${
                                    !filterOpen ? "rotate-0" : "rotate-180"
                                } h-[1.5em] w-[1.5em]`}
                            />
                        </button>

                        <strong className="min-w-[10rem] flex justify-start">
                            Filter
                        </strong>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#men" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <IoIosMan className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">
                            Men&apos;s Clothing
                        </span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#women" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <IoIosWoman className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">
                            Women&apos;s Clothing
                        </span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#kids" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <FaChild className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">
                            Kid&apos;s Clothing
                        </span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#hats" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <SiRedhat className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">Hats</span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#tops" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <FaTshirt className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">Tops</span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#bottoms" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <GiArmoredPants className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">Bottoms</span>
                    </a>
                </li>
                <li className="filter-container">
                    <a
                        href="#accessories"
                        className="filter-icon-list-container"
                    >
                        <span className="filter-icon-glass-container">
                            <IoIosPhonePortrait className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">
                            Accessories
                        </span>
                    </a>
                </li>
                <li className="filter-container">
                    <a href="#lifestyle" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                            <MdFilterFrames className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container">
                            Stationary
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
