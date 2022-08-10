import { FIELD_INITIAL_STATE } from "./common.constants";

export const ADD_ACCOUNTS_INITIAL_STATE = {
    xrplAddress: {
        ...FIELD_INITIAL_STATE,
        loading: false,
    },
    alias: FIELD_INITIAL_STATE,
    isLoading: false,
    showLimitReachedModal: false,
};

export const MAX_ACCOUNT_LIMIT = 10;