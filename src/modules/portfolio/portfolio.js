import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { Hashicon } from "@emeraldpay/hashicon-react";

import useMergedState from "../../utils/useMergedState";

import AccountDetails from "./components/accountDetails/accountDetails";
import AccountTrustlines from "./components/accountTrustlines/accountTrustlines";
import TransactionDetails from "./components/transactionDetails/transactionDetails";
import IssuedCurrencies from "./components/issuedCurrencies/issuedCurrencies";
import ShimmerLoader from "../../components/shimmerLoader/shimmerLoader";

import { ROUTES } from "../../constants/common.constants";
import { PORTFOLIO_INITIAL_STATE } from "../../constants/portfolio.constants";
import { getDataFromLocalStrg, saveInLocalStrg } from "../../utils/common.utils";
import { ApiCall } from "../../utils/api.util";

import "./portfolio.scss";

const Portfolio = () => {
    const { id } = useParams();
    const { state: historyState } = useLocation();
    const toastId = useRef(null);
    const navigate = useNavigate();
    const [state, setState] = useMergedState(PORTFOLIO_INITIAL_STATE);
    const { data, otherCurrencies, isOpen, issuedFungibleTokens, loading } = state;
    const xrplPortfolioKeys = getDataFromLocalStrg("xrplPortfolioKeys");
    const storedAddresses = xrplPortfolioKeys ?? {};
    const userName = historyState?.userName ?? storedAddresses[id];
    const isCurrentUser = !!(historyState?.userName);

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const fetchAccountDetails = async () => {
        toastId.current = toast.loading("Fetching account details...");
        setState({ loading: true });

        const payload = {
            method: "POST",
            url: "user/account/details",
            encrypt: true,
            auth: true,
            data: {
                userName: getDataFromLocalStrg("userName"),
                account: id,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    const { dataFromXrpScan: data, otherCurrencies, issuedFungibleTokens } = response.data;
                    setState({ data, otherCurrencies, issuedFungibleTokens });
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
                setState({ loading: false });
            });
    };

    const toggleDetails = (id) => {
        setState({
            isOpen: {
                ...state.isOpen,
                [id]: !isOpen[id],
            },
        });
    }

    const onDeleteClick = () => {

        toastId.current = toast.loading("Deleting account....");

        const payload = {
            method: "POST",
            url: "user/delete/account",
            encrypt: true,
            auth: true,
            data: {
                userName: getDataFromLocalStrg("userName"),
                account: id,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    saveInLocalStrg("xrplPortfolioKeys", response.data.list);
                    navigate(ROUTES.HOME);
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
            });
    }

    return (
        <div className="portfolio_container">
            <PortfolioHeading {...{ id, userName }} />
            {!isCurrentUser && (
                <Button color="red" className="delete_btn" onClick={onDeleteClick}>
                    Remove
                </Button>
            )}
            <div className="details_container">
                {loading ? (
                    <ShimmerLoader />
                ) : (
                    <>
                        <AccountDetails {...{ toggleDetails, isOpen, data }} />
                        <IssuedCurrencies {...{ toggleDetails, isOpen, issuedFungibleTokens }} />
                        <AccountTrustlines {...{ id, toggleDetails, isOpen, otherCurrencies }} />
                        <TransactionDetails {...{ id, navigate }} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Portfolio;

const PortfolioHeading = ({ id, userName }) => {
    return (
        <div className="heading_container">
            <div className="icon">
                <Hashicon value={id} size={50} />
            </div>
            <div className="heading">{userName}</div>
            <div className="sub_heading">{id}</div>
        </div>
    );
}

