import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { DEV_ENV } from "./constants/common.constants";

import Routes from "./routes";

function App() {
    if (DEV_ENV) {
        return (
            <BrowserRouter>
                <div className="container">
                    <Routes />
                </div>
            </BrowserRouter>
        );
    }

    return (
        <MemoryRouter>
            <div className="container">
                <Routes />
            </div>
        </MemoryRouter>
    );
}

export default App;
