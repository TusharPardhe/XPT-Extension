import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";
import NoSavedAccounts from './components/noSavedAccounts/noSavedAccounts';

import "./home.scss";

const Home = () => {
    const accountsFromLocalStorage = localStorage.getItem("xrplPortfolioKeys");
    const [accounts, setAccounts] = useState(accountsFromLocalStorage ? JSON.parse(accountsFromLocalStorage) : {});

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
            {Object.keys(accounts).length === 0 ? <NoSavedAccounts /> : <SavedAccounts {...{ accounts, navigateTo, onDeleteAccClick }} />}
        </div>
    );
};

export default Home;

function SavedAccounts({ accounts, navigateTo, onDeleteAccClick }) {
    return (
        <>
            <h2 className="heading">Welcome!</h2>
            <p>Select your account to view details</p>
            <div className="saved_accounts_grid">
                {Object.keys(accounts).map((currAccount, index) => (
                    <div key={currAccount} className="account_btn">
                        <div className="acc_name" onClick={() => navigateTo(currAccount)}>{accounts[currAccount]}</div>
                        {/* <Icon name="close" className="icon-close" onClick={() => onDeleteAccClick(currAccount)} /> */}
                    </div>
                ))}
            </div>
        </>
    );
};