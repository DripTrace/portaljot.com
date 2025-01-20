"use client";

import { useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import GeneralModal from "./GeneralModal";
import Authorization from "./Authorization";
import QuickSketch from "./QuickSketch";
import SketchModal from "./SketchModal";
import DesignMix from "@/components/merchandise/DesignMix";
import Socials from "@/components/merchandise/Socials";

interface ObinsunProps {
    children: React.ReactNode;
}

const Obinsun: React.FC<ObinsunProps> = ({ children }) => {
    const obinsunRef = useRef<HTMLDivElement>(null);
    const authModalRef = useRef<{ openModal: () => void; close: () => void }>(
        null
    );
    const quickSketchModalRef = useRef<{
        openSketch: () => void;
        closeQuickSketchModal: () => void;
    }>(null);

    const openModal = () => {
        authModalRef.current?.openModal();
    };

    const closeModal = () => {
        authModalRef.current?.close();
    };

    const openSketch = () => {
        quickSketchModalRef.current?.openSketch();
    };

    const closeQuickSketch = () => {
        quickSketchModalRef.current?.closeQuickSketchModal();
    };

    return (
        <main ref={obinsunRef}>
            <GeneralModal ref={authModalRef}>
                <Authorization closeModal={closeModal} />
            </GeneralModal>
            <SketchModal ref={quickSketchModalRef}>
                <QuickSketch closeQuickSketch={closeQuickSketch} />
            </SketchModal>
            <DesignMix key="design_mix" />
            <div className="relative top-0 h-full w-full z-40 flex flex-col items-center justify-center text-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg">
                <Header
                    key="header"
                    openModal={openModal}
                    openSketch={openSketch}
                />
                <Sidebar key="sidebar" />
                <Socials key="externals" />
                {children}
                <Footer key="footer" />
            </div>
        </main>
    );
};

export default Obinsun;
