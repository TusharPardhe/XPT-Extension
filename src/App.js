import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import Routes from "./routes";
import { ENV } from "./constants/common.constants";

import "react-toastify/dist/ReactToastify.css";

const DEV_ENV = ENV === "DEVELOPMENT";


function App() {
    if (DEV_ENV) {
        return (
            <BrowserRouter>
                <div className="container" id="xpt_browser_extension">
                    <ToastContainer autoClose={1000} />
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


// Additional things in manifest.json file
// "background": {
//     "persistent": false,
//     "scripts": [
//       "background.js"
//     ]
//   },
//   "content_scripts": [
//     {
//       "matches": [
//       "<all_urls>"
//       ],
//       "js": [
//         "content.js"
//       ]
//     }
//   ],