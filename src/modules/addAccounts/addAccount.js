import React from "react";

import useMergedState from "../../utils/useMergedState";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import NewAccountDetailsInputs from "./components/newAccountDetailsInputs";
import AccountAdditionSuccess from "./components/accountAdditionSuccess";

import { isValidXrplRAddress } from "../../utils/validations";
import { ADD_ACCOUNTS_INITIAL_STATE } from "../../constants/common.constants";

import "./addAccount.scss";
import { decryptJSON, encryptJSON } from "../../utils/common.utils";

const AddAccount = () => {
    const [state, setState] = useMergedState(ADD_ACCOUNTS_INITIAL_STATE);
    const { xrplAddress, alias, isLoading, hasAccountAdded } = state;

    const xrplAddFromLocal = localStorage.getItem("xrplPortfolioKeys");
    const accountsFromLocalStorage = xrplAddFromLocal ? decryptJSON(xrplAddFromLocal) : {};

    const onXrplAddressChange = (event) => {
        const { value } = event.target;
        let error = [];

        if (accountsFromLocalStorage[value]) {
            error.push("Entered account already exists.");
        }

        setState({
            xrplAddress: {
                ...xrplAddress,
                value: "",
                inputValue: value,
                error: error,
            },
            alias: ADD_ACCOUNTS_INITIAL_STATE.alias,
        });
    };

    const onAliasValueChange = (event) => {
        const { value } = event.target;
        let error = [];

        if (Object.values(accountsFromLocalStorage).indexOf(value) > -1) {
            error.push("This nickname already exists. Please choose a different one.");
        }
        setState({ alias: { ...alias, value: "", inputValue: value, error: error } });
    };

    const verifyAndSaveAddress = () => {
        // API Call to MongoDB
        accountsFromLocalStorage[xrplAddress.value] = alias.inputValue;
        localStorage.setItem("xrplPortfolioKeys", encryptJSON(accountsFromLocalStorage));
        setState({ ...ADD_ACCOUNTS_INITIAL_STATE, hasAccountAdded: true });
        alert("Great!! Your account has been saved in Accounts section.");
    };

    const isErrorXrplAddInput = !isValidXrplRAddress(xrplAddress.inputValue) || xrplAddress.error.length > 0;

    return (
        <div className="add_account">
            <div className="heading">{hasAccountAdded ? "Awesome! 🎉" : `Hi! @userName`}</div>
            {hasAccountAdded ? (
                <AccountAdditionSuccess {...{ state, setState }} />
            ) : (
                <NewAccountDetailsInputs
                    {...{ state, setState, onXrplAddressChange, onAliasValueChange, verifyAndSaveAddress, isErrorXrplAddInput }}
                />
            )}
            <AnimatedLoader loadingText={"Saving...."} isActive={isLoading} />
        </div>
    );
};

export default AddAccount;
