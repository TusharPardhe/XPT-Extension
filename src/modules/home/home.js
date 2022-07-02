import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NoAddedAccounts from "./components/NoAddedAccounts";
import SavedAccounts from "./components/SavedAccounts";
import UserDetails from "./components/UserDetails";

import { decryptJSON, encryptJSON } from "../../utils/common.utils";
import { ROUTES } from "../../constants/common.constants";
import { ApiCall } from "../../utils/api.util";

import "./home.scss";

const Home = () => {
    const accountsFromLocalStorage = localStorage.getItem("xrplPortfolioKeys");
    const [accounts, setAccounts] = useState(accountsFromLocalStorage ? decryptJSON(accountsFromLocalStorage) : {});
    const toastId = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        onHomePageLoad();
    });

    const navigateTo = (id) => {
        navigate(ROUTES.PORTFOLIO.replace(":id", id));
    };

    const onHomePageLoad = () => {
        if (!(accounts && Object.keys(accounts).length > 0)) {
            const userName = localStorage.getItem("userName");
            const payload = {
                method: "POST",
                url: "user/accounts",
                encrypt: true,
                auth: true,
                data: { userName },
            };
            toastId.current = toast.loading("Fetching saved accounts...");

            ApiCall(payload)
                .then((response) => {
                    if (response.data) {
                        const accountList = response.data.list;
                        setAccounts(accountList);
                        localStorage.setItem("xrplPortfolioKeys", encryptJSON(accountList));
                    }
                })
                .finally(() => {
                    toast.dismiss(toastId.current);
                });
        }
    }

    const onDeleteAccClick = (id) => {
        const acc = { ...accounts };
        delete acc[id];
        setAccounts(acc);
        localStorage.setItem("xrplPortfolioKeys", encryptJSON(acc));
    };

    return (
        <div className="home_component">
            <UserDetails />
            {Object.keys(accounts).length === 0 ? <NoAddedAccounts /> : <SavedAccounts {...{ accounts, navigateTo, onDeleteAccClick }} />}
        </div>
    );
};

export default Home;
