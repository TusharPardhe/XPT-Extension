export const ROUTES = {
    HOME: "/",
    ACCOUNTS: "/accounts/",
    PORTFOLIO: "/portfolio/:id"
};

export const DEV_ENV = process.env.NODE_ENV === "development";

export const PUBLIC_SERVER = "wss://s2.ripple.com/";
