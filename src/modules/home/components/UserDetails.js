import React from "react";
import { useNavigate } from "react-router-dom";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { ROUTES } from "../../../constants/common.constants";

const UserDetails = () => {
    const userAccount = localStorage.getItem("xrplAddress");
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    const viewAccountPortfolio = () => {
        navigate(ROUTES.PORTFOLIO.replace(":id", userAccount))
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
