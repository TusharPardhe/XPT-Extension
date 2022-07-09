import React from "react";

import useMergedState from "../../utils/useMergedState";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import NewAccountDetailsInputs from "./components/newAccountDetailsInputs";
import { ADD_ACCOUNTS_INITIAL_STATE } from "../../constants/common.constants";

import "./addAccount.scss";

const AddAccount = () => {
    const [state, setState] = useMergedState(ADD_ACCOUNTS_INITIAL_STATE);
    const { isLoading } = state;

    return (
        <div className="add_account">
            <NewAccountDetailsInputs {...{ state, setState }} />
            <AnimatedLoader loadingText={"Saving...."} isActive={isLoading} />
        </div>
    );
};

export default AddAccount;
