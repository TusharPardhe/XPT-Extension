import React, { useState } from "react";

import { Client } from "xrpl";
import useMergedState from "../../utils/useMergedState";
import { Button, Dimmer, Input, Loader } from "semantic-ui-react";
import { PUBLIC_SERVER } from "../../constants/common.constants";
import { HOMEPAGE_INITIAL_STATES } from "../../constants/home.constants";

import "./home.component.scss";

const AddAccount = () => {
    const [state, setState] = useMergedState(HOMEPAGE_INITIAL_STATES);
    const { address, accName, loading } = state;

    const onBtnClick = async () => {
        setState({ loading: true });
        try {
            const xrplAddFromLocal = localStorage.getItem("xrplPortfolioKeys");
            const accountsFromLocalStorage = xrplAddFromLocal ? JSON.parse(xrplAddFromLocal) : {};

            if (accountsFromLocalStorage[address]) {
                alert("This account already exists. Visit Accounts page to check details.");
                return;
            }
            await verifyAndSaveAddress(accountsFromLocalStorage);
        } catch (err) {
            alert(err);
        } finally {
            setState(HOMEPAGE_INITIAL_STATES);
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

    const verifyAndSaveAddress = async (accountsFromLocalStorage) => {
        const client = new Client(PUBLIC_SERVER);
        await client.connect();

        // account information
        const response = await client.request({
            command: "account_info",
            account: address,
        });

        const acc_address = response.result.account_data.Account;
        accountsFromLocalStorage[acc_address] = accName;
        localStorage.setItem("xrplPortfolioKeys", JSON.stringify(accountsFromLocalStorage));
        alert("Great!! Your account has been saved in Accounts section.");
        client.disconnect();
    };

    return (
        <div className="home_component_container">
            <h1>Welcome!</h1>
            <div className="sub_container">
                <div className="input_container">
                    {/* <div className="ui input"><input type="text" placeholder="Enter Account Name" /></div> */}
                    <Input placeholder="Enter Account Name" value={accName} onChange={(e) => setState({ accName: e.target.value })} />
                </div>
                <div className="input_container">
                    <Input placeholder="Enter XRPL Address" value={address} onChange={(e) => setState({ address: e.target.value })} />
                </div>
                <div className="input_btn">
                    <Button onClick={onBtnClick} disabled={accName.length === 0 || address.length === 0}>
                        Add Address
                    </Button>
                </div>
            </div>

            <Dimmer active={loading} inverted>
                <Loader inverted content="Verifying..." inline="centered" />
            </Dimmer>
        </div>
    );
};

export default AddAccount;
