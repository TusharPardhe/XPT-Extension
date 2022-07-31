import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { PORTFOLIO_HEADER_KEYS } from '../../../../constants/portfolio.constants';

const TransactionDetails = ({ isOpen, toggleDetails }) => {
    return (
        <div className="transaction_details">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.TRANSACTIONS)}>
                Transactions <Icon name={`caret ${isOpen.TRANSACTIONS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.TRANSACTIONS ? "load" : "hide"}`}>
                {/* {Object.keys(issuedFungibleTokens).map((tokenName, index) => (
                    <Table celled key={index}>
                        <Table.Body>
                            <Table.Row key={`${tokenName}_${index}`}>
                                <Table.Cell className="table_heading">Name</Table.Cell>
                                <Table.Cell>{tokenName.length === 40 ? convertHexToString(tokenName).replaceAll("\u0000", "") : tokenName}</Table.Cell>
                            </Table.Row>
                            <Table.Row key={`${issuedFungibleTokens[tokenName]}_${index}`}>
                                <Table.Cell className="table_heading">Amount</Table.Cell>
                                <Table.Cell>{parseFloat(issuedFungibleTokens[tokenName]).toLocaleString()}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                ))} */}
            </div>
        </div>
    );
}

export default TransactionDetails;