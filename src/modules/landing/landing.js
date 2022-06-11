import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
                <div class="anim_button" onClick={() => navigate(ROUTES.LOGIN)}>
                    <div class="container">
                        <div class="btn effect04" data-sm-link-text="Enter">
                            <span>Login</span>
                        </div>
                    </div>
                </div>
                <div class="anim_button" onClick={() => navigate(ROUTES.SIGN_UP)}>
                    <div class="container">
                        <div class="btn effect04 success" data-sm-link-text="Join Us!">
                            <span>Sign Up</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
