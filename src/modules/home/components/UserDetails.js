import React from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";

const UserDetails = () => {
    const userAccount = "9dddff8f-be81-4c27-80c8-099327865f3f";
    return (
        <div className="user_details_container">
            <div className="details">
                <div className="left_section">
                    <Hashicon value={userAccount} size={50} />
                </div>
                <div className="right_section">
                    <div className="user_name">Tushar</div>
                    <div className="user_addr">{userAccount}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
