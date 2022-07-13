import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { XummPkce } from "xumm-oauth2-pkce";

import useMergedState from "../../../../utils/useMergedState";
import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../../../constants/common.constants";
import { SIGNUP_INITIAL_STATE } from "../../../../constants/landing.constants";
import { ApiCall } from "../../../../utils/api.util";
import { isValidEqualValue, isValidPassword, isValidValue } from "../../../../utils/validations";

import "./signUp.scss";

const SignUp = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState(SIGNUP_INITIAL_STATE);
    const { username, password, confirmPassword, xrplAddress } = state;
    const toastId = useRef(null);

    const onGoBackClick = () => navigate(-1);

    const handleUsernameInput = (event) => {
        const { value } = event.target;
        const { error } = isValidValue(value);
        setState({
            username: {
                ...username,
                inputValue: value,
                error,
            },
        });
    };

    const handlePasswordInput = (event) => {
        const { value } = event.target;
        const { error } = isValidPassword(value);
        setState({
            password: {
                ...password,
                inputValue: value,
                error,
            },
        });
    };

    const handleConfirmPasswordInput = (event) => {
        const { value } = event.target;
        const { error } = isValidEqualValue(value, password.inputValue, "Your password dont't match.");
        setState({
            confirmPassword: {
                ...confirmPassword,
                inputValue: value,
                error,
            },
        });
    };

    const checkUserInputs = () => {
        let isValid = true;

        const { error: usernameError } = isValidValue(username.inputValue);
        if (usernameError.length > 0) {
            isValid = false;
            setState({ username: { ...username, error: usernameError } });
        }

        const { error: passwordError } = isValidPassword(password.inputValue);
        if (passwordError.length > 0) {
            isValid = false;
            setState({ password: { ...password, error: passwordError } });
        }

        const { error: confirmPasswordError } = isValidEqualValue(confirmPassword.inputValue, password.inputValue, "Your password dont't match.");
        if (confirmPasswordError.length > 0) {
            isValid = false;
            setState({ confirmPassword: { ...confirmPassword, error: confirmPasswordError } });
        };

        const { error: xrplAddressError } = isValidValue(xrplAddress.inputValue, "Please verify your XRPL address");
        if (xrplAddressError.length > 0) {
            isValid = false;
            setState({ xrplAddress: { ...xrplAddress, error: xrplAddressError } });
        }

        return isValid;
    }

    const onSubmitBtnClick = () => {
        let areAllValidInputs = checkUserInputs();

        if (areAllValidInputs) {
            toastId.current = toast.loading("Sending details...");
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
                    if (response.data.success) {
                        toast.success("Success! Lets redirect you to login page.");
                        setTimeout(() => {
                            navigate(ROUTES.LOGIN);
                        }, 3000);
                    }
                })
                .finally(() => {
                    toast.dismiss(toastId.current);
                });
        }
    };

    const onVerifyXrplAddressClick = () => {
        const auth = new XummPkce(process.env.XUMM_API_KEY);

        auth.authorize().then(authorized => {
            setState({
                xrplAddress: {
                    ...xrplAddress,
                    inputValue: authorized.me.account,
                    error: []
                }
            })
        }).catch((err) => {
            setState({
                xrplAddress: {
                    ...xrplAddress,
                    error: ["Uh Oh! We faced some issue. Please sign in again."]
                }
            })
        })
    }

    return (
        <div className="sign_up_container">
            <BackButton onClick={onGoBackClick} displayName="Go Back" />
            <div className="heading_container">
                <div className="heading">Sign Up</div>
                <div className="subHeading">Let's fill some information.</div>
            </div>
            <div className="input_container">
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
                    <ul className="note">
                        <li>Choose a random & unique username.</li>
                        <li>For eg: CoolXpt01, xptGuy22 etc.</li>
                    </ul>
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
                <div className="input_field">
                    <div className="labelTxt">XRPL Account: </div>
                    {xrplAddress.inputValue.length === 0 ? (
                        <Button
                            basic
                            color="green"
                            onClick={onVerifyXrplAddressClick}>
                            Link Using Xumm
                        </Button>
                    ) : (
                        <Input
                            name="id"
                            placeholder="Enter your account address"
                            autoComplete="off"
                            value={xrplAddress.inputValue}
                            error={xrplAddress.error.length > 0}
                            disabled
                        />
                    )}
                    {xrplAddress.error.length > 0 && <i className="error_txt">{xrplAddress.error[0]}</i>}
                    <ul className="note">
                        <li>Click the button below to sign In using XUMM</li>
                        <li>This is only a one time process!</li>
                    </ul>
                </div>
            </div>
            <div className="submit_btn">
                <SimpleAnimationButton firstText="Proceed" secondText="Submit" onClick={onSubmitBtnClick} color="purple" />
            </div>
        </div>
    );
};

export default SignUp;
