console.log("XPT content script loaded");

if (typeof browser === "undefined") {
  var browser = chrome;
}

const randomString = (length, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

// Message from web page
window.addEventListener("message", (event) => {
  console.log(event.data);

  if (event.data.id === "XRPL_TRANSACTION") {
    // send message to background script
    const transactionId = `${new Date().getTime()}${randomString(6)}`;
    browser.runtime.sendMessage({
      id: event.data.id,
      transactionId: transactionId,
      screenWidth: window.screen.width
    });
  }

  if (event.data.id === "CONNECT") {
    window.postMessage({ code: "SUCCESS" });
  }
});

// Message from popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(`I am from background script to content =>`, message);
    // window.postMessage({ message: `I am from Content Script ${message.message}`, type: "RESPONSE" });
});
