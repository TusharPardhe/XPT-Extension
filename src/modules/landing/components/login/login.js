import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "semantic-ui-react";
import queryString from "query-string";

import useMergedState from "../../../../utils/useMergedState";

import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../../../constants/common.constants";
import { LOGIN_INITIAL_STATE } from "../../../../constants/landing.constants";
import { saveInLocalStrg } from "../../../../utils/common.utils";
import { ApiCall } from "../../../../utils/api.util";

import "./login.scss";

const parsed = queryString.parse(window.location.search);

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState(LOGIN_INITIAL_STATE);
    const { userName, password } = state;
    const toastId = useRef(null);

    const validAllFields = () => {
        let isValid = true;

        if (userName.inputValue.length === 0) {
            isValid = false;
            setState({
                userName: { ...userName, error: ["Enter valid value."] },
            });
        }

        if (password.inputValue.length === 0) {
            isValid = false;
            setState({
                password: { ...password, error: ["Enter valid value."] },
            });
        }

        return isValid;
    };

    const onSubmit = () => {
        const isValid = validAllFields();

        if (isValid) {
            toastId.current = toast.loading("Verifing details...");

            const payload = {
                method: "POST",
                url: "login/user",
                encrypt: true,
                data: {
                    userName: userName.inputValue,
                    password: password.inputValue,
                },
            };

            ApiCall(payload)
                .then((response) => {
                    if (response.data.token) {
                        localStorage.clear();
                        saveInLocalStrg("token", response.data.token);
                        saveInLocalStrg("userName", response.data.userName);
                        saveInLocalStrg("xrplAddress", response.data.xrplAddress);
                        saveInLocalStrg("accountType", response.data.type);
                        const route = parsed.route ? ROUTES[parsed.route] : ROUTES.HOME;
                        navigate({
                            pathname: route,
                            search: window.location.search,
                        });
                    }
                })
                .finally(() => {
                    toast.dismiss(toastId.current);
                });
        }
    };

    const onUserNameInput = (e) => {
        setState({ userName: { ...userName, inputValue: e.target.value, error: [] } });
    };

    const onPasswordInput = (e) => {
        setState({ password: { ...password, inputValue: e.target.value, error: [] } });
    };

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
                    <Input
                        name="id"
                        placeholder="Enter Username/XRPL Address"
                        autoComplete="off"
                        value={userName.inputValue}
                        error={userName.error.length > 0}
                        onChange={onUserNameInput}
                    />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Passphrase: </div>
                    <Input
                        placeholder="Enter Passphrase"
                        type="password"
                        autoComplete="off"
                        value={password.inputValue}
                        error={password.error.length > 0}
                        onChange={onPasswordInput}
                    />
                </div>
            </div>
            <div className="submit_btn">
                <SimpleAnimationButton firstText="Submit" secondText="Proceed" onClick={onSubmit} color="baby-blue" />
            </div>
        </div>
    );
};

export default Login;
