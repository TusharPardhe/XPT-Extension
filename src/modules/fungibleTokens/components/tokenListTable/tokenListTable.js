import './tokenListTable.scss';

import NoResultCard from '../../../../components/NoResultCard/NoResultCard';
import React from 'react';
import TokenCard from '../tokenCard/tokenCard';

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
