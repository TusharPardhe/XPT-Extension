export const PORTFOLIO_HEADER_KEYS = {
    ACCOUNT_DETAILS: "ACCOUNT_DETAILS",
    RESERVES: "RESERVES",
    FUNGIBLE_HOLDINGS: "FUNGIBLE_HOLDINGS",
    OTHER_DETAILS: "OTHER_DETAILS",
    ISSUED_FUNGIBLE_TOKENS: "ISSUED_FUNGIBLE_TOKENS",
};

export const PORTFOLIO_INITIAL_STATE = {
    data: {},
    otherCurrencies: [],
    issuedFungibleTokens: {},
    isOpen: {
        ACCOUNT_DETAILS: true,
        RESERVES: false,
        FUNGIBLE_HOLDINGS: false,
        OTHER_DETAILS: false,
        ISSUED_FUNGIBLE_TOKENS: false,
    },
};