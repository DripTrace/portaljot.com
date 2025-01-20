"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DarkTheme } from "./GlobalStyle";
import { Facebook, Github, Twitter, YouTube } from "./AllSvgs";

interface IconsProps {
    // Add any specific props if needed
}

const Icons = styled.div<IconsProps>`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 2rem;

    z-index: 3;

    & > *:not(:last-child) {
        margin: 0.5rem 0;
    }
`;

interface LineProps {
    color: "dark" | "light";
}

const Line = styled(motion.span)<LineProps>`
    width: 2px;
    height: 8rem;
    background-color: ${(props) =>
        props.color === "dark" ? DarkTheme.text : DarkTheme.body};
`;

interface SocialIconsProps {
    theme: "dark" | "light";
}

const SocialIcons: React.FC<SocialIconsProps> = ({ theme }) => {
    return (
        <Icons>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{ type: "spring", duration: 1, delay: 1 }}
            >
                <a
                    style={{ color: "inherit" }}
                    target="_blank"
                    href={"https://github.com/RussPalms"}
                    rel="noopener noreferrer"
                >
                    <Github
                        width={25}
                        height={25}
                        fill={
                            theme === "dark" ? DarkTheme.text : DarkTheme.body
                        }
                    />
                </a>
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{ type: "spring", duration: 1, delay: 1.2 }}
            >
                <a
                    style={{ color: "inherit" }}
                    target="_blank"
                    href={"https://twitter.com/rPalmPinoy"}
                    rel="noopener noreferrer"
                >
                    <Twitter
                        width={25}
                        height={25}
                        fill={
                            theme === "dark" ? DarkTheme.text : DarkTheme.body
                        }
                    />
                </a>
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{ type: "spring", duration: 1, delay: 1.4 }}
            >
                <a
                    style={{ color: "inherit" }}
                    target="_blank"
                    href={"https://facebook.com/russpalms"}
                    rel="noopener noreferrer"
                >
                    <Facebook
                        width={25}
                        height={25}
                        fill={
                            theme === "dark" ? DarkTheme.text : DarkTheme.body
                        }
                    />
                </a>
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{ type: "spring", duration: 1, delay: 1.6 }}
            >
                <a
                    style={{ color: "inherit" }}
                    target="_blank"
                    href={
                        "https://youtube.com/channel/UCG7bMps5nPDkUixUODe0big"
                    }
                    rel="noopener noreferrer"
                >
                    <YouTube
                        width={25}
                        height={25}
                        fill={
                            theme === "dark" ? DarkTheme.text : DarkTheme.body
                        }
                    />
                </a>
            </motion.div>

            <Line
                color={theme}
                initial={{
                    height: 0,
                }}
                animate={{
                    height: "8rem",
                }}
                transition={{
                    type: "spring",
                    duration: 1,
                    delay: 0.8,
                }}
            />
        </Icons>
    );
};

export default SocialIcons;
