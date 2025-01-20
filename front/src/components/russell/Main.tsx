"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import LogoComponent from "./LogoComponent";
import PowerButton from "./PowerButton";
import { YinYang } from "./AllSvgs";
import SocialIcons from "./SocialIcons";
import ThePlaceHolder from "./ThePlaceHolder";

// Define theme interface
interface Theme {
    body: string;
    text: string;
    bodyRgba: string;
}

// Light and Dark theme objects
const lightTheme: Theme = {
    body: "#FCF6F4",
    text: "#000000",
    bodyRgba: "252, 246, 244",
};

const darkTheme: Theme = {
    body: "#000000",
    text: "#FCF6F4",
    bodyRgba: "0, 0, 0",
};

// Styled Components
const MainContainer = styled.div<{ theme: Theme }>`
    background: ${(props) => props.theme.body};
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: "Karla", sans-serif;
        font-weight: 500;
    }
`;

const Container = styled.div`
    padding: 2rem;
`;

const Contact = styled.a`
    color: ${(props) => props.theme.text};
    position: absolute;
    top: 2rem;
    right: calc(1rem + 2vw);
    text-decoration: none;
    z-index: 1;
`;

const BLOG = styled(NavLink)`
    color: ${(props) => props.theme.text};
    position: absolute;
    top: 50%;
    right: calc(1rem + 2vw);
    transform: rotate(90deg) translate(-50%, -50%);
    text-decoration: none;
    z-index: 1;
`;

const WORK = styled(NavLink)<{ $isClicked: boolean }>`
    color: ${(props) =>
        props.$isClicked ? props.theme.body : props.theme.text};
    position: absolute;
    top: 50%;
    left: calc(1rem + 2vw);
    transform: translate(-50%, -50%) rotate(-90deg);
    text-decoration: none;
    z-index: 1;
`;

const BottomBar = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const ABOUT = styled(NavLink)<{ $isClicked: boolean }>`
    color: ${(props) =>
        props.$isClicked ? props.theme.body : props.theme.text};
    text-decoration: none;
    z-index: 1;
`;

const SKILLS = styled(NavLink)`
    color: ${(props) => props.theme.text};
    text-decoration: none;
    z-index: 1;
`;

const Center = styled.button<{ $isClicked: boolean }>`
    position: absolute;
    top: ${(props) => (props.$isClicked ? "85%" : "50%")};
    left: ${(props) => (props.$isClicked ? "92%" : "50%")};
    transform: translate(-50%, -50%);
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;

    & > :first-child {
        animation: rotate infinite 1.5s linear;
    }

    & > :last-child {
        display: ${(props) => (props.$isClicked ? "none" : "inline-block")};
        padding-top: 1rem;
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const DarkDiv = styled.div<{ $isClicked: boolean }>`
    position: absolute;
    top: 0;
    background-color: #000;
    bottom: 0;
    right: 50%;
    width: ${(props) => (props.$isClicked ? "50%" : "0%")};
    height: ${(props) => (props.$isClicked ? "100%" : "0%")};
    z-index: 1;
    transition:
        height 0.5s ease,
        width 1s ease 0.5s;
`;

// Intro Component
interface IntroProps {
    click: boolean;
}

const Box = styled(motion.div)<{ theme: Theme }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 65vw;
    height: 55vh;
    display: flex;
    background:
        linear-gradient(
                to right,
                ${(props) => props.theme.body} 50%,
                ${(props) => props.theme.text} 50%
            )
            bottom,
        linear-gradient(
                to right,
                ${(props) => props.theme.body} 50%,
                ${(props) => props.theme.text} 50%
            )
            top;
    background-repeat: no-repeat;
    background-size: 100% 2px;
    border-left: 2px solid ${(props) => props.theme.body};
    border-right: 2px solid ${(props) => props.theme.text};
    z-index: 1;
`;

const SubBox = styled.div`
    width: 50%;
    position: relative;
    display: flex;

    .pic {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 100%;
        height: auto;
    }
`;

const Text = styled.div<{ theme: Theme }>`
    font-size: calc(1em + 1.5vw);
    color: ${(props) => props.theme.body};
    padding: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & > *:last-child {
        color: ${(props) => `rgba(${props.theme.bodyRgba},0.6)`};
        font-size: calc(0.5rem + 1.5vw);
        font-weight: 300;
    }
`;

const Intro: React.FC<IntroProps> = ({ click }) => {
    return (
        <Box
            initial={{ height: 0 }}
            animate={{ height: "55vh" }}
            transition={{ type: "spring", duration: 2, delay: 1 }}
        >
            <SubBox>
                <Text>
                    <h1 className="text-white">Hi,</h1>
                    <h3 className="text-white">I'm Russell Palma.</h3>
                    <h6 className="text-white">
                        I design and Code simple yet beautiful websites.
                    </h6>
                </Text>
            </SubBox>
            <SubBox>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <ThePlaceHolder className="pic" />
                </motion.div>
            </SubBox>
        </Box>
    );
};

// Main Component
const Main: React.FC = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <ThemeProvider theme={click ? darkTheme : lightTheme}>
            <MainContainer>
                <DarkDiv $isClicked={click} />
                <Container>
                    <PowerButton />
                    <LogoComponent theme={click ? "dark" : "light"} />
                    <SocialIcons theme={click ? "dark" : "light"} />

                    <Center $isClicked={click}>
                        <YinYang
                            onClick={handleClick}
                            width={click ? 120 : 200}
                            height={click ? 120 : 200}
                            fill="currentColor"
                        />
                        <span>click here</span>
                    </Center>

                    <Contact target="_blank" href="mailto:RussPalms@gmail.com">
                        <motion.h2
                            initial={{ y: -200 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                delay: 1,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Say hi..
                        </motion.h2>
                    </Contact>
                    <BLOG to="/russell/blog">
                        <motion.h2
                            initial={{ y: -200 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                delay: 1,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Projects
                        </motion.h2>
                    </BLOG>
                    <WORK to="/russell/work" $isClicked={click}>
                        <motion.h2
                            initial={{ y: -200 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                delay: 1,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Work
                        </motion.h2>
                    </WORK>
                    <BottomBar>
                        <ABOUT to="/russell/about" $isClicked={click}>
                            <motion.h2
                                initial={{ y: 200 }}
                                animate={{ y: 0 }}
                                transition={{
                                    type: "spring",
                                    duration: 1.5,
                                    delay: 1,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                About.
                            </motion.h2>
                        </ABOUT>
                        <SKILLS to="/russell/skills">
                            <motion.h2
                                initial={{ y: 200 }}
                                animate={{ y: 0 }}
                                transition={{
                                    type: "spring",
                                    duration: 1.5,
                                    delay: 1,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                My Skills.
                            </motion.h2>
                        </SKILLS>
                    </BottomBar>
                </Container>
                {click && <Intro click={click} />}
            </MainContainer>
        </ThemeProvider>
    );
};

export default Main;
