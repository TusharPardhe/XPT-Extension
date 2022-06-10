import React from "react";
import { Button, Input } from "semantic-ui-react";
import { Client } from "xrpl";
import { NO_ACCOUNTS_INITIAL_STATE, PUBLIC_SERVER } from "../../../../constants/common.constants";
import useMergedState from "../../../../utils/useMergedState";
import { isValidXrplRAddress } from "../../../../utils/validations";

import "./noSavedAccounts.scss";

const NoSavedAccounts = () => {
    const [state, setState] = useMergedState(NO_ACCOUNTS_INITIAL_STATE);
    const { isEnterBtnPressed, xrplAddress, alias } = state;

    const validateXRPAccount = async () => {
        setState({
            xrplAddress: {
                ...xrplAddress,
                loading: true,
            },
        });
        const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
        await client.connect();
        try {
            const payload = {
                command: "account_info",
                account: xrplAddress.inputValue,
            };

            const res = await client.request(payload);
            if (res && res.result.account_data.Account === xrplAddress.inputValue) {
                setState({
                    xrplAddress: {
                        ...xrplAddress,
                        value: xrplAddress.inputValue,
                        loading: false,
                        error: false,
                    },
                });
            } else {
                setState({
                    xrplAddress: { ...xrplAddress, error: true, loading: false },
                });
            }
        } catch (err) {
            setState({
                xrplAddress: { ...xrplAddress, error: true, loading: false },
            });
            console.log(err);
        }
        client.disconnect();
    };

    const onXrplAddressChange = (event) => {
        setState({
            xrplAddress: {
                ...xrplAddress,
                value: "",
                inputValue: event.target.value,
                error: false,
            },
            alias: NO_ACCOUNTS_INITIAL_STATE.alias,
        });
    };

    const onAliasValueChange = (event) => {
        setState({ alias: { ...alias, value: "", inputValue: event.target.value, error: false } });
    };

    const isErrorXrplAddInput = !isValidXrplRAddress(xrplAddress.inputValue) || xrplAddress.error;

    return (
        <div className="no_saved_container">
            <div className="heading">Welcome aboard explorer</div>
            {!isEnterBtnPressed ? (
                <>
                    <div className="subHeading">
                        Your inventory is empty.
                        <br />
                        Press the button below to begin tracking an XRPL account
                    </div>
                    <Button inverted color="blue" onClick={() => setState({ isEnterBtnPressed: true })}>
                        Enter
                    </Button>
                </>
            ) : (
                <div className="track_details_container">
                    <div className="xrpl_details_box_heading">Enter details:</div>
                    <div className="input_details">
                        <Input
                            placeholder="r....."
                            label={{ content: "Address: " }}
                            value={xrplAddress.inputValue}
                            labelPosition="left"
                            onChange={onXrplAddressChange}
                            error={xrplAddress.error}
                        />
                        {xrplAddress.value.length > 0 && !xrplAddress.error ? (
                            <>
                                <Input
                                    placeholder="Enter alias.."
                                    label={{ content: "Alias: " }}
                                    labelPosition="left"
                                    value={alias.inputValue}
                                    onChange={onAliasValueChange}
                                />
                                <Button type="submit" color="green" inverted>
                                    Submit
                                </Button>
                            </>
                        ) : (
                            <Button
                                inverted
                                color={isErrorXrplAddInput ? "grey" : "green"}
                                type="submit"
                                onClick={validateXRPAccount}
                                disabled={isErrorXrplAddInput}
                                loading={xrplAddress.loading}
                            >
                                Validate
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoSavedAccounts;
