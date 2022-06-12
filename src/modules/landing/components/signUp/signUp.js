import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Transition } from "semantic-ui-react";

import BackButton from "../../../../components/backButton/backButton";

import "./signUp.scss";

const SignUp = () => {
    const navigate = useNavigate();
    const [submitBtnHover, setSubmitBtnHover] = useState(true);

    return (
        <div className="sign_up_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <div className="heading_container">
                <div className="heading">Sign Up</div>
                <div className="subHeading">Let's fill some information.</div>
            </div>
            <div className="input_container">
                <div className="input_field">
                    <div className="labelTxt">Username: </div>
                    <Input name="id" placeholder="Enter your preferred username" autoComplete="off" />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Passphrase: </div>
                    <Input placeholder="Enter passphrase" type="password" autoComplete="off" />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Confirm passphrase: </div>
                    <Input placeholder="Re-enter your passphrase" type="password" autoComplete="off" />
                </div>
            </div>
            <div className="submit_btn">
                <Transition duration="500" visible={submitBtnHover} animation="pulse">
                    <Button inverted color="violet" onMouseOver={() => setSubmitBtnHover(!submitBtnHover)}>
                        Submit
                    </Button>
                </Transition>
            </div>
        </div>
    );
};

export default SignUp;
