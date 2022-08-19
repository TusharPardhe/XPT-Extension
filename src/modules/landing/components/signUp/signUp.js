import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { toast } from "react-toastify";

import useMergedState from "../../../../utils/useMergedState";

import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import VerifyWithXUMM from "../verifyWithXUMM/VerifyWithXUMM";

import { FIELD_INITIAL_STATE, ROUTES } from "../../../../constants/common.constants";
import { SIGNUP_INITIAL_STATE } from "../../../../constants/landing.constants";
import { ApiCall } from "../../../../utils/api.util";
import { isValidEqualValue, isValidPassword, isValidValue } from "../../../../utils/validations";

import "./signUp.scss";

const SignUp = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState(SIGNUP_INITIAL_STATE);
    const {
        username,
        password,
        confirmPassword,
        xrplAddress,
        xumm: { imgUrl, isOpened },
    } = state;
    const toastId = useRef(null);
    // const ws = new WebSocket(wss);

    const onGoBackClick = () => navigate(-1);

    const handleUsernameInput = (event) => {
        const { value } = event.target;
        const { error } = isValidValue(value, undefined, /^\S*$/);
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

        const { error: usernameError } = isValidValue(username.inputValue, "Please enter a valid user name.", /^.{5,}$/);
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
        }

        const { error: xrplAddressError } = isValidValue(xrplAddress.inputValue, "Please verify your XRPL address");
        if (xrplAddressError.length > 0) {
            isValid = false;
            setState({ xrplAddress: { ...xrplAddress, error: xrplAddressError } });
        }

        return isValid;
    };

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

    const createWebSocketConnection = (data) => {
        const ws = new WebSocket(data.data.refs.websocket_status);

        ws.onmessage = async function (event) {
            const json = JSON.parse(event.data);
            try {
                if (json.payload_uuidv4) {
                    const payload = {
                        method: "GET",
                        url: "user/validate/uuid",
                        params: {
                            uuid: json.payload_uuidv4,
                        },
                    };
                    const response = await ApiCall(payload);
                    if (response.data.signed) {
                        setState({
                            xrplAddress: {
                                ...xrplAddress,
                                inputValue: response.data.account,
                                error: [],
                            },
                        });
                    } else {
                        setState({
                            xrplAddress: {
                                ...xrplAddress,
                                error: ["You've cancelled the request. Please try again."],
                            },
                            xumm: {
                                imgUrl: "",
                                isOpened: false,
                            },
                        });
                    }
                    ws.close();
                }

                if (json.opened) {
                    setState({
                        xumm: {
                            imgUrl,
                            isOpened: true,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                setState({
                    xrplAddress: {
                        ...xrplAddress,
                        error: ["Uh Oh! An error occurred. Please try again."],
                    },
                    xumm: {
                        imgUrl: "",
                        isOpened: false,
                    },
                });
                ws.close();
            }
        };
    };

    const onVerifyXrplAddressClick = async () => {
        try {
            const payload = {
                method: "POST",
                url: "user/xumm/transaction",
                encrypt: false,
                auth: false,
                data: {
                    txJSON: { "TransactionType": "SignIn" },
                },
            };
            const response = await ApiCall(payload);

            setState({
                xumm: {
                    imgUrl: response.data.refs.qr_png,
                    isOpened: false,
                },
                xrplAddress: FIELD_INITIAL_STATE,
            });
            createWebSocketConnection(response);
        } catch (err) {
            console.log(err);
            setState({
                xrplAddress: {
                    ...xrplAddress,
                    error: ["Uh Oh! An error occurred. Please try again."],
                },
                xumm: {
                    imgUrl: "",
                    isOpened: false,
                },
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
                        <li>[IMPORTANT] Choose a random & unique username.</li>
                        <li>Username must have 5 or more characters.</li>
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
                    <VerifyWithXUMM {...{ xrplAddress, imgUrl, onVerifyXrplAddressClick, isOpened }} />
                    {xrplAddress.error.length > 0 && <i className="error_txt">{xrplAddress.error[0]}</i>}
                    <ul className="note">
                        <li>Press the button to verify your address</li>
                        <li>This is a one time process!</li>
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