if (typeof browser === "undefined") {
    var browser = chrome;
};

const button = document.getElementById("alert-button");

button.addEventListener("click", () => {
    browser.runtime.sendMessage({
      id: "PayWithXPT",
      url: window.location.href,
      state: {
        "Transaction": "Payment",
        "from": "adw",
        "to": "XX",
        "Amount": "lak"
      }
    })
})