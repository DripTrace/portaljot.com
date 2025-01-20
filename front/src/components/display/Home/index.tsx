"use client";

import { HomeContainer } from "./HomeElements";
import Hero from "./Hero";
import Information from "./Information";
import { RefObject } from "react";
import Services from "./Services";
import Policies from "./Policies";

type HomeProps = {
    informationReference: RefObject<HTMLDivElement>;
    servicesReference: RefObject<HTMLDivElement>;
    policiesReference: RefObject<HTMLDivElement>;
};

const Home: React.FC<HomeProps> = ({
    informationReference,
    servicesReference,
    policiesReference,
}) => {
    // const handleInformationDirect = () => {
    //     informationReference.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // const handleServicesDirect = () => {
    //     servicesReference.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // const handlePoliciesDirect = () => {
    //     policiesReference.current?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        <>
            <HomeContainer>
                <Hero id="hero" />
                <Information ref={informationReference} />
                <Services ref={servicesReference} />
                <Policies ref={policiesReference} />
            </HomeContainer>
        </>
    );
};

export default Home;
