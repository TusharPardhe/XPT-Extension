let popupWindowId = null;

chrome.runtime.onInstalled.addListener(function () {
    console.log('XPT Extension Installed');
});

chrome.action.onClicked.addListener(function (tab) {
    if (popupWindowId === null) {
        createPopupWindow();
    } else {
        chrome.windows.get(popupWindowId, function (window) {
            if (chrome.runtime.lastError || !window) {
                // Window is closed or doesn't exist, create a new one
                createPopupWindow();
            } else {
                // Window exists, bring it to the front
                chrome.windows.update(popupWindowId, { focused: true });
            }
        });
    }
});

// dont let the width and height to be changed
chrome.windows.onBoundsChanged.addListener(function (window) {
    if (window.id === popupWindowId) {
        console.log('window bounds changed', window);
        chrome.windows.update(popupWindowId, {
            width: 350,
            height: 600,
        });
    }
});

function createPopupWindow() {
    chrome.windows.create(
        {
            type: 'popup',
            url: 'index.html',
            width: 350,
            height: 600,
            top: 50,
            left: 100,
        },

        function (window) {
            popupWindowId = window.id;
        }
    );
}
