console.log("XPT Background script loaded");

let windowId = null;

if (typeof browser === "undefined") {
    var browser = chrome;
}

const createWindow = ({ transactionId, screenWidth }) => {
    browser.windows.create({
        url: `index.html?route=transaction&transactionId=${transactionId}`,
        type: "popup",
        focused: true,
        height: 500,
        width: 350,
        top: 0,
        left: screenWidth - 400,
    }, (extensionWindow) => {
        windowId = extensionWindow.id;
    });
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.id === "XRPL_TRANSACTION") {
        chrome.windows.getAll({}, (e) => {
            if (windowId) {
                chrome.windows.update(windowId, { focused: true });
                return;
            }
            createWindow(message);
        });
    }

    if (message.id === "EXTENSION_LOADED") {
        console.log("Extension loaded and messaged received");

        // message.signed = transactions[message.transactionId];
        // delete transactions[message.transactionId];
        // browser.tabs.query({ active: true }, function (tabs) {
        //     browser.tabs.sendMessage(tabs[0].id, message, (response) => { });
        // });
    }
});
