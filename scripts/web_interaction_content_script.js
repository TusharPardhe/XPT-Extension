if (typeof browser === "undefined") {
    var browser = chrome;
};

const button = document.getElementById("alert-button");

button.addEventListener("click", () => {
    browser.runtime.sendMessage({
      id:  "OpenXPTExtensionPopup",
      url: window.location.href,
    })
})