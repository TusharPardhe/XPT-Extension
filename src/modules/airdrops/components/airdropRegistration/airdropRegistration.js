import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Divider, Image } from "semantic-ui-react";

import useMergedState from "../../../../utils/useMergedState";

import RegistrationForm from "../registrationForm/registrationForm";
import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import ShimmerLoader from "../../../../components/shimmerLoader/shimmerLoader";
import AirdropPaymentModal from "../airdropPaymentModal/airdropPaymentModal";

import { ACCOUNT_TYPES, ROUTES, URLS } from "../../../../constants/common.constants";
import { ApiCall } from "../../../../utils/api.util";
import { isValidValue } from "../../../../utils/validations";
import { getDataFromLocalStrg } from "../../../../utils/common.utils";
import { AIRDROP_REGISTRATION_INITIAL_STATE } from "../../../../constants/airdrops.constants";

import "./airdropRegistration.scss";

const AirdropRegistration = () => {
    const navigate = useNavigate();
    const accountXrplAddress = getDataFromLocalStrg("xrplAddress");
    const accountType = getDataFromLocalStrg("accountType");
    const isAirdropAccessAccount = accountType === ACCOUNT_TYPES.AIRDROP_ACCESS;
    const toastId = useRef(null);

    const [state, setState] = useMergedState(AIRDROP_REGISTRATION_INITIAL_STATE);
    const { projectName, logo, ticker, limit, currencyName, date, description, twitter, discord, website, linktree, others, loading, issuer, paymentSuccess } = state;

    useEffect(() => {
        fetchAccountTokens();
    }, []);

    useEffect(() => {
        onPaymentSuccess();
    }, [paymentSuccess])

    const gotoAirdrops = () => {
        navigate(ROUTES.AIRDROPS);
    };

    const fetchAccountTokens = () => {
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
                let { currencies, listingFees } = response.data;
                currencies = currencies?.length > 0 ? currencies : [];
                setState({ ticker: { ...ticker, options: currencies }, listingFees });
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

        if (name === "ticker") {
            const currentSelection = ticker.options.filter((t) => t.value === value);
            setState({ [name]: updatedObj, limit: currentSelection[0].limit, issuer: currentSelection[0].issuer });
            return;
        }
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

        const { error: twitterError } = isValidValue(twitter.value);
        if (twitterError.length) {
            isValid = false;
            setState({ twitter: { ...twitter, error: twitterError } });
        }

        const { error: descriptionError } = isValidValue(description.value);
        if (descriptionError.length) {
            isValid = false;
            setState({ description: { ...description, error: descriptionError } });
        }

        return isValid;
    };

    const closeModal = () => setState({ openPaymentModal: false });

    const onSubmit = () => {
        const isValid = validateAllFields();

        if (!isValid) {
            toast.error("Please check and enter valid details.");
            return;
        };

        setState({
            openPaymentModal: !isAirdropAccessAccount,
            paymentSuccess: isAirdropAccessAccount,
        });
    };

    const onPaymentSuccess = () => {
        if (paymentSuccess) {
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
                    issuer,
                    addedByAccount: accountXrplAddress,
                    currencyName: currencyName.value,
                    date: parseInt(date.value.getTime() / 1000),
                    description: description.value,
                    logo: logo.value,
                    maxSupply: limit,
                    links: {
                        twitter: twitter.value,
                        discord: discord.value,
                        linktree: linktree.value,
                        website: website.value,
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
        };
    }

    return (
        <div className="airdrop_registration_component">
            <RegistrationHeading {...{ gotoAirdrops }} />
            <div className="note_heading">
                {isAirdropAccessAccount ? (
                    <>Your account has unlimited access to list ADs, just add a trustline of the token & start listing.</>
                ) : (
                    <>
                        The cost of listing an airdrop is 5 XRP. <br />
                        Partner projects can list unlimited ADs for free; for more information, contact us on{" "}
                        <a href={URLS.XPT_TWITTER} target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                        .
                    </>
                )}
            </div>
            <Divider />
            {loading ? <ShimmerLoader /> : <RegistrationForm {...{ state, setState, handleUserInput, onSubmit }} />}
            <AirdropPaymentModal {...{ closeModal, state, setState }} />
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
            <div className="sub_heading">Never let a drop go unnoticed</div>
        </div>
    );
};
