import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { URLS } from "../../../constants/common.constants";
import { PORTFOLIO_HEADER_KEYS } from "../../../constants/portfolio.constants";
import { redirectToUrl } from "../../../utils/common.utils";

export default function AccountDetails({ toggleDetails, isOpen, data }) {
    return (
        <>
            <div className="account_details">
                <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.ACCOUNT_DETAILS)}>
                    Account Details <Icon name={`caret ${isOpen.ACCOUNT_DETAILS ? "down" : "right"}`} />
                </div>
                <div className={`transition ${isOpen.ACCOUNT_DETAILS ? "load" : "hide"}`}>
                    <Table celled padded>
                        <Table.Body>
                            {data.accountName && (
                                <>
                                    {data.accountName.name && (
                                        <Table.Row>
                                            <Table.Cell collapsing className="table_heading">
                                                Name
                                            </Table.Cell>
                                            <Table.Cell>{data.accountName.name}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {data.accountName.domain && (
                                        <Table.Row>
                                            <Table.Cell collapsing className="table_heading">
                                                Website
                                            </Table.Cell>
                                            <Table.Cell className="url_link" onClick={() => redirectToUrl(`https://www.${data.accountName.domain}`)}>
                                                {data.accountName.domain}
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                    {data.accountName.twitter && (
                                        <Table.Row>
                                            <Table.Cell collapsing className="table_heading">
                                                Twitter
                                            </Table.Cell>
                                            <Table.Cell
                                                className="url_link"
                                                onClick={() => redirectToUrl(`${URLS.TWITTER}${data.accountName.twitter}`)}
                                            >{`@${data.accountName.twitter}`}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </>
                            )}
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Balance
                                </Table.Cell>
                                <Table.Cell>{parseFloat(data.xrpBalance).toLocaleString()} XRP</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    Initial Balance
                                </Table.Cell>
                                <Table.Cell>{parseFloat(data.initial_balance).toLocaleString()} XRP</Table.Cell>
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
                                    Other(s)
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
