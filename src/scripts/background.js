console.log("XPT background script loaded");

const transactions = {};

if (typeof browser === "undefined") {
    var browser = chrome;
}

const createWindow = ({ transactionId }) => {
    browser.windows.create({
        url: `index.html?route=PAYMENT&transactionId=${transactionId}`,
        type: "popup",
        focused: true,
        height: 500,
        width: 350,
        top: 0,
        left: window.screen.width - 400,
    });
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.id === "XRPL_TRANSACTION") {
        // create a window and send transaction ID as url param
        transactions[message.transactionId] = {
            txJSON: {
                Account: "Hii",
                TransactionType: "Payment",
                Destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                Amount: "13000000",
                Flags: 2147483648,
                LastLedgerSequence: 7835923,
                Fee: "13",
                Sequence: "123",
            },
            timeStamp: new Date().getTime(),
        };
        createWindow(message);
        sendResponse("success");
    }

    if (message.id === "POPUP_LOADED") {
        // When popup loads send the transaction details for signing
        const transaction = transactions[message.transactionId];
        delete transactions[message.transactionId];
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { transaction, id: "TRANSACTION_DETAILS" }, (response) => {});
        });
        sendResponse("success");
    }

    if (message.id === "SIGNED_TRANSACTION") {
        console.log("Bg", message);
        // Send the signed transaction to content script
        browser.tabs.query({ active: true }, function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, message, (response) => {});
        });
        sendResponse("success");
    }
});
