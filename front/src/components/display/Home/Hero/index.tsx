"use client";

import { useState } from "react";
import {
    ArrowForward,
    ArrowRight,
    HeroBackground,
    HeroBtnWrapper,
    HeroContainer,
    HeroContent,
    HeroH1,
    HeroP,
    VideoBg,
} from "./HeroElements";
import { Button } from "../../Navigation/ButtonElements";

type HeroProps = {
    id: string;
};

const Hero: React.FC<HeroProps> = ({ id }) => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <>
            <HeroContainer id={id}>
                <HeroBackground>
                    <VideoBg
                        autoPlay
                        loop
                        muted
                        src="https://firebasestorage.googleapis.com/v0/b/green-spot-productions.appspot.com/o/hero.mp4?alt=media&token=b7379279-4870-4937-9ca2-f00d47d63d00"
                    />
                </HeroBackground>
                <HeroContent>
                    <HeroH1>Content Production Made Easy</HeroH1>
                    <HeroP>
                        Sign up for a Boogey Account now and gain access to
                        exclusive content.
                    </HeroP>
                    <HeroBtnWrapper>
                        <Button
                            to="signup"
                            onMouseEnter={onHover}
                            onMouseLeave={onHover}
                            primary={true}
                            dark={true}
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-80}
                        >
                            Get Started{" "}
                            {hover ? <ArrowForward /> : <ArrowRight />}
                        </Button>
                    </HeroBtnWrapper>
                </HeroContent>
            </HeroContainer>
        </>
    );
};

export default Hero;
