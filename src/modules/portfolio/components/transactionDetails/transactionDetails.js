import React from 'react';
import { Icon } from "semantic-ui-react";
import { ROUTES } from "../../../../constants/common.constants";

const TransactionDetails = ({ id, navigate }) => {
    const onHeadingClick = () => {
        navigate(ROUTES.TRANSACTIONS.replace(":id", id));
    };

    return (
        <div className="transaction_details">
            <div className="details_header" onClick={onHeadingClick}>
                Transactions <Icon name="caret right" />
            </div>
        </div>
    );
};

export default TransactionDetails;