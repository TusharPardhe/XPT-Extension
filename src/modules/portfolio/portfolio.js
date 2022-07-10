import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Client } from "xrpl";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { Hashicon } from "@emeraldpay/hashicon-react";

import useMergedState from "../../utils/useMergedState";

import AccountDetails from "./components/accountDetails";
import AccountTrustlines from "./components/AccountTrustlines";
import OtherDetails from "./components/otherDetails";
import IssuedCurrencies from "./components/issuedCurrencies";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";

import { PUBLIC_SERVER, ROUTES } from "../../constants/common.constants";
import { PORTFOLIO_INITIAL_STATE } from "../../constants/portfolio.constants";
import { decryptJSON, saveAddrsInLocStrg } from "../../utils/common.utils";
import { ApiCall } from "../../utils/api.util";

import "./portfolio.scss";

const Portfolio = () => {
    const { id } = useParams();
    const { state: historyState } = useLocation();
    const toastId = useRef(null);
    const navigate = useNavigate();
    const [state, setState] = useMergedState(PORTFOLIO_INITIAL_STATE);
    const { data, otherCurrencies, isOpen, issuedFungibleTokens } = state;
    const [loading, setLoading] = useState(true);
    const xrplPortfolioKeys = localStorage.getItem("xrplPortfolioKeys");
    const storedAddresses = xrplPortfolioKeys ? decryptJSON(xrplPortfolioKeys) : {};
    const userName = historyState?.userName ?? storedAddresses[id];
    const isCurrentUser = !!(historyState?.userName);

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
                ledger_index: "validated",
            });
            if (response.result.obligations) setState({ issuedFungibleTokens: response.result.obligations });
            await client.disconnect();
        } catch (err) {
            console.log(err);
        }
    };

    const onDeleteClick = () => {

        toastId.current = toast.loading("Deleting account....");

        const payload = {
            method: "POST",
            url: "user/delete/account",
            encrypt: true,
            auth: true,
            data: {
                userName: localStorage.getItem("userName"),
                account: id,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    saveAddrsInLocStrg(response.data.list);
                    if (Object.keys(response.data.list).length === 0) {
                        navigate(ROUTES.HOME);
                    }
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
            });
    }

    return (
        <div className="portfolio_container">
            <div className="icon">
                <Hashicon value={id} size={50} />
            </div>
            <div className="heading">{userName}</div>
            <div className="sub_heading">{id}</div>
            {!isCurrentUser && (<Button color="red" className="delete_btn" onClick={onDeleteClick}>Remove</Button>)}
            <div className="details_container">
                {Object.keys(data).length > 0 && <AccountDetails {...{ toggleDetails, isOpen, data }} />}
                {Object.keys(issuedFungibleTokens).length > 0 && <IssuedCurrencies {...{ toggleDetails, isOpen, issuedFungibleTokens }} />}
                {otherCurrencies.length > 0 && <AccountTrustlines {...{ id, toggleDetails, isOpen, otherCurrencies }} />}
                <OtherDetails {...{ toggleDetails, isOpen }} />
            </div>
            <AnimatedLoader loadingText="Fetching details..." isActive={loading} />
        </div>
    );
};

export default Portfolio;
