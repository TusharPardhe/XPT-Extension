import React from "react";

const SavedAccounts = ({ accounts, navigateTo, onDeleteAccClick }) => {
    return (
        <>
            <h2 className="heading">Welcome aboard explorer</h2>
            <p>Click your preferred account to view details.</p>
            <div className="saved_accounts_grid">
                {Object.keys(accounts).map((currAccount, index) => (
                    <div key={currAccount} className="account_btn">
                        <div className="acc_name" onClick={() => navigateTo(currAccount)}>
                            {accounts[currAccount]}
                        </div>
                        {/* <Icon name="close" className="icon-close" onClick={() => onDeleteAccClick(currAccount)} /> */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SavedAccounts;
