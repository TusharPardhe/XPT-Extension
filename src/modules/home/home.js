import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import NoAddedAccounts from "./components/NoAddedAccounts";
import SavedAccounts from "./components/SavedAccounts";

import { ROUTES } from "../../constants/common.constants";

import "./home.scss";

const Home = () => {
    const accountsFromLocalStorage = localStorage.getItem("xrplPortfolioKeys");
    const [accounts, setAccounts] = useState(accountsFromLocalStorage ? JSON.parse(accountsFromLocalStorage) : {});
    const [enterBtnHover, setEnterBtnHover] = useState(true);

    const navigate = useNavigate();

    const navigateTo = (id) => {
        navigate(ROUTES.PORTFOLIO.replace(":id", id));
    };

    const onDeleteAccClick = (id) => {
        const acc = { ...accounts };
        delete acc[id];
        setAccounts(acc);
        localStorage.setItem("xrplPortfolioKeys", JSON.stringify(acc));
    };

    // if (Object.keys(accounts).length === 0) return <div>No accounts found. Head to home page to add an account.</div>;

    return (
        <div className="home_component">
            {Object.keys(accounts).length === 0 ? (
                <NoAddedAccounts {...{ enterBtnHover, setEnterBtnHover, navigate }} />
            ) : (
                <SavedAccounts {...{ accounts, navigateTo, onDeleteAccClick }} />
            )}
        </div>
    );
};

export default Home;