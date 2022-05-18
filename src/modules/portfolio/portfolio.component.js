import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "xrpl";

import useMergedState from "../../utils/useMergedState";

import AccountDetails from "./components/accountDetails";
import AccountFungibleHoldings from "./components/accountFungibleHoldings";
import OtherDetails from "./components/otherDetails";
import IssuedCurrencies from "./components/issuedCurrencies";

import { Dimmer, Loader } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";

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
            const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
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
            <h3 className="heading">{storedAddresses[id]}</h3>
            <div className="sub_heading">{id}</div>
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