import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import { ENV } from './constants/common.constants';
import React from 'react';
import Routes from './routes';

const DEV_ENV = ENV === 'DEVELOPMENT';

function App() {
    if (DEV_ENV) {
        return (
            <BrowserRouter>
                <div className="container" id="xpt_browser_extension">
                    <ToastContainer
                        autoClose={1000}
                        theme="colored"
                        hideProgressBar
                        pauseOnHover
                        pauseOnFocusLoss
                        transition={Zoom}
                    />
                    <Routes />
                </div>
            </BrowserRouter>
        );
    }

    return (
        <MemoryRouter>
            <div className="container" id="xpt_browser_extension">
                <ToastContainer theme="colored" hideProgressBar pauseOnHover pauseOnFocusLoss transition={Zoom} />
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
