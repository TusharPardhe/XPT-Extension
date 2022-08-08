import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Image } from "semantic-ui-react";
import { toast } from "react-toastify";

import useMergedState from "../../utils/useMergedState";

import XPTLogoImg from "../../assets/svg/xpt.svg";
import BackButton from "../../components/backButton/backButton";
import TransactionList from "./components/transactionList/transactionList";
import { ApiCall } from "../../utils/api.util";
import { getDataFromLocalStrg } from "../../utils/common.utils";
import { TRANSACTIONS_INITIAL_STATE } from "../../constants/transactions.constants";

import "./transactions.scss";

const Transactions = () => {
    const location = useLocation();
    const [state, setState] = useMergedState({ ...TRANSACTIONS_INITIAL_STATE, ...location.state });
    const { account, transactions } = state;
    const toastId = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, [location.state]);

    const fetchTransactions = () => {
        toastId.current = toast.loading("Fetching transactions...");

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

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    const { transactions } = response.data;
                    const values = transactions.map((transaction) => {
                        const { meta, tx } = transaction;
                        return {
                            ...tx,
                            result: meta?.TransactionResult,
                            isExpanded: false,
                        }
                    });
                    setState({ transactions: values });
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
            });
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
                <TransactionList {...{ transactions, setState }} />
            </div>
        </>
    );
};

export default Transactions;
