import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { toast } from "react-toastify";

import useMergedState from "../../../../utils/useMergedState";
import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import { LOGIN_INITIAL_STATE } from "../../../../constants/common.constants";
import { ApiCall } from "../../../../utils/api.util";
import { isValidPassword, isValidXrplRAddress } from "../../../../utils/validations";

import "./signUp.scss";

const SignUp = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState(LOGIN_INITIAL_STATE);
    const { isNextInputsVisible, username, password, confirmPassword, xrplAddress } = state;
    const toastId = useRef(null);

    const onGoBackClick = () => (isNextInputsVisible ? setState({ isNextInputsVisible: false }) : navigate(-1));

    const handleUsernameInput = (event) => {
        const { value } = event.target;
        setState({
            username: {
                ...username,
                inputValue: value,
            },
        });
    };

    const handleXrplAccountInput = (event) => {
        const { value } = event.target;
        setState({
            xrplAddress: {
                ...xrplAddress,
                inputValue: value,
                error: !isValidXrplRAddress(value) ? ["Enter valid address"] : [],
            },
        });
    };

    const handlePasswordInput = (event) => {
        const { value } = event.target;
        setState({
            password: {
                ...password,
                inputValue: value,
                error: !isValidPassword(value) ? ["Enter a stronger password"] : [],
            },
        });
    };

    const handleConfirmPasswordInput = (event) => {
        const { value } = event.target;
        setState({
            confirmPassword: {
                ...confirmPassword,
                inputValue: value,
                error: value !== password.inputValue ? ["Your input doesn't match with your password."] : [],
            },
        });
    };

    const onSubmitBtnClick = () => {
        let areAllValidInputs =
            username.error.length === 0 &&
            xrplAddress.error.length === 0 &&
            password.error.length === 0 &&
            username.inputValue.length > 0 &&
            xrplAddress.inputValue.length > 0 &&
            password.inputValue.length > 0;

        // verify XRPL account.

        if (!isNextInputsVisible && areAllValidInputs) {
            setState({ isNextInputsVisible: true });
            return;
        }

        areAllValidInputs = areAllValidInputs && confirmPassword.error.length === 0 && confirmPassword.inputValue.length > 0;

        if (areAllValidInputs) {
            toastId.current = toast("Sending details...");
            const payload = {
                method: "POST",
                url: "register/user",
                encrypt: true,
                data: {
                    userName: username.inputValue,
                    password: password.inputValue,
                    address: xrplAddress.inputValue,
                },
            };

            ApiCall(payload)
                .then((response) => {
                    console.log(response);
                    if (response.data.success) {
                    }
                })
                .finally(() => {
                    toast.dismiss(toastId.current);
                });
        }
    };

    return (
        <div className="sign_up_container">
            <BackButton onClick={onGoBackClick} displayName="Go Back" />
            <div className="heading_container">
                <div className="heading">Sign Up</div>
                <div className="subHeading">Let's fill some information.</div>
            </div>
            <div className="input_container">
                {!isNextInputsVisible ? (
                    <>
                        <div className="input_field">
                            <div className="labelTxt">Username: </div>
                            <Input
                                name="id"
                                placeholder="Enter your preferred username"
                                autoComplete="off"
                                value={username.inputValue}
                                onChange={handleUsernameInput}
                                error={username.error.length > 0}
                            />
                            {username.error.length > 0 && <i className="error_txt">{username.error[0]}</i>}
                        </div>
                        <div className="input_field">
                            <div className="labelTxt">XRPL Account Address: </div>
                            <Input
                                name="id"
                                placeholder="Enter your account address"
                                autoComplete="off"
                                value={xrplAddress.inputValue}
                                onChange={handleXrplAccountInput}
                                error={xrplAddress.error.length > 0}
                            />
                            {xrplAddress.error.length > 0 && <i className="error_txt">{xrplAddress.error[0]}</i>}
                        </div>
                        <div className="input_field">
                            <div className="labelTxt">Password: </div>
                            <Input
                                placeholder="Enter password"
                                type="password"
                                autoComplete="off"
                                value={password.inputValue}
                                onChange={handlePasswordInput}
                                error={password.error.length > 0}
                            />
                            {password.error.length > 0 && <i className="error_txt">{password.error[0]}</i>}
                            <ul className="note">
                                <li>Password length should be min 8 characters.</li>
                                <li>Password must contain atleast one digit, one uppercase and one lowercase character.</li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="input_field">
                        <div className="labelTxt">Confirm Password: </div>
                        <Input
                            placeholder="Re-enter your password"
                            type="password"
                            autoComplete="off"
                            value={confirmPassword.inputValue}
                            onChange={handleConfirmPasswordInput}
                            error={confirmPassword.error.length > 0}
                        />
                        {confirmPassword.error.length > 0 && <i className="error_txt">{confirmPassword.error[0]}</i>}
                    </div>
                )}
            </div>
            <div className="submit_btn">
                <SimpleAnimationButton firstText="Proceed" secondText="Submit" onClick={onSubmitBtnClick} color="purple" />
            </div>
        </div>
    );
};

export default SignUp;
