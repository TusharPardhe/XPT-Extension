import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Image, Input } from "semantic-ui-react";

import XPTLogoImg from "../../../assets/svg/xpt.svg";
import { isValidValue, isValidXrplRAddress } from "../../../utils/validations";
import { getDataFromLocalStrg, saveInLocalStrg } from "../../../utils/common.utils";
import { MAX_ALLOWED_ALIAS_LENGTH, ROUTES, VALIDATION_REGEX } from "../../../constants/common.constants";
import { ApiCall } from "../../../utils/api.util";
import { ADD_ACCOUNTS_INITIAL_STATE } from "../../../constants/addAccounts.constants";

const NewAccountDetailsInputs = ({ state, setState }) => {
    const { xrplAddress, alias } = state;
    const toastId = useRef(null);
    const navigate = useNavigate();

    const xrplAddFromLocal = getDataFromLocalStrg("xrplPortfolioKeys");
    const currentUserAccount = getDataFromLocalStrg("xrplAddress");
    const accountsFromLocalStorage = xrplAddFromLocal ?? {};

    const isErrorXrplAddInput = !isValidXrplRAddress(xrplAddress.inputValue) || xrplAddress.error.length > 0;

    const onAliasValueChange = (event) => {
        const { value } = event.target;

        if (value.length < MAX_ALLOWED_ALIAS_LENGTH) {
            let { error } = isValidValue(value, undefined, VALIDATION_REGEX.ALPHABETS_WITH_TRAILING_SPACES);
            if (Object.values(accountsFromLocalStorage).indexOf(value) > -1) {
                error.push("This nickname already exists. Please choose a different one.");
            }
            setState({ alias: { ...alias, value: "", inputValue: value, error: error } });
        }
    };

    const onXrplAddressChange = (event) => {
        const { value } = event.target;
        let error = [];

        if (accountsFromLocalStorage[value] || value === currentUserAccount) {
            error.push("Entered account already exists.");
        }

        setState({
            xrplAddress: {
                ...xrplAddress,
                value: "",
                inputValue: value,
                error: error,
            },
            alias: ADD_ACCOUNTS_INITIAL_STATE.alias,
        });
    };

    const verifyAndSaveAddress = () => {
        toastId.current = toast.loading("Sending details...");

        const payload = {
            method: "POST",
            url: "user/save/accounts",
            encrypt: true,
            auth: true,
            data: {
                userName: getDataFromLocalStrg("userName"),
                accounts: {
                    [xrplAddress.value]: alias.inputValue,
                },
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    accountsFromLocalStorage[xrplAddress.value] = alias.inputValue;
                    saveInLocalStrg("xrplPortfolioKeys", accountsFromLocalStorage);
                    navigate(ROUTES.REQUEST_SUCCESS);
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
            });
    };

    const validateXRPAccountFromAPI = async ({ setState, xrplAddress }) => {
        setState({
            xrplAddress: {
                ...xrplAddress,
                loading: true,
            },
        });

        try {
            const res = await fetch(`https://api.xrpscan.com/api/v1/account/${xrplAddress.inputValue}`).then((res) => res.json());
            if (res && res.account === xrplAddress.inputValue && !res.error) {
                setState({
                    xrplAddress: {
                        ...xrplAddress,
                        value: xrplAddress.inputValue,
                        loading: false,
                        error: [],
                    },
                });
            } else {
                setState({
                    xrplAddress: { ...xrplAddress, error: ["Invalid Input, please try again."], loading: false },
                });
            }
        } catch (err) {
            setState({
                xrplAddress: { ...xrplAddress, error: ["Invalid Input, please try again."], loading: false },
            });
            console.log(err);
        }
    };

    return (
        <div className="track_details_container">
            <div className="heading_container">
                <div className="track_heading">
                    <Image src={XPTLogoImg} className="logo_img" />
                    PT
                </div>
                <div className="sub_heading">Track XRPL accounts</div>
            </div>
            <Divider />
            <div className="input_details">
                <div className="xrpl_details_box_heading">Enter account details:</div>
                <Input
                    placeholder="r....."
                    label={{ content: "Address: " }}
                    value={xrplAddress.inputValue}
                    labelPosition="left"
                    onChange={onXrplAddressChange}
                    error={xrplAddress.error.length > 0}
                />
                <i className="error_txt">{xrplAddress.error[0]}</i>
                {xrplAddress.value.length > 0 && xrplAddress.error.length === 0 ? (
                    <>
                        <Input
                            placeholder="Enter alias.."
                            label={{ content: "Alias: " }}
                            labelPosition="left"
                            value={alias.inputValue}
                            onChange={onAliasValueChange}
                            error={alias.error.length > 0}
                        />
                        <i className="error_txt">{alias.error[0]}</i>
                        <div className="btn_container">
                            <Button
                                type="submit"
                                color="green"
                                disabled={alias.error.length > 0 || alias.inputValue.length === 0}
                                inverted
                                onClick={verifyAndSaveAddress}
                            >
                                Submit
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="btn_container">
                        <Button
                            inverted
                            color={isErrorXrplAddInput ? "grey" : "green"}
                            type="submit"
                            onClick={() => validateXRPAccountFromAPI({ setState, xrplAddress })}
                            disabled={isErrorXrplAddInput}
                            loading={xrplAddress.loading}
                        >
                            Validate
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewAccountDetailsInputs;
