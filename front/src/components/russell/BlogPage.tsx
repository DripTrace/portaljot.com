"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import LogoComponent from "./LogoComponent";
import PowerButton from "./PowerButton";
import SocialIcons from "./SocialIcons";
import BigTitle from "./BigTitle";
import AnchorComponent from "./AnchorComponent";
import ProjectsComponent from "./ProjectsComponent";
import { Projects } from "@/data/russell/BlogData";

// Define the type for a project
interface Project {
    id: number;
    name: string;
    tags: string[];
    date: string;
    imgSrc: string;
    link: string;
}

// const img = require("/assets/russell/Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg");

const MainContainer = styled(motion.div)`
    background-image: url(${"/assets/russell/Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
`;

const Container = styled.div<{ theme: { bodyRgba: string } }>`
    background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.8)`};
    width: 100%;
    height: auto;
    position: relative;
    padding-bottom: 5rem;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
    grid-gap: calc(1rem + 2vw);
`;

// Framer-motion config
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

const BlogPage: React.FC = () => {
    const [numbers, setNumbers] = useState(0);

    useEffect(() => {
        let num = (window.innerHeight - 70) / 30;
        setNumbers(parseInt(num.toString()));
    }, []);

    return (
        <MainContainer
            variants={container}
            initial="hidden"
            animate="show"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 },
            }}
        >
            <Container>
                <LogoComponent theme="dark" />
                <PowerButton />
                <SocialIcons theme="dark" />
                <AnchorComponent number={numbers} />
                <Center>
                    <Grid>
                        {Projects.map((blog: Project) => (
                            <ProjectsComponent key={blog.id} blog={blog} />
                        ))}
                    </Grid>
                </Center>
                <BigTitle text="BLOG" top="5rem" left="5rem" />
            </Container>
        </MainContainer>
    );
};

export default BlogPage;
