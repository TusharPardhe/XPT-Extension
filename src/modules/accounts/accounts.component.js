import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ROUTES } from '../../constants/common.constants';

import "./accounts.component.scss";

const Accounts = () => {

    const accountsFromLocalStorage = localStorage.getItem("xrplPortfolioKeys");
    const accounts = accountsFromLocalStorage ? JSON.parse(accountsFromLocalStorage) : {};

    const navigate = useNavigate();

    const navigateTo = (id) => {
        navigate(ROUTES.PORTFOLIO.replace(":id", id));
    }

    if (Object.keys(accounts).length === 0) return <div>You have not added an account yet. Head to home page to add an account.</div>

    return (
        <div className="accounts_component">
            <h2 className="heading">Your Saved Accounts</h2>
            <p>Select your account to view details</p>
            {Object.keys(accounts).map(x => <Button key={x} className="account_btn" onClick={() => navigateTo(x)}>{accounts[x]}</Button>)}
        </div>
    );
}

export default Accounts;