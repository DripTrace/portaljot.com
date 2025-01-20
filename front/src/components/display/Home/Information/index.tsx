"use client";

import { InformationContainer, PlatformSection } from "./InformationElements";
import Platform from "./Platform";
import { About, Access, Discover } from "./Platform/index.data";
import { forwardRef } from "react";

type InformationProps = {
    // Any other props can be added here
};

const Information = forwardRef<HTMLElement, InformationProps>((props, ref) => {
    return (
        <InformationContainer id="information" ref={ref}>
            <PlatformSection>
                <Platform {...About} />
                <Platform {...Discover} />
                <Platform {...Access} />
            </PlatformSection>
        </InformationContainer>
    );
});

export default Information;
