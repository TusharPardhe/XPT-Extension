import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "semantic-ui-react";

import SimpleAnimationButton from "../../components/simpleAnimationButton/simpleAnimationButton";
import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ROUTES } from "../../constants/common.constants";
import { getDataFromLocalStrg } from "../../utils/common.utils";

import "./landing.scss";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        autoLogin();
    }, []);

    const autoLogin = () => {
        const jwt = getDataFromLocalStrg("token");
        if (jwt) {
            navigate(ROUTES.HOME);
        }
    }

    return (
        <div className="landing_container">
            <div className="heading">
                <Image src={XPTLogoImg} className="logo_img" />
                PT
            </div>
            <div className="subHeading">XRPL Portfolio Tracker</div>
            <div className="short_phrase">Let's keep it simple.</div>
            <div className="btns_container">
                <SimpleAnimationButton onClick={() => navigate(ROUTES.LOGIN)} firstText="Login" secondText="Enter" />
                <SimpleAnimationButton onClick={() => navigate(ROUTES.SIGN_UP)} firstText="Sign Up" secondText="Join Us!" color="candy" />
            </div>
        </div>
    );
};

export default Landing;
