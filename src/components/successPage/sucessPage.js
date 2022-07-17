import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";

import "./successPage.scss";

const SuccessPage = () => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate(ROUTES.HOME);
    };

    const goBack = () => {
        navigate(-1);
    };

    const onSupportBtnClick = () => {
        navigate(ROUTES.DONATIONS);
    };

    return (
        <div className="success_page">
            <div className="success_heading">Awesome! 🎉</div>
            <div className="description">
                <div className="text">
                    Thank you for using XPT.
                    <br /><br />
                    We are happy to have you here. Press the buttons below or open the sidebar to navigate. Also, consider donating to the project it keeps us motivated! 
                </div>
            </div>
            <div className="buttons_container">
                <Button color="google plus" onClick={goBack}>
                    Go Back
                </Button>
                <Button color="green" onClick={redirectToHome}>
                    Home
                </Button>
                <Button inverted color="blue" onClick={onSupportBtnClick}>
                    Support project!
                </Button>
            </div>
        </div>
    );
};

export default SuccessPage;
