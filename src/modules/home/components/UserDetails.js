import React from "react";
import { useNavigate } from "react-router-dom";
import { Hashicon } from "@emeraldpay/hashicon-react";

import { getDataFromLocalStrg } from "../../../utils/common.utils";
import { ROUTES } from "../../../constants/common.constants";

const UserDetails = () => {
    const userAccount = getDataFromLocalStrg("xrplAddress");
    const userName = getDataFromLocalStrg("userName");
    const navigate = useNavigate();

    const viewAccountPortfolio = () => {
        navigate(ROUTES.PORTFOLIO.replace(":id", userAccount), {
            state: { userName }
        });
    }

    return (
        <div className="user_details_container">
            <div className="details" onClick={viewAccountPortfolio}>
                <div className="left_section">
                    <Hashicon value={userAccount} size={50} />
                </div>
                <div className="right_section">
                    <div className="user_name">{userName}</div>
                    <div className="user_addr">{userAccount}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
