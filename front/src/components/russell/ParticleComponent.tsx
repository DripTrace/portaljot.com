"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import styled from "styled-components";
// import ConfigLight from "@/configs/russell/particlesjs-config-light"
// import ConfigDark from "@/configs/russell/particlesjs-config"

const ConfigDark = require("@/configs/russell/particlesjs-config.ts");
const ConfigLight = require("@/configs/russell/particlesjs-config-light.ts");

const Box = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
`;

interface ParticlesComponentProps {
    theme: "light" | "dark";
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ theme }) => {
    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    return (
        <Box>
            <Particles
                id="tsparticles"
                style={{ position: "absolute", top: 0 }}
                params={theme === "light" ? ConfigLight : ConfigDark}
                init={particlesInit}
            />
        </Box>
    );
};

export default ParticlesComponent;
