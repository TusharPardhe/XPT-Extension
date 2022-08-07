import React from "react";

import useMergedState from "../../../../utils/useMergedState";

import TransactionCard from "../transactionCard/transactionCard";

import "./transactionList.scss";

const TransactionList = () => {
    const [state, setState] = useMergedState({ isTouched: false });
    const { isTouched } = state;
    const copyToClipBoard = (value) => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className="transaction_list_container">
            <TransactionCard {...{ isTouched, setState, copyToClipBoard }} />
            <TransactionCard {...{ isTouched, setState, copyToClipBoard }} />
        </div>
    );
};

export default TransactionList;
