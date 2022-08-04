console.log("XPT background script loaded");

const transactions = {};

if (typeof browser === "undefined") {
    var browser = chrome;
}

const createWindow = ({ transactionId }) => {
    browser.windows.create({
        url: `index.html?route=transaction&transactionId=${transactionId}`,
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
        // transactions[message.transactionId] = message.txJSON;
        transactions[message.transactionId] = {
            "Account": "Hii",
            "TransactionType": "Payment",
            "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
            "Amount": "13000000",
            "Flags": 2147483648,
            "LastLedgerSequence": 7835923, // Optional, but recommended.
            "Fee": "13",
            "Sequence": "my_seq"
        };
        createWindow(message);
    }

    if (message.id === "DATA_FROM_POPUP") {
        message.signed = transactions[message.transactionId];
        delete transactions[message.transactionId];
        browser.tabs.query({ active: true }, function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, message, (response) => { });
        });
    }
});
