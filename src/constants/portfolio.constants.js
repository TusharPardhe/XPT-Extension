export const PORTFOLIO_HEADER_KEYS = {
    ACCOUNT_DETAILS: "ACCOUNT_DETAILS",
    RESERVES: "RESERVES",
    FUNGIBLE_HOLDINGS: "FUNGIBLE_HOLDINGS",
    OTHER_DETAILS: "OTHER_DETAILS",
    ISSUED_FUNGIBLE_TOKENS: "ISSUED_FUNGIBLE_TOKENS",
    TRANSACTIONS: "TRANSACTIONS",
};

export const PORTFOLIO_INITIAL_STATE = {
    data: {},
    otherCurrencies: [],
    issuedFungibleTokens: {},
    loading: false,
    isOpen: {
        ACCOUNT_DETAILS: true,
        RESERVES: false,
        FUNGIBLE_HOLDINGS: false,
        OTHER_DETAILS: false,
        ISSUED_FUNGIBLE_TOKENS: false,
        TRANSACTIONS: false,
    },
};

export const MAX_TRUSTLINE_SHOW_LIMIT = 50;