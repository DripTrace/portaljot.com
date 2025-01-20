"use client";

import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { YinYang } from "./AllSvgs";
import { DarkTheme } from "./GlobalStyle";
import LogoComponent from "./LogoComponent";
import SocialIcons from "./SocialIcons";
import PowerButton from "./PowerButton";
import BigTitle from "./BigTitle";
import { Work } from "@/data/russell/WorkData";
import Card from "./Card";

const Box = styled.div`
    background-color: ${(props) => props.theme.body};
    height: 400vh;
    position: relative;
    display: flex;
    align-items: center;
`;

const Main = styled(motion.ul)`
    position: fixed;
    top: 12rem;
    left: calc(10rem + 15vw);
    height: 40vh;
    display: flex;
    color: white;
`;

const Rotate = styled.span`
    display: block;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 80px;
    height: 80px;
    z-index: 1;
`;

// Framer-motion Configuration
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            duration: 0.5,
        },
    },
};

const WorkPage: React.FC = () => {
    const ref = useRef<HTMLUListElement>(null);
    const yinyang = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const rotate = () => {
            if (ref.current) {
                ref.current.style.transform = `translateX(${-window.pageYOffset}px)`;
            }
            if (yinyang.current) {
                yinyang.current.style.transform = `rotate(${-window.pageYOffset}deg)`;
            }
        };

        window.addEventListener("scroll", rotate);
        return () => {
            window.removeEventListener("scroll", rotate);
        };
    }, []);

    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme="dark" />
                <SocialIcons theme="dark" />
                <PowerButton />

                <Main
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {Work.map((d) => (
                        <Card key={d.id} data={d} />
                    ))}
                </Main>
                <Rotate ref={yinyang}>
                    <YinYang width={80} height={80} fill={DarkTheme.text} />
                </Rotate>

                <BigTitle text="WORK" top="10%" right="20%" />
            </Box>
        </ThemeProvider>
    );
};

export default WorkPage;
