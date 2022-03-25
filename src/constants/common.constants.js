export const ROUTES = {
    HOME: "/",
    ACCOUNTS: "/accounts",
    PORTFOLIO: "/portfolio/:id",
    TRANSACTIONS: "/transactions/:id",
    XRP_DETAILS: "/price",
    NFT_DETAILS: "/nft",
    USEFUL_LINKS: "/links"
};

export const DEV_ENV = process.env.NODE_ENV === "development";

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";
