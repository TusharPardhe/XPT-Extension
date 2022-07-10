import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import Routes from "./routes";
import { DEV_ENV } from "./constants/common.constants";

import "react-toastify/dist/ReactToastify.css";

function App() {
    if (DEV_ENV) {
        return (
            <BrowserRouter>
                <div className="container">
                    <ToastContainer />
                    <Routes />
                </div>
            </BrowserRouter>
        );
    }

    return (
        <MemoryRouter>
            <div className="container">
                <ToastContainer />
                <Routes />
            </div>
        </MemoryRouter>
    );
}

export default App;
