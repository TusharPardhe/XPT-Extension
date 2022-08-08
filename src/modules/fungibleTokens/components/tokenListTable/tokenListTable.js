import React from "react";
import NoResultCard from "../../../../components/noResultCard/noResultCard";
import TokenCard from "../tokenCard/tokenCard";

import "./tokenListTable.scss";

const TokenListTable = ({ list, navigate }) => {
    if (list.length === 0) {
        return <NoResultCard title="No tokens found" />;
    }

    return (
        <div className="fungible_tokens_table">
            {list.map((details, index) => (
                <TokenCard {...{ ...details, navigate }} key={index} />
            ))}
        </div>
    );
};

export default TokenListTable;
