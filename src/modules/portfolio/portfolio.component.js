import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, convertHexToString } from "xrpl";

import useMergedState from "../../utils/useMergedState";

import { Dimmer, Icon, Loader, Table } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";
import { PORTFOLIO_HEADER_KEYS } from "../../constants/portfolio.constants";

import "./portfolio.component.scss";

const Portfolio = () => {
    const { id } = useParams();
    const [state, setState] = useMergedState({
        data: {},
        otherCurrencies: [],
        isOpen: {
            ACCOUNT_DETAILS: false,
            RESERVES: false,
            FUNGIBLE_HOLDINGS: false,
            OTHER_DETAILS: false,
        }
    });
    const { data, otherCurrencies, isOpen } = state;
    const [loading, setLoading] = useState(true);
    const xrplPortfolioKeys = localStorage.getItem("xrplPortfolioKeys");
    const storedAddresses = xrplPortfolioKeys ? JSON.parse(xrplPortfolioKeys) : {};

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const fetchAccountDetails = async () => {
        try {
            const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
            await client.connect();
            console.log("...connecting");

            await fetch(`https://api.xrpscan.com/api/v1/account/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setState({ data: res });
                    console.log(res);
                });

            const account_lines = await client.request({
                command: "account_lines",
                account: id,
            });
            setState({ otherCurrencies: account_lines.result.lines });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDetails = id => setState({
        isOpen: {
            ...state.isOpen,
            [id]: !isOpen[id],
        }
    })

    return (
        <div className="portfolio_container">
            <h3>{storedAddresses[id]}</h3>
            <div className="details_container">
                {Object.keys(data).length > 0 && (
                    <>
                        <div className="account_details">
                            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.ACCOUNT_DETAILS)}>Account Details <Icon name={`caret ${isOpen.ACCOUNT_DETAILS ? "down" : "right"}`} /></div>
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
                            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.RESERVES)}>Reserves <Icon name={`caret ${isOpen.RESERVES ? "down" : "right"}`} /></div>
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
                )}
                {otherCurrencies.length > 0 && (
                    <div className="other_holdings">
                        <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.FUNGIBLE_HOLDINGS)}>Fungible Token Holdings <Icon name={`caret ${isOpen.FUNGIBLE_HOLDINGS ? "down" : "right"}`} /></div>
                        <div className={`transition ${isOpen.FUNGIBLE_HOLDINGS ? "load" : "hide"}`}>
                            <div className="sub_details_header">Total tokens: {otherCurrencies.length}</div>
                            {otherCurrencies.map((token, index) => (
                                <RenderFungibleTokenDetails token={token} key={index} />
                            ))}
                        </div>
                    </div>
                )}
                <div className="transactions_link">
                    <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.OTHER_DETAILS)}>Other Details <Icon name={`caret ${isOpen.OTHER_DETAILS ? "down" : "right"}`} /></div>
                    <div className={`transition ${isOpen.OTHER_DETAILS ? "load" : "hide"}`}>
                        <div className="sub_details_header">View Recent Transactions <Icon name="caret right" /></div>
                    </div>
                </div>
            </div>
            <Dimmer active={loading} inverted>
                <Loader inverted content="Loading..." inline="centered" />
            </Dimmer>
        </div>
    );
};

export default Portfolio;

function RenderFungibleTokenDetails({ token }) {
    const name = convertHexToString(token.currency).replace(/\0.*$/g, "");
    return (
        <Table celled>
            <Table.Row className="token_heading">
                <Table.Cell colSpan="2">{name ? name : token.currency}</Table.Cell>{" "}
            </Table.Row>
            <Table.Body>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Balance
                    </Table.Cell>
                    <Table.Cell>{token.balance}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Issuer
                    </Table.Cell>
                    <Table.Cell>{token.account}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Limit
                    </Table.Cell>
                    <Table.Cell>{token.limit}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}
