import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Divider, Image } from "semantic-ui-react";

import useMergedState from "../../../../utils/useMergedState";

import RegistrationForm from "../registrationForm/registrationForm";
import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import ShimmerLoader from "../../../../components/shimmerLoader/shimmerLoader";

import { ROUTES } from "../../../../constants/common.constants";
import { ApiCall } from "../../../../utils/api.util";
import { isValidValue } from "../../../../utils/validations";
import { getDataFromLocalStrg } from "../../../../utils/common.utils";
import { AIRDROP_REGISTRATION_INITIAL_STATE } from "../../../../constants/airdrops.constants";

import "./airdropRegistration.scss";

const AirdropRegistration = () => {
    const navigate = useNavigate();
    const accountXrplAddress = getDataFromLocalStrg("xrplAddress");
    const toastId = useRef(null);

    const [state, setState] = useMergedState(AIRDROP_REGISTRATION_INITIAL_STATE);
    const { projectName, logo, ticker, currencyName, date, description, twitter, discord, website, linktree, others, loading, message } = state;

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const gotoAirdrops = () => {
        navigate(ROUTES.AIRDROPS);
    };

    const fetchAccountDetails = () => {
        setState({ loading: true });
        const payload = {
            method: "POST",
            url: "airdrop/registration/token/list",
            auth: true,
            encrypt: true,
            data: {
                userName: getDataFromLocalStrg("userName"),
            },
        };

        ApiCall(payload)
            .then((response) => {
                const { currencies, message } = response.data;
                if (currencies?.length > 0) {
                    setState({ ticker: { ...ticker, options: currencies }, message });
                } else {
                    setState({ message });
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
                setState({ loading: false });
            });
    };

    const handleUserInput = (e, res) => {
        const { name, value } = res || e.target;
        const { error } = isValidValue(value);
        const updatedObj = { ...state[name], value, error };
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

        if (message.length > 0) {
            isValid = false;
        }

        return isValid;
    };

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
                    userName: getDataFromLocalStrg("userName"),
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
                    },
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
            toast.error("Please check and enter valid details.");
        }
    };

    return (
        <div className="airdrop_registration_component">
            <RegistrationHeading {...{ gotoAirdrops }} />
            <Divider />
            <RestrictionNote {...{ message }} />
            {loading ? <ShimmerLoader /> : <RegistrationForm {...{ state, setState, handleUserInput, onSubmit }} />}
        </div>
    );
};

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
};

const RestrictionNote = ({ message }) => {
    if (message.length === 0) {
        return null;
    }

    return (
        <>
            <div className="restricted_note_container">
                <span>Restricted: </span>
                {message}
            </div>
            <Divider />
        </>
    );
};

