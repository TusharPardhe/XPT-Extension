export const AIRDROPS_INITIAL_STATE = {
    date: new Date(),
    activePage: 1,
    totalPages: 0,
    totalCount: 0,
    limit: 4,
    loading: true,
    list: [],
};

export const AIRDROP_REGISTRATION_INITIAL_STATE = {
    loading: true,
    message: "",
    projectName: { value: "", error: [] },
    currencyName: { value: "", error: [] },
    date: { value: new Date(), error: [] },
    description: { value: "", error: [] },
    logo: { value: "", error: [] },
    twitter: { value: "", error: [] },
    discord: { value: "", error: [] },
    website: { value: "", error: [] },
    linktree: { value: "", error: [] },
    others: { value: "", error: [] },
    ticker: { value: "", error: [], options: [] },
};