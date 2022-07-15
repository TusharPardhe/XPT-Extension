import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import Routes from "./routes";
import { ENV } from "./constants/common.constants";

import "react-toastify/dist/ReactToastify.css";

const DEV_ENV = ENV === "DEVELOPMENT";

if (!DEV_ENV) {
    console.log = () => { };
};

function App() {
    if (DEV_ENV) {
        return (
            <BrowserRouter>
                <div className="container" id="xpt_browser_extension">
                    <ToastContainer />
                    <Routes />
                </div>
            </BrowserRouter>
        );
    }

    return (
        <MemoryRouter>
            <div className="container" id="xpt_browser_extension">
                <ToastContainer />
                <Routes />
            </div>
        </MemoryRouter>
    );
}

export default App;
