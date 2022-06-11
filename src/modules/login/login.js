import React, { useEffect } from "react";

import "./login.scss";

const Login = () => {
    useEffect(() => {
        // Auto Login from JWT
    }, []);

    return (
        <div className="login_container">
            <div className="heading">XPT</div>
            <div className="subHeading">XRPL Portfolio Tracker</div>
            <div className="short_phrase">Let's keep it simple.</div>
            <div className="btns_container">
                <div class="buttons">
                    <div class="container">
                        <div class="btn effect04" data-sm-link-text="Enter">
                            <span>Login</span>
                        </div>
                    </div>
                </div>
                <div class="buttons">
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

export default Login;
