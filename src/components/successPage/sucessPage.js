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
        console.log("Support!");
    };

    return (
        <div className="success_page">
            <div className="success_heading">Awesome! 🎉</div>
            <div className="description">
                <div className="text">
                    Thank you for using XPT.
                    <br />Press the back button to add another request or head over to home to track your saved accounts.
                    Want to support the project? Hit the support project button!
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
