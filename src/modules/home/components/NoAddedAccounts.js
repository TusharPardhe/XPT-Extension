import React from "react";
import { Button, Transition } from "semantic-ui-react";
import { ROUTES } from "../../../constants/common.constants";

const NoAddedAccounts = ({ enterBtnHover, setEnterBtnHover, navigate }) => {
    return (
        <div className="no_added_accounts">
            <div className="heading">Welcome aboard explorer</div>
            <div className="subHeading">
                Your inventory is empty.
                <br />
                Press the button below to begin tracking an XRPL account
            </div>
            <div className="enter_btn">
                <Transition duration="1500" visible={enterBtnHover} animation="tada">
                    <Button inverted color="blue" onClick={() => navigate(ROUTES.ACCOUNTS)} onMouseOver={() => setEnterBtnHover(!enterBtnHover)}>
                        Enter
                    </Button>
                </Transition>
            </div>
        </div>
    );
};

export default NoAddedAccounts;
