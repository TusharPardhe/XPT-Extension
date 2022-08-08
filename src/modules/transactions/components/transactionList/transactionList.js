import React from "react";
import ShimmerLoader from "../../../../components/shimmerLoader/shimmerLoader";

import TransactionCard from "../transactionCard/transactionCard";

import "./transactionList.scss";

const TransactionList = ({ transactions, loading, setState }) => {
    return (
        <div className="transaction_list_container">
            {loading ? (
                <ShimmerLoader />
            ) : (
                transactions.map((currentTransaction, index) => (
                    <TransactionCard key={index} {...{ transactions, currentTransaction, index, setState }} />
                ))
            )}
        </div>
    );
};

export default TransactionList;