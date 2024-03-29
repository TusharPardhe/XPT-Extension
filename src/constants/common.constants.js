export const ROUTES = {
    LANDING_PAGE: "/",
    LOGIN: "/login",
    SIGN_UP: "/sign_up",
    HOME: "/home",
    ACCOUNTS: "/add_account",
    PORTFOLIO: "/portfolio/:id",
    FUNGIBLE_TOKENS: "/fungible_tokens",
    NFT_DETAILS: "/nft",
    CHEAT_SHEET: "/cheat_sheet",
    AIRDROPS: "/airdrops",
    DROP_DETAILS: "/drop/:id",
    AIRDROP_REGISTRATION: "/airdrop/register",
    REQUEST_SUCCESS: "/request/success",
    DONATIONS: "/donate",
    FUNGIBLE_TOKEN_DETAILS: "/fungible_token/details",
    TRANSACTIONS: "/transactions/:id",
};

export const ENV = import.meta.env.MODE.toUpperCase();

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";

export const URLS = {
    XRP_ICON: "https://drive.google.com/uc?export=view&id=1VUSemYB5GqRNihGVELTrlcW3VObhhn0-",
    CONSTRUCTION_GIF: "https://drive.google.com/uc?export=view&id=1219VV9-YnQBRiPnSFz2WjTULg6J0vdNc",
    XRPSCAN: "https://xrpscan.com/",
    TWITTER: "https://twitter.com/",
    XPT_TWITTER: "https://twitter.com/xptxrpl",
    LIVENET: "https://livenet.xrpl.org/accounts/",
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
    NUMBERS_AND_EMPTY: /^(\s*|\d+)$/,
    ALPHABETS_WITH_TRAILING_SPACES: /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/,
    //URLs starting with http://, https://, or ftp://
    URL_PATTERN_1: /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    URL_PATTERN_2: /(^|[^\/])(www\.[\S]+(\b|$))/gim,
    //Change email addresses to mailto:: links.
    URL_PATTERN_3: /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,
};

export const MAX_ALLOWED_CARD_VALUE_LENGTH = 15;

export const MAX_ALLOWED_ALIAS_LENGTH = 20;

export const RIPPLED_API_TRANSACTION_RESULT_CODES = {
    tec: "error",
    tef: "error",
    tel: "error",
    tem: "error",
    ter: "error",
    tes: "success",
};

export const ACCOUNT_TYPES = {
    USER: "USER",
    AIRDROP_ACCESS: "AIRDROP_ACCESS",
}