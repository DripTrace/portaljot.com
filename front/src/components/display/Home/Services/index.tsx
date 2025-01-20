"use client";

import Description from "./Description";
import { DescriptionSection, ServicesContainer } from "./ServicesElements";
import { forwardRef } from "react";

type ServicesProps = {
    // Any other props can be added here
};

const Services = forwardRef<HTMLElement, ServicesProps>((props, ref) => {
    return (
        <ServicesContainer id="services" ref={ref}>
            <DescriptionSection>
                <Description />
            </DescriptionSection>
        </ServicesContainer>
    );
});

export default Services;
