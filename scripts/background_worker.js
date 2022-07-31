if (typeof browser === "undefined") {
    var browser = chrome;
};

function onTabLoaded(tabId) {
    return new Promise(resolve => {
        browser.tabs.onUpdated.addListener(function onUpdated(id, change) {
            if (id === tabId && change.status === 'complete') {
                browser.tabs.onUpdated.removeListener(onUpdated);
                resolve();
            }
        });
    });
}

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    if (message.id === "PayWithXPT") {
        const searchParams = new URLSearchParams();
        searchParams.append("source", message.url);
        searchParams.append("route","/add/account");
        console.log("In bs", message);
        
        await browser.windows.create({
            url: `index.html?${searchParams.toString()}`,
            type: "popup",
            focused: true,
            height: 500,
            width: 350,
            top: 0,
            tabId: 12,
            left: screen.width - 400,
        });
        // await onTabLoaded(popup.id);
        await browser.runtime.sendMessage(12, {
            data: message,
        });
    }

})

// manifest content-script
// "content_scripts": [
//     {
//       "matches": [
//         "https://*/*"
//       ],
//       "js": [
//         "content.js"
//       ]
//     }
//   ],