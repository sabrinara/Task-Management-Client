import { Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import NavBar from "../pages/NavBar";
import Footer from "../pages/Footer";


const Main = () => {
    const location = useLocation();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <div data-theme={isDarkTheme ? "night" : "light"}>
            {noHeaderFooter || <NavBar toggleTheme={toggleTheme}></NavBar>}
            {/* Use Outlet directly for the root layout */}
            <Outlet />
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;
