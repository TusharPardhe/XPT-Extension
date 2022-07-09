import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Button, Divider, Image, Input, Select, TextArea } from 'semantic-ui-react';
import { Client, convertHexToString } from 'xrpl';
import DateTimePicker from 'react-datetime-picker';

import useMergedState from '../../../utils/useMergedState';
import XPTLogoImg from "../../../assets/svg/xpt.svg";
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import { PUBLIC_SERVER, ROUTES } from '../../../constants/common.constants';
import { ApiCall } from "../../../utils/api.util";
import { isValidValue } from '../../../utils/validations';

import "./airdropRegistration.scss";

const AirdropRegistration = () => {
    const navigate = useNavigate();
    const accountXrplAddress = localStorage.getItem("xrplAddress");
    const toastId = useRef(null);

    const [state, setState] = useMergedState({
        loading: true,
        projectName: { value: "", error: [] },
        currencyName: { value: "", error: [] },
        date: { value: new Date(), error: [] },
        description: { value: "", error: [] },
        logo: { value: "", error: [] },
        twitter: { value: "", error: [] },
        discord: { value: "", error: [] },
        website: { value: "", error: [] },
        linktree: { value: "", error: [] },
        others: { value: "", error: [] },
        ticker: { value: "", error: [], options: [] }
    });
    const {
        projectName,
        logo,
        ticker,
        currencyName,
        date,
        description,
        twitter,
        discord,
        website,
        linktree,
        others,
        loading
    } = state;

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const gotoAirdrops = () => {
        navigate(ROUTES.AIRDROPS);
    };

    const fetchAccountDetails = async () => {
        try {
            setState({ loading: true });
            const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
            await client.connect();
            const response = await client.request({
                command: "gateway_balances",
                account: accountXrplAddress,
                ledger_index: "validated",
            });
            const currencies = response.result.obligations;
            if (currencies) {
                const values = Object.keys(currencies).map(a => {
                    if (a.length === 40) {
                        const b = convertHexToString(a).replaceAll("\u0000", "");
                        return ({ key: b, value: b, text: b })
                    };
                    return ({ key: a, value: a, text: a });
                });
                setState({ ticker: { ...ticker, options: values ?? [] } });
            };
            await client.disconnect();
        } catch (err) {
            console.log(err);
        } finally {
            setState({ loading: false });
        }
    }

    const handleUserInput = (e, res) => {
        const { name, value } = res || e.target;
        const { error } = isValidValue(value);
        const updatedObj = { ...state[name], value, error };

        if (e.target.files && e.target.files[0]) {
            updatedObj.file = e.target.files[0];
        };

        setState({ [name]: updatedObj });
    };

    const validateAllFields = () => {
        let isValid = true;

        const { error: tickerError } = isValidValue(ticker.value);
        if (tickerError.length) {
            isValid = false;
            setState({ ticker: { ...ticker, error: tickerError } });
        }

        const { error: projectNameError } = isValidValue(projectName.value);
        if (projectNameError.length) {
            isValid = false;
            setState({ projectName: { ...projectName, error: projectNameError } });
        }

        const { error: currencyNameError } = isValidValue(currencyName.value);
        if (currencyNameError.length) {
            isValid = false;
            setState({ currencyName: { ...currencyName, error: currencyNameError } });
        }

        const { error: dateError } = isValidValue(date.value);
        if (dateError.length) {
            isValid = false;
            setState({ date: { ...date, error: dateError } });
        }

        const { error: logoError } = isValidValue(logo.value);
        if (logoError.length) {
            isValid = false;
            setState({ logo: { ...logo, error: logoError } });
        }

        const { error: descriptionError } = isValidValue(description.value);
        if (descriptionError.length) {
            isValid = false;
            setState({ description: { ...description, error: descriptionError } });
        }

        return isValid;
    }

    const onSubmit = () => {
        const isValid = validateAllFields();

        if (isValid) {
            toastId.current = toast.loading("Fetching saved accounts...");

            const payload = {
                method: "POST",
                url: "airdrop/add",
                auth: true,
                encrypt: true,
                data: {
                    userName: localStorage.getItem("userName"),
                    projectName: projectName.value,
                    ticker: ticker.value,
                    issuer: accountXrplAddress,
                    addedByAccount: accountXrplAddress,
                    currencyName: currencyName.value,
                    date: parseInt(date.value.getTime() / 1000),
                    description: description.value,
                    links: {
                        logo: logo.value,
                        twitter: twitter.value,
                        discord: discord.value,
                        linktree: linktree.value,
                        others: others.value,
                    }
                },
            };

            ApiCall(payload)
                .then((response) => {
                    if (response.data) {
                        navigate(ROUTES.REQUEST_SUCCESS);
                    }
                })
                .finally(() => {
                    toast.dismiss(toastId.current);
                });
        } else {
            toast.error("Please check and enter valid details.")
        }
    }

    return (
        <div className="airdrop_registration_component">
            <div className="heading_component">
                <div className="heading" onClick={gotoAirdrops}>
                    AIRDR
                    <Image src={XPTLogoImg} className="logo_img" />
                    PS
                </div>
                <div className="sub_heading">Never let a drop go unnoticed.</div>
            </div>
            <Divider />
            <div className="registration_box">
                <div className="heading">Please enter details:</div>
                <div className="inputs">
                    <div className="input_field">
                        <div className="label">Select Token Ticker:</div>
                        <Select
                            placeholder="Select your token"
                            options={ticker.options}
                            error={ticker.error.length > 0}
                            style={{ width: "100%" }}
                            value={ticker.value}
                            name="ticker"
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Project Name:</div>
                        <Input
                            placeholder="Enter name here"
                            style={{ width: "100%" }}
                            value={projectName.value}
                            name="projectName"
                            onChange={handleUserInput}
                            error={projectName.error.length > 0}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Currency Name:</div>
                        <Input
                            placeholder="Enter currency name here"
                            style={{ width: "100%" }}
                            value={currencyName.value}
                            name="currencyName"
                            onChange={handleUserInput}
                            error={currencyName.error.length > 0}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Airdrop Date:</div>
                        <DateTimePicker
                            onChange={(value) => setState({ date: { value } })}
                            value={date.value}
                            style={{ width: "100%" }}
                            required
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Links:</div>
                        <div className='social_inputs'>
                            <Input
                                label={{ content: "Logo: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={logo.value}
                                name="logo"
                                placeholder="Png/Jpeg/Jpg link"
                                onChange={handleUserInput}
                                error={logo.error.length > 0}
                            />
                            <Input
                                label={{ content: "Twitter: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={twitter.value}
                                name="twitter"
                                placeholder="Enter twitter link"
                                onChange={handleUserInput}
                            />
                            <Input
                                label={{ content: "Discord: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={discord.value}
                                name="discord"
                                placeholder="Enter discord link"
                                onChange={handleUserInput}
                            />
                            <Input
                                label={{ content: "Website: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={website.value}
                                name="website"
                                placeholder="Enter website link"
                                onChange={handleUserInput}
                            />
                            <Input
                                label={{ content: "LinkTree: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={linktree.value}
                                name="linktree"
                                placeholder="Enter linktree link"
                                onChange={handleUserInput}
                            />
                            <Input
                                label={{ content: "Others: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={others.value}
                                name="others"
                                placeholder="Enter additional links"
                                onChange={handleUserInput}
                            />
                        </div>
                    </div>
                    <div className="input_field">
                        <div className="label">Description:</div>
                        <TextArea
                            style={{
                                width: "100%",
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "80px",
                                maxHeight: "150px"
                            }}
                            name="description"
                            onChange={handleUserInput}
                            value={description.value}
                            error={description.error.length > 0}
                            className={description.error.length > 0 ? "error_textarea" : ""}
                        />
                    </div>
                </div>
                <div className="submission_note">
                    <span>Note:</span> A token issuer can submit only one request per issued token. If you want to omit your details after submission, please contact on Twitter.
                </div>
                <div className="btn_container">
                    <Button
                        inverted
                        color={"green"}
                        type="submit"
                        onClick={onSubmit}
                        disabled={false}
                        loading={loading}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <AnimatedLoader loadingText="Fetching details..." isActive={loading} />
        </div>
    );
}

export default AirdropRegistration;