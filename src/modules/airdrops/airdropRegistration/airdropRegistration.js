import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Image, Input, Select, TextArea } from 'semantic-ui-react';
import { Client, convertHexToString } from 'xrpl';

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
    const [state, setState] = useMergedState({
        issuedCurrencies: [],
        loading: true,
        projectName: { value: "", error: [] },
        currencyName: { value: "", error: [] },
        date: { value: "", error: [] },
        description: { value: "", error: [] },
        logo: { value: "", error: [] },
        twitter: { value: "", error: [] },
        discord: { value: "", error: [] },
        website: { value: "", error: [] },
        linktree: { value: "", error: [] },
        others: { value: "", error: [] },
        ticker: { value: "", error: [] }
    });
    const {
        issuedCurrencies,
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
                setState({ issuedCurrencies: values ?? [] });
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
        const updatedObj = { value, error };
        if (e.target.files && e.target.files[0]) {
            updatedObj.file = e.target.files[0];
        };
        setState({ [name]: updatedObj });
    };

    const onSubmit = () => {

        const payload = {
            method: "POST",
            url: "airdrop/add",
            data: {
                ticker,
                currencyName,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {

                }
            })
            .finally(() => {

            });
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
                            options={issuedCurrencies}
                            error={issuedCurrencies.length === 0 && !loading}
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
                        <Input
                            placeholder="dd-mm-yyyy"
                            style={{ width: "100%" }}
                            value={date.value}
                            name="date"
                            onChange={handleUserInput}
                            error={date.error.length > 0}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Links:</div>
                        <div className='social_inputs'>
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
                                label={{ content: "Logo: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                                value={logo.value}
                                name="logo"
                                placeholder="Png/Jpeg/Jpg link"
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
                        />
                    </div>
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