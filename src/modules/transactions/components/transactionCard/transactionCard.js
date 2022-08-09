import React from "react";
import dateFormat from "dateformat";
import { Popup } from "semantic-ui-react";

import { MAX_ALLOWED_CARD_VALUE_LENGTH, RIPPLED_API_TRANSACTION_RESULT_CODES } from "../../../../constants/common.constants";
import { copyToClipBoard } from "../../../../utils/common.utils";

import "./transactionCard.scss";

const TransactionCard = ({ transactions, currentTransaction, index, setState }) => {
    const { TransactionType, result, Destination, date, Sequence, Fee, Flags, hash, SigningPubKey, ledger_index, isExpanded } = currentTransaction;

    const onHeaderClick = () => {
        let updatedTransactions = [...transactions];
        updatedTransactions[index].isExpanded = !updatedTransactions[index].isExpanded;
        setState({ transactions: updatedTransactions });
    };

    const popup = (value) => <Popup content="Click to copy" size="mini" inverted trigger={<span className="copy">{value}</span>} />;

    return (
        <div className={`transaction_card ${isExpanded ? "active" : ""}`}>
            <div className="card_header" onClick={onHeaderClick}>
                {TransactionType && (
                    <div className="property">
                        <div className="header">Transaction Type:</div>
                        <div className="value">
                            <span>{TransactionType}</span>
                        </div>
                    </div>
                )}
                {result && (
                    <div className="property">
                        <div className="header">Result:</div>
                        <div className={`value ${RIPPLED_API_TRANSACTION_RESULT_CODES[result.substr(0, 3)]}`}>
                            <span>{result.substr(3)}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="hidden_content">
                <div className="hidden_content_heading">More details</div>
                {Destination && (
                    <div className="property">
                        <div className="header">Destination: </div>
                        <div className="value" onClick={() => copyToClipBoard(Destination)}>
                            <span>{popup(Destination)}</span>
                        </div>
                    </div>
                )}
                {date && (
                    <div className="property">
                        <div className="header">Date: </div>
                        <div className="value">
                            <span>{dateFormat(new Date(date * 1000))}</span>
                        </div>
                    </div>
                )}
                {Sequence && (
                    <div className="property">
                        <div className="header">Sequence: </div>
                        <div className="value">
                            <span>{Sequence}</span>
                        </div>
                    </div>
                )}
                {Fee && (
                    <div className="property">
                        <div className="header">Fee: </div>
                        <div className="value">
                            <span>{Fee / Math.pow(10, 6)} XRP</span>
                        </div>
                    </div>
                )}
                {Flags && (
                    <div className="property">
                        <div className="header">Flags: </div>
                        <div className="value">
                            <span>{Flags}</span>
                        </div>
                    </div>
                )}
                {hash && (
                    <div className="property">
                        <div className="header">Tx Hash: </div>
                        <div className="value" onClick={() => copyToClipBoard(hash)}>
                            {popup(`${hash.slice(0, MAX_ALLOWED_CARD_VALUE_LENGTH)}...`)}
                        </div>
                    </div>
                )}
                {SigningPubKey && (
                    <div className="property">
                        <div className="header">Public Key: </div>
                        <div className="value" onClick={() => copyToClipBoard(SigningPubKey)}>
                            {popup(`${SigningPubKey.slice(0, MAX_ALLOWED_CARD_VALUE_LENGTH)}...`)}
                        </div>
                    </div>
                )}
                {ledger_index && (
                    <div className="property">
                        <div className="header">Ledger Index: </div>
                        <div className="value">
                            <span>{ledger_index}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionCard;
