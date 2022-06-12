import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Transition } from "semantic-ui-react";

import BackButton from "../../../../components/backButton/backButton";

import "./login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [submitBtnHover, setSubmitBtnHover] = useState(true);

    return (
        <div className="login_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <div className="heading_container">
                <div className="heading">Login</div>
                <div className="subHeading">Please enter your login credentials.</div>
            </div>
            <div className="input_container">
                <div className="input_field">
                    <div className="labelTxt">Username: </div>
                    <Input name="id" placeholder="Enter Username" autoComplete="off" />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Passphrase: </div>
                    <Input placeholder="Enter Passphrase" type="password" autoComplete="off" />
                </div>
            </div>
            <div className="submit_btn">
                <Transition duration="500" visible={submitBtnHover} animation="pulse">
                    <Button inverted color="green" onMouseOver={() => setSubmitBtnHover(!submitBtnHover)}>
                        Submit
                    </Button>
                </Transition>
            </div>
        </div>
    );
};

export default Login;
