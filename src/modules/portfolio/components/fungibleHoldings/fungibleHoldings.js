import React from "react";
import { convertHexToString } from "xrpl";
import { Label, Table } from "semantic-ui-react";

const FungibleHoldings = ({ token }) => {
    const name = token.currency.length === 40 ? convertHexToString(token.currency).replaceAll("\u0000", "") : token.currency;
    return (
        <Table celled>
            <Table.Body>
                <Table.Row className="token_heading">
                    <Table.Cell colSpan="2">
                        <Label ribbon>{name}</Label>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Balance
                    </Table.Cell>
                    <Table.Cell>{parseFloat(token.balance).toLocaleString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Account
                    </Table.Cell>
                    <Table.Cell>{token.account}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Limit
                    </Table.Cell>
                    <Table.Cell>{parseFloat(token.limit).toLocaleString()}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default FungibleHoldings;
