import React from "react";

import TransactionCard from "../transactionCard/transactionCard";

import "./transactionList.scss";

const TransactionList = ({ transactions, setState }) => {

    return (
        <div className="transaction_list_container">
            {transactions.map((currentTransaction, index) =>
                <TransactionCard key={index} {...{ transactions, currentTransaction, index, setState }} />
            )}
        </div>
    );
};

export default TransactionList;
