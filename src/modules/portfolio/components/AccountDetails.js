import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { PORTFOLIO_HEADER_KEYS } from "../../../constants/portfolio.constants";

export default function AccountDetails({ toggleDetails, isOpen, data, otherCurrencies }) {
    return (
        <>
            <div className="account_details">
                <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.ACCOUNT_DETAILS)}>
                    Account Details <Icon name={`caret ${isOpen.ACCOUNT_DETAILS ? "down" : "right"}`} />
                </div>
                <div className={`transition ${isOpen.ACCOUNT_DETAILS ? "load" : "hide"}`}>
                    <Table celled padded>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Balance
                                </Table.Cell>
                                <Table.Cell>{data.xrpBalance} XRP</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Initial Balance
                                </Table.Cell>
                                <Table.Cell>{data.initial_balance} XRP</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Parent Account
                                </Table.Cell>
                                <Table.Cell>{data.parent}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Activation Date
                                </Table.Cell>
                                <Table.Cell>{new Date(data.inception).toString()}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <div className="reserve_details">
                <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.RESERVES)}>
                    Reserves <Icon name={`caret ${isOpen.RESERVES ? "down" : "right"}`} />
                </div>
                <div className={`transition ${isOpen.RESERVES ? "load" : "hide"}`}>
                    <div className="sub_details_header">{10 + data.ownerCount * 2} XRP</div>
                    <Table celled padded>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Activation
                                </Table.Cell>
                                <Table.Cell>10 XRP</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    {otherCurrencies.length > 0 ? "Trustline(s)" : "Others"}
                                </Table.Cell>
                                <Table.Cell>{data.ownerCount * 2} XRP</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}
