import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { ENV } from './constants/common.constants';
import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

const DEV_ENV = ENV === 'DEVELOPMENT';

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
