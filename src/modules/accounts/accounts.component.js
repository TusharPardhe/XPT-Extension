import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";

import "./accounts.component.scss";

const Accounts = () => {
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
    }

    if (Object.keys(accounts).length === 0) return <div>No accounts found. Head to home page to add an account.</div>;

    return (
        <div className="accounts_component">
            <h2 className="heading">Your Saved Accounts</h2>
            <p>Select your account to view details</p>
            {Object.keys(accounts)?.map((currAccount, index) => (
                <RenderSavedAccount {...{ accounts, currAccount, navigateTo, onDeleteAccClick }} key={index} />
            ))}
        </div>
    );
};

export default Accounts;

function RenderSavedAccount({ accounts, currAccount, navigateTo, onDeleteAccClick }) {
    return (
        <div key={currAccount} className="account_btn">
            <div className="acc_name" onClick={() => navigateTo(currAccount)}>{accounts[currAccount]}</div>
            <Icon name="close" className="icon-close" onClick={() => onDeleteAccClick(currAccount)} />
        </div>
    );
}