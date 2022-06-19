import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ROUTES } from "../../../constants/common.constants";

const AccountAdditionSuccess = ({ setState }) => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        setState({ hasAccountAdded: false });
        navigate(ROUTES.HOME);
    };

    const goBack = () => {
        setState({ hasAccountAdded: false });
    };

    const onSupportBtnClick = () => {
        console.log("Support!");
        setState({ hasAccountAdded: false });
    };

    return (
        <div className="account_add_success">
            <div className="success_heading">Awesome! 🎉</div>
            <div className="description">
                <div className="text">Your input has been saved, head over to home to keep track of your saved accounts.</div>
            </div>
            <div className="buttons_container">
                <Button color="google plus" onClick={goBack}>
                    Add more
                </Button>
                <Button color="green" onClick={redirectToHome}>
                    Go to Home
                </Button>
                <Button inverted color="blue" onClick={onSupportBtnClick}>
                    Support project!
                </Button>
            </div>
        </div>
    );
};

export default AccountAdditionSuccess;
