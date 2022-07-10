import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Divider, Image } from 'semantic-ui-react';
import { Client, convertHexToString } from 'xrpl';

import useMergedState from '../../../utils/useMergedState';

import { RegistrationForm } from './RegistrationForm';
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
        isAnIssuer: true,
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
        loading,
        isAnIssuer,
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
                setState({ ticker: { ...ticker, options: values ?? [] }, isAnIssuer: true });
            } else {
                setState({ isAnIssuer: false })
            }
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

        if (!isAnIssuer) {
            isValid = false;
        }

        return isValid;
    }

    const onSubmit = () => {
        const isValid = validateAllFields();

        if (isValid) {
            toastId.current = toast.loading("Sending request");

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
            <RegistrationHeading {...{ gotoAirdrops }} />
            <Divider />
            <RestrictionNote show={!isAnIssuer} />
            <RegistrationForm {...{ state, setState, handleUserInput, onSubmit }} />
            <AnimatedLoader loadingText="Fetching details..." isActive={loading} />
        </div>
    );
}

export default AirdropRegistration;


const RegistrationHeading = ({ gotoAirdrops }) => {
    return (
        <div className="heading_component">
            <div className="heading" onClick={gotoAirdrops}>
                AIRDR
                <Image src={XPTLogoImg} className="logo_img" />
                PS
            </div>
            <div className="sub_heading">Never let a drop go unnoticed.</div>
        </div>
    );
}

const RestrictionNote = (show) => {
    if (!show) return null;

    return (
        <>
            <div className="not_issuer_not">
                <span>Restricted:</span> Only token issuer accounts can request for an airdrop listing. Please login using an issuer account.
            </div>
            <Divider />
        </>
    );
}

