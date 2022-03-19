import React, { useState } from "react";

import { Client } from "xrpl";
import { Button, Input } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";

import "./home.component.scss";

const AddAccount = () => {
    const [state, setState] = useState({
        address: "",
        accName: "",
    });

    const { address, accName } = state;
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
            await verifyAndSaveAddress();
        } catch (err) {
            alert(err);
        }
        // XRP TICKER
        // https://api.alternative.me/v2/ticker/ripple/
        
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

    const verifyAndSaveAddress = async () => {
        const client = new Client(PUBLIC_SERVER);
        await client.connect();

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
    };

    return (
        <div className="home_component_container">
            <h1>Welcome!</h1>
            <div className="sub_container">
                <div className="input_container">
                    <Input placeholder="Enter Account Name" onChange={(e) => setState({ ...state, accName: e.target.value })} />
                </div>
                <div className="input_container">
                    <Input placeholder="Enter XRPL Address" onChange={(e) => setState({ ...state, address: e.target.value })} />
                </div>
                <div className="input_btn">
                    <Button onClick={onBtnClick} disabled={accName.length === 0 || address.length === 0}>
                        Add Address
                    </Button>
                </div>
            </div>
            <div>{Object.keys(storedAdd).map((x) => x)}</div>
        </div>
    );
};

export default AddAccount;
