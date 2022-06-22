import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "semantic-ui-react";

import useMergedState from "../../../../utils/useMergedState";

import BackButton from "../../../../components/backButton/backButton";
import SimpleAnimationButton from "../../../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../../../constants/common.constants";
import { ApiCall } from "../../../../utils/api.util";

import "./login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState({ userName: "", password: "" });
    const { userName, password } = state;
    const toastId = useRef(null);

    const onSubmit = () => {
        toastId.current = toast.loading("Verifing details...");

        const payload = {
            method: "POST",
            url: "login/user",
            encrypt: true,
            data: {
                userName,
                password,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate(ROUTES.HOME);
                }
            })
            .finally(() => {
                toast.dismiss(toastId.current);
            });
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
                        value={userName}
                        onChange={(e) => setState({ userName: e.target.value })}
                    />
                </div>
                <div className="input_field">
                    <div className="labelTxt">Passphrase: </div>
                    <Input
                        placeholder="Enter Passphrase"
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setState({ password: e.target.value })}
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
