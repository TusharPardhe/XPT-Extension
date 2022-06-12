import React from "react";
import { useNavigate } from "react-router-dom";

import SimpleAnimationButton from "../../../components/simpleAnimationButton/simpleAnimationButton";
import { ROUTES } from "../../../constants/common.constants";

const NoAddedAccounts = () => {
    const navigate = useNavigate();
    return (
        <div className="no_added_accounts">
            <div className="no_accounts_detail_box">
                Your inventory is empty.
                <br />
                Press the button below to begin your journey.
            </div>
            <div className="enter_btn">
                <SimpleAnimationButton onClick={() => navigate(ROUTES.ACCOUNTS)} firstText="Enter" secondText="Begin" color="baby-blue" />
            </div>
        </div>
    );
};

export default NoAddedAccounts;
