export const ROUTES = {
    HOME: "/",
    ACCOUNTS: "/accounts",
    PORTFOLIO: "/portfolio/:id",
    TRANSACTIONS: "/transactions/:id",
    XRP_DETAILS: "/price",
    NFT_DETAILS: "/nft",
    USEFUL_LINKS: "/links",
    PROJECT_CALENDAR: "/calendar"
};

export const DEV_ENV = process.env.NODE_ENV === "development";

export const PUBLIC_SERVER = "wss://xrplcluster.com/";

export const ALTERNATIVE_ME_API_ENDPOINT = "https://api.alternative.me/v2/ticker/ripple/";

export const URLS = {
    XRP_ICON: "https://drive.google.com/uc?export=view&id=1VUSemYB5GqRNihGVELTrlcW3VObhhn0-",
    CONSTRUCTION_GIF: "https://drive.google.com/uc?export=view&id=1219VV9-YnQBRiPnSFz2WjTULg6J0vdNc"
}