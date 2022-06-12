import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleAnimationButton from "../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../constants/common.constants";

import "./landing.scss";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto Login from JWT
    }, []);

    return (
        <div className="landing_container">
            <div className="heading">XPT</div>
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
