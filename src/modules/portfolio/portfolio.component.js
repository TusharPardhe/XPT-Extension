import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, convertHexToString } from "xrpl";

import useMergedState from "../../utils/useMergedState";

import { Dimmer, Divider, Loader, Table } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";

import "./portfolio.component.scss";

const Portfolio = () => {
    const { id } = useParams();
    const [state, setState] = useMergedState({
        data: {},
        otherCurrencies: [],
    });
    const { data, otherCurrencies } = state;
    const [loading, setLoading] = useState(true);
    const xrplPortfolioKeys = localStorage.getItem("xrplPortfolioKeys");
    const storedAddresses = xrplPortfolioKeys ? JSON.parse(xrplPortfolioKeys) : {};

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const fetchAccountDetails = async () => {
        try {
            const client = new Client(PUBLIC_SERVER);
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

    return (
        <div className="portfolio_container">
            <h3>{storedAddresses[id]}</h3>
            <div className="details_container">
                {Object.keys(data).length > 0 && (
                    <>
                        <div className="account_details">
                            <div className="details_header">Account Details</div>
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
                        <Divider horizontal inverted />
                        <div className="reserve_details">
                            <div className="details_header">Reserves</div>
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
                                            Trustline(s)
                                        </Table.Cell>
                                        <Table.Cell>{data.ownerCount * 2} XRP</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                    </>
                )}
                <Divider horizontal inverted />
                {otherCurrencies.length > 0 && (
                    <div className="other_holdings">
                        <div className="details_header">Fungible Token Holdings</div>
                        <div className="sub_details_header">Total tokens: {otherCurrencies.length}</div>
                        {otherCurrencies.map((token, index) => (
                            <RenderFungibleTokenDetails token={token} key={index} />
                        ))}
                    </div>
                )}
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
