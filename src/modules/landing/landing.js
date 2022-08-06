import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "semantic-ui-react";
import queryString from "query-string";
import SimpleAnimationButton from "../../components/simpleAnimationButton/simpleAnimationButton";
import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ROUTES } from "../../constants/common.constants";
import { getDataFromLocalStrg, sendMessageToBgScript } from "../../utils/common.utils";

import "./landing.scss";

// this import
import { Wallet } from "xrpl";

const parsed = queryString.parse(window.location.search);

// var port = chrome.extension.connect({ name: "XPT-Popup Communication" });

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        autoLogin();
        console.log(Wallet.fromSecret("ssZkdwURFMBXenJPbrpE14b6noJSu"));
    }, []);


    // port.onMessage.addListener(function (message) {
    //     if (message.id === "TRANSACTION_DETAILS") {
    //         const signed = wallet.sign(message.transaction);
    //         port.postMessage({ id: "DATA_FROM_POPUP", transactionId: parsed.transactionId, signed });
    //     }
    // });

    const autoLogin = () => {
        const jwt = getDataFromLocalStrg("token");
        if (jwt) {
            navigate(ROUTES.HOME);
        }
    };

    const onLoginBtnClick = () => {
        // to send message to background script
        // port.postMessage({ id: "SEND_DETAILS", transactionId: parsed.transactionId });
        // sendMessageToBgScript({ id: "DATA_FROM_POPUP", transactionId: parsed.transactionId, key: "spkPaHe6XtQgmEyU5mmLEycuguhkS" });
        // navigate(ROUTES.LOGIN)
    };

    return (
        <div className="landing_container">
            <div className="heading">
                <Image src={XPTLogoImg} className="logo_img" />
                PT
            </div>
            <div className="subHeading">XRPL Portfolio Tracker</div>
            <div className="short_phrase">Let's keep it simple.</div>
            <div className="btns_container">
                <SimpleAnimationButton onClick={onLoginBtnClick} firstText="Login" secondText="Enter" />
                <SimpleAnimationButton onClick={() => navigate(ROUTES.SIGN_UP)} firstText="Sign Up" secondText="Join Us!" color="candy" />
            </div>
        </div>
    );
};

export default Landing;
