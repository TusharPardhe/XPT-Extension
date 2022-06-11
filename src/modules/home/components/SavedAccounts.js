import React from "react";
import { Divider } from "semantic-ui-react";

const SavedAccounts = ({ accounts, navigateTo, onDeleteAccClick }) => {
    return (
        <>
            <h2 className="heading">Welcome aboard explorer</h2>
            <p>Click your preferred account to view details.</p>
            <Divider />
            <div className="saved_accounts_container">
                <div className="table_header">Your saved accounts: </div>
                <div className="accounts_grid">
                    {Object.keys(accounts).map((currAccount, index) => (
                        <div key={currAccount} className="account_btn">
                            <div className="acc_name" onClick={() => navigateTo(currAccount)}>
                                {accounts[currAccount]}
                            </div>
                            {/* <Icon name="close" className="icon-close" onClick={() => onDeleteAccClick(currAccount)} /> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SavedAccounts;
