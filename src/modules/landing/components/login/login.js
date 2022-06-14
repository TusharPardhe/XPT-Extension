import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";

import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../../../constants/common.constants";

import "./login.scss";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <div className="heading_container">
                <div className="heading">Login</div>
                <div className="subHeading">Please enter your login credentials.</div>
            </div>
            <div className="input_container">
                <div className="input_field">
                    <div className="labelTxt">Username/XRPL Address: </div>
                    <Input name="id" placeholder="Enter Username/XRPL Address" autoComplete="off" />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Passphrase: </div>
                    <Input placeholder="Enter Passphrase" type="password" autoComplete="off" />
                </div>
            </div>
            <div className="submit_btn">
                <SimpleAnimationButton firstText="Submit" secondText="Proceed" onClick={() => navigate(ROUTES.HOME)} color="baby-blue" />
            </div>
        </div>
    );
};

export default Login;
