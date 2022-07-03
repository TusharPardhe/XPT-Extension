import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Image, Input, Select, TextArea } from 'semantic-ui-react';
import { Client } from 'xrpl';

import useMergedState from '../../../utils/useMergedState';
import XPTLogoImg from "../../../assets/svg/xpt.svg";
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import { PUBLIC_SERVER, ROUTES } from '../../../constants/common.constants';

import "./airdropRegistration.scss";

const AirdropRegistration = () => {
    const navigate = useNavigate();
    const accountXrplAddress = localStorage.getItem("xrplAddress");
    const [state, setState] = useMergedState({
        issuedCurrencies: [],
        loading: true,
    });
    const { issuedCurrencies, loading } = state;

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
            setState({ issuedCurrencies: response.result.obligations ?? [] });
            await client.disconnect();
        } catch (err) {
            console.log(err);
        } finally {
            setState({ loading: false });
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
                        <div className="label">Select token:</div>
                        <Select
                            placeholder="Select your token"
                            options={
                                [
                                    { key: 'af', value: 'af', text: 'Afghanistan' },
                                    { key: 'ax', value: 'ax', text: 'Aland Islands' },
                                    { key: 'al', value: 'al', text: 'Albania' },
                                ]
                            }
                            error={issuedCurrencies.length === 0 && !loading}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Project Name:</div>
                        <Input
                            placeholder="Enter name here"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Logo:</div>
                        <Input
                            placeholder="Select logo file"
                            style={{ width: "100%" }}
                            type="file"
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Currency Name:</div>
                        <Input
                            placeholder="Enter currency name here"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Airdrop Date:</div>
                        <Input
                            placeholder="dd-mm-yyyy"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="input_field">
                        <div className="label">Socials:</div>
                        <div className='social_inputs'>
                            <Input
                                label={{ content: "Twitter: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                            />
                            <Input
                                label={{ content: "Discord: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                            />
                            <Input
                                label={{ content: "Website: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                            />
                            <Input
                                label={{ content: "LinkTree: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
                            />
                            <Input
                                label={{ content: "Others: " }}
                                labelPosition="left"
                                style={{ width: "100%" }}
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
                        />
                    </div>
                </div>
                <div className="btn_container">
                    <Button
                        inverted
                        color={"green"}
                        type="submit"
                        onClick={() => console.log("Click")}
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