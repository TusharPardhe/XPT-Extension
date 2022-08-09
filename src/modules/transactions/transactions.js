import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Image } from "semantic-ui-react";
import { toast } from "react-toastify";

import useMergedState from "../../utils/useMergedState";

import XPTLogoImg from "../../assets/svg/xpt.svg";
import BackButton from "../../components/backButton/backButton";
import TransactionList from "./components/transactionList/transactionList";
import { ApiCall } from "../../utils/api.util";
import { getDataFromLocalStrg, redirectToUrl } from "../../utils/common.utils";
import { TRANSACTIONS_INITIAL_STATE, MAX_TRANSACTION_LIMIT } from "../../constants/transactions.constants";
import { URLS } from "../../constants/common.constants";

import "./transactions.scss";

const Transactions = () => {
    const { id } = useParams();
    const [state, setState] = useMergedState({ ...TRANSACTIONS_INITIAL_STATE, account: id });
    const { account, transactions, loading, marker, btnLoading, showLimitReached } = state;
    const toastId = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        toastId.current = toast.loading("Fetching transactions...");

        if (transactions.length === 0) {
            setState({ loading: true });
        }

        const payload = {
            method: "POST",
            url: "user/account/transactions",
            encrypt: true,
            auth: true,
            data: {
                userName: getDataFromLocalStrg("userName"),
                account,
            },
        };

        if (marker) {
            payload.data.marker = marker;
        }

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    const { transactions, marker } = response.data;
                    const values = transactions.map((transaction) => {
                        const { meta, tx } = transaction;
                        return {
                            ...tx,
                            result: meta?.TransactionResult,
                            isExpanded: false,
                        };
                    });
                    setState({ transactions: [...state.transactions, ...values], marker });
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
                setState({ loading: false, btnLoading: false });
            });
    };

    const onLoadMoreClick = () => {
        if (transactions.length < MAX_TRANSACTION_LIMIT) {
            fetchTransactions();
            setState({ btnLoading: true });
        } else {
            setState({ showLimitReached: true });
        }
    };

    const limitReachedBtnClick = () => {
        redirectToUrl(`${URLS.LIVENET}${account}`);
    };

    return (
        <>
            <div className="transactions_container">
                <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
                <div className="transactions_header">
                    <div className="heading">
                        TRANSACTI
                        <Image src={XPTLogoImg} className="logo_img" />
                        NS
                    </div>
                    <div className="sub_heading">Everything is transactional.</div>
                </div>
                <Divider />
                <TransactionList {...{ transactions, loading, setState }} />
                {transactions.length > 0 && !showLimitReached && (
                    <div className="load_more_btn">
                        <Button className="btn" loading={btnLoading} disabled={btnLoading} onClick={onLoadMoreClick}>
                            Load More
                        </Button>
                    </div>
                )}
                {showLimitReached && (
                    <div className="load_more_btn">
                        <Button className="btn" onClick={limitReachedBtnClick}>
                            View more on Livenet
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Transactions;
