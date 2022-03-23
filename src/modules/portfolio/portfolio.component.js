import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, convertHexToString } from "xrpl";

import useMergedState from "../../utils/useMergedState";

import { Dimmer, Icon, Label, Loader, Table } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";
import { PORTFOLIO_HEADER_KEYS } from "../../constants/portfolio.constants";

import "./portfolio.component.scss";

const Portfolio = () => {
    const { id } = useParams();
    const [state, setState] = useMergedState({
        data: {},
        otherCurrencies: [],
        issuedFungibleTokens: {},
        isOpen: {
            ACCOUNT_DETAILS: false,
            RESERVES: false,
            FUNGIBLE_HOLDINGS: false,
            OTHER_DETAILS: false,
            ISSUED_FUNGIBLE_TOKENS: false,
        },
    });
    const { data, otherCurrencies, isOpen, issuedFungibleTokens } = state;
    const [loading, setLoading] = useState(true);
    const xrplPortfolioKeys = localStorage.getItem("xrplPortfolioKeys");
    const storedAddresses = xrplPortfolioKeys ? JSON.parse(xrplPortfolioKeys) : {};

    useEffect(() => {
        fetchAccountDetails();
        fetchIssuedBalances();
    }, []);

    const fetchAccountDetails = async () => {
        try {
            const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
            await client.connect();

            await fetch(`https://api.xrpscan.com/api/v1/account/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setState({ data: res });
                });

            const account_lines = await client.request({
                command: "account_lines",
                account: id,
            });
            setState({ otherCurrencies: account_lines.result.lines });
            await client.disconnect();
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDetails = (id) =>
        setState({
            isOpen: {
                ...state.isOpen,
                [id]: !isOpen[id],
            },
        });

    const fetchIssuedBalances = async () => {
        try {
            const client = new Client(PUBLIC_SERVER);
            await client.connect();
            const response = await client.request({
                command: "gateway_balances",
                account: id,
                "ledger_index": "validated"
            });
            if (response.result.obligations) setState({ issuedFungibleTokens: response.result.obligations });
            await client.disconnect();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="portfolio_container">
            <h3>{storedAddresses[id]}</h3>
            <div className="details_container">
                {Object.keys(data).length > 0 && <AccountDetails {...{ toggleDetails, isOpen, data, otherCurrencies }} />}
                {otherCurrencies.length > 0 && <AccountFungibleHoldings {...{ toggleDetails, isOpen, otherCurrencies }} />}
                {Object.keys(issuedFungibleTokens).length > 0 && <IssuedCurrencies {...{ toggleDetails, isOpen, issuedFungibleTokens }} />}
                <OtherDetails {...{ toggleDetails, isOpen }} />
            </div>
            <Dimmer active={loading} inverted>
                <Loader inverted content="Loading..." inline="centered" />
            </Dimmer>
        </div>
    );
};

export default Portfolio;


function AccountDetails({ toggleDetails, isOpen, data, otherCurrencies }) {
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

function AccountFungibleHoldings({ toggleDetails, isOpen, otherCurrencies }) {
    return (
        <div className="other_holdings">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.FUNGIBLE_HOLDINGS)}>
                Fungible Token Holdings <Icon name={`caret ${isOpen.FUNGIBLE_HOLDINGS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.FUNGIBLE_HOLDINGS ? "load" : "hide"}`}>
                <div className="sub_details_header">Total tokens: {otherCurrencies.length}</div>
                {otherCurrencies.map((token, index) => (
                    <RenderFungibleTokenDetails token={token} key={index} />
                ))}
            </div>
        </div>
    );
}

function RenderFungibleTokenDetails({ token }) {
    const name = token.currency.length === 40 ? convertHexToString(token.currency) : token.currency;

    return (
        <Table celled>
            <Table.Row className="token_heading">
                <Table.Cell colSpan="2"><Label ribbon>{name}</Label></Table.Cell>
            </Table.Row>
            <Table.Body>
                <Table.Row>
                    <Table.Cell collapsing className="table_heading">
                        Balance
                    </Table.Cell>
                    <Table.Cell>{parseFloat(token.balance).toFixed(6).toLocaleString()}</Table.Cell>
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
};

function OtherDetails(toggleDetails, isOpen) {
    return <div className="transactions_link">
        <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.OTHER_DETAILS)}>
            Other Details <Icon name={`caret ${isOpen.OTHER_DETAILS ? "down" : "right"}`} />
        </div>
        <div className={`transition ${isOpen.OTHER_DETAILS ? "load" : "hide"}`}>
            <div className="sub_details_header">
                View Recent Transactions <Icon name="caret right" />
            </div>
        </div>
    </div>;
};

function IssuedCurrencies({ toggleDetails, isOpen, issuedFungibleTokens }) {
    return <div className="issued_tokens_container">
        <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.ISSUED_FUNGIBLE_TOKENS)}>
            Issued Fungible Tokens <Icon name={`caret ${isOpen.ISSUED_FUNGIBLE_TOKENS ? "down" : "right"}`} />
        </div>
        <div className={`transition ${isOpen.ISSUED_FUNGIBLE_TOKENS ? "load" : "hide"}`}>
            <Table celled>
                <Table.Body>
                    {Object.keys(issuedFungibleTokens).map(tokenName => (
                        <Table.Row>
                            <Table.Cell collapsing className="table_heading">
                                {tokenName}
                            </Table.Cell>
                            <Table.Cell>{parseFloat(issuedFungibleTokens[tokenName]).toLocaleString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    </div>;
};