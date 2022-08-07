import { useState } from "react";

if (typeof browser === "undefined") {
    var browser = chrome;
}

const useBrowserMessageEvents = () => {
    const [state, setState] = useState(null);

    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.id === "TRANSACTION_DETAILS") {
            setState(message);
        }
        sendResponse("success");
    });

    return state;
};

export default useBrowserMessageEvents;
