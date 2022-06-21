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
};

export const DEV_ENV = process.env.NODE_ENV === "development";

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";

export const URLS = {
    XRP_ICON: "https://drive.google.com/uc?export=view&id=1VUSemYB5GqRNihGVELTrlcW3VObhhn0-",
    CONSTRUCTION_GIF: "https://drive.google.com/uc?export=view&id=1219VV9-YnQBRiPnSFz2WjTULg6J0vdNc",
    XRPSCAN: "https://xrpscan.com/",
    TWITTER: "https://twitter.com/",
};

export const FIELD_INITIAL_STATE = {
    value: "",
    inputValue: "",
    error: [],
};

export const ADD_ACCOUNTS_INITIAL_STATE = {
    xrplAddress: {
        ...FIELD_INITIAL_STATE,
        loading: false,
    },
    alias: FIELD_INITIAL_STATE,
    isLoading: false,
    hasAccountAdded: false,
};

export const LOGIN_INITIAL_STATE = {
    isNextInputsVisible: false,
    username: FIELD_INITIAL_STATE,
    password: FIELD_INITIAL_STATE,
    confirmPassword: FIELD_INITIAL_STATE,
    xrplAddress: FIELD_INITIAL_STATE,
};

export const VALIDATION_REGEX = {
    PASSWORD: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
};

export const ENCRYPTION_KEY = "*Rz?JM7xe^kQk@Ev&ykfU8=_4-*!kY";