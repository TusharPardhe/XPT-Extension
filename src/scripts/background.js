console.log("XPT Background script loaded");

if (typeof browser === "undefined") {
    var browser = chrome;
}

let windowId = null;
let txn = null;

const createWindow = ({ transaction, transactionId, screenWidth }) => {
    browser.windows.create({
        url: `index.html?route=transaction&transactionId=${transactionId}`,
        type: "popup",
        focused: true,
        height: 500,
        width: 350,
        top: 0,
        left: screenWidth - 400,
    }, (chromeWindow) => {
        windowId = chromeWindow.id;
        txn = transaction;
        console.log(txn);
        console.log(windowId);
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

    // if (message.id === "EXTENSION_LOADED") {
    //     console.log("Extension loaded and messaged received");

    //     // message.signed = transactions[message.transactionId];
    //     // delete transactions[message.transactionId];
    //     // browser.tabs.query({ active: true }, function (tabs) {
    //     //     browser.tabs.sendMessage(tabs[0].id, message, (response) => { });
    //     // });
    // }
});

browser.runtime.onConnect.addListener(function (port) {
    if (port.name === "xptExtension") {

        // When extension sends message
        port.onMessage.addListener(function (msg) {
            if (msg.code === "SEND_TRANSACTION_DETAILS") {
                port.postMessage({ txn });
            }
        });

        // if user closes the extension
        port.onDisconnect.addListener(function () {
            windowId = null;
            txn = null;
            console.log("popup has been closed");
            const message = { code: "XPT_CLOSED" };
            browser.tabs.query({ active: true }, function (tabs) {
                browser.tabs.sendMessage(tabs[0].id, message, (r) => { });
            });
        });
    }
});