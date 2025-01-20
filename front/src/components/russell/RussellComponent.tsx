"use client";

import "normalize.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { GlobalStyle, lightTheme } from "./GlobalStyle";
import SoundBar from "./SoundBar";
import Main from "./Main";
import AboutPage from "./AboutPage";
import BlogPage from "./BlogPage";
import WorkPage from "./WorkPage";
import MySkillsPage from "./MySkillsPage";

// New component that uses useLocation
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
                <Route path="/russell" element={<Main />} />
                <Route path="/russell/about" element={<AboutPage />} />
                <Route path="/russell/blog" element={<BlogPage />} />
                <Route path="/russell/work" element={<WorkPage />} />
                <Route path="/russell/skills" element={<MySkillsPage />} />
                <Route path="*" element={<Main />} />
            </Routes>
        </AnimatePresence>
    );
};

const RussellComponent = () => {
    return (
        <Router>
            <GlobalStyle />
            <ThemeProvider theme={lightTheme}>
                <SoundBar />
                <AnimatedRoutes />
            </ThemeProvider>
        </Router>
    );
};

export default RussellComponent;
