import React, { useState } from "react";

import { Button, Input } from "semantic-ui-react";

import "./home.component.scss";

const xrpl = require("xrpl");

const AddAccount = () => {
    const [state, setState] = useState({
        address: "",
        accName: ""
    })

    const { address, accName } = state;

    const PUBLIC_SERVER = "wss://s2.ripple.com/";
    const keys = localStorage.getItem("xrplPortfolioKeys");
    const [storedAdd, setStoredAdd] = useState(keys ? JSON.parse(keys) : {});

    const onBtnClick = async () => {
        try {
            const xrplAddFromLocal = localStorage.getItem("xrplPortfolioKeys");
            const accountsFromLocalStorage = xrplAddFromLocal ? JSON.parse(xrplAddFromLocal) : {};

            if (accountsFromLocalStorage[address]) {
                alert("This account already exists");
                return;
            }

            const client = new xrpl.Client(PUBLIC_SERVER);
            await client.connect();
            console.log("...connecting");

            // account information
            const response = await client.request({
                command: "account_info",
                account: address,
            });

            const acc_address = response.result.account_data.Account;

            accountsFromLocalStorage[acc_address] = accName;
            setStoredAdd(accountsFromLocalStorage);
            localStorage.setItem("xrplPortfolioKeys", JSON.stringify(accountsFromLocalStorage));

            client.disconnect();
        } catch (err) {
            alert(err);
        }

        // trustlines, and all currency data
        // const response = await client.request({
        //     id: 1,
        //     command: "account_lines",
        //     account: address,
        // });

        // Last transactions
        // const response = await client.request({
        //     command: "account_tx",
        //     account: address,
        //     ledger_index_min: -1,
        //     ledger_index_max: -1,
        //     binary: false,
        //     limit: 5,
        //     forward: false,
        // });
    };

    return (
        <div className="home_component_container">
            <h1>Welcome!</h1>
            <div className="sub_container">
                <div className="input_container"><Input placeholder="Enter Account Name" onChange={(e) => setState({ ...state, accName: e.target.value })} /></div>
                <div className="input_container"><Input placeholder="Enter XRPL Address" onChange={(e) => setState({ ...state, address: e.target.value })} /></div>
                <div className="input_btn"><Button onClick={onBtnClick} disabled={accName.length === 0 || address.length === 0}>Add Address</Button></div>
            </div>
            <div>{Object.keys(storedAdd).map(x => x)}</div>
        </div>
    );
};

export default AddAccount;
