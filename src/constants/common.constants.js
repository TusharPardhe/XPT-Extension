export const ROUTES = {
    LANDING_PAGE: "/",
    LOGIN: "/login",
    SIGN_UP: "/sign_up",
    HOME: "/home",
    ACCOUNTS: "/add_account",
    PORTFOLIO: "/portfolio/:id",
    TRANSACTIONS: "/transactions/:id",
    XRP_DETAILS: "/price",
    NFT_DETAILS: "/nft",
    USEFUL_LINKS: "/links",
    AIRDROPS: "/airdrops",
    DROP_DETAILS: "/drop/:id",
    AIRDROP_REGISTRATION: "/airdrop/register",
    REQUEST_SUCCESS: "/request/success",
};

export const ENV = process.env.NODE_ENV.toUpperCase();

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";

export const URLS = {
    XRP_ICON: "https://drive.google.com/uc?export=view&id=1VUSemYB5GqRNihGVELTrlcW3VObhhn0-",
    CONSTRUCTION_GIF: "https://drive.google.com/uc?export=view&id=1219VV9-YnQBRiPnSFz2WjTULg6J0vdNc",
    XRPSCAN: "https://xrpscan.com/",
    TWITTER: "https://twitter.com/",
    XPT_TWITTER: "https://twitter.com/xptxrpl",
};

export const FIELD_INITIAL_STATE = {
    value: "",
    inputValue: "",
    error: [],
};

export const VALIDATION_REGEX = {
    PASSWORD: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    XRPL_R_ADDRESS: /^r[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{24,34}$/,
    URL: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};