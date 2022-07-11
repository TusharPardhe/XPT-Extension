if (typeof browser === "undefined") {
    var browser = chrome;
};

browser.runtime.onMessage.addListener(request => {

    if (request.id === "OpenXPTExtensionPopup") {
        const searchParams = new URLSearchParams();
        searchParams.append("source",request.url);
        searchParams.append("route","/add/account");
        
        browser.windows.create({
            url: `index.html?${searchParams.toString()}`,
            type: "popup",
            focused: true,
            height: 500,
            width: 350,
            top: 0,
            left: screen.width - 400,
        })

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