"use client";

import { useState, RefObject } from "react";
import Layout from "./Layout";
import Home from "./Home";

type DisplayComponentProps = {
    informationReference: RefObject<HTMLDivElement>;
    servicesReference: RefObject<HTMLDivElement>;
    policiesReference: RefObject<HTMLDivElement>;
};

const DisplayComponent: React.FC<DisplayComponentProps> = ({
    informationReference,
    servicesReference,
    policiesReference,
}) => {
    const [showModal, setShowModal] = useState(true);

    return (
        // <Layout
        //     informationReference={informationReference}
        //     servicesReference={servicesReference}
        //     policiesReference={policiesReference}
        // >
        <Home
            informationReference={informationReference}
            servicesReference={servicesReference}
            policiesReference={policiesReference}
        />
        // </Layout>
    );
};

export default DisplayComponent;
