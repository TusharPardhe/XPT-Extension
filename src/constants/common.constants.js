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
    PROJECT_CALENDAR: "/calendar",
};

export const DEV_ENV = process.env.NODE_ENV === "development";

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";

export const URLS = {
    XRP_ICON: "https://drive.google.com/uc?export=view&id=1VUSemYB5GqRNihGVELTrlcW3VObhhn0-",
    CONSTRUCTION_GIF: "https://drive.google.com/uc?export=view&id=1219VV9-YnQBRiPnSFz2WjTULg6J0vdNc",
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
    alias: {
        ...FIELD_INITIAL_STATE,
    },
    isLoading: false,
    hasAccountAdded: false,
};