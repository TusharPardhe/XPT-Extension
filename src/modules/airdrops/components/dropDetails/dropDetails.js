import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import dateFormat from "dateformat";

import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import BackButton from "../../../../components/backButton/backButton";
import { ROUTES } from "../../../../constants/common.constants";
import { linkify } from "../../../../utils/common.utils";

import "./dropDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { projectName, currencyName, description, date, logo } = state;

    const onGoBackClick = () => {
        navigate(ROUTES.AIRDROPS, {
            state: {
                date: state.selectedDate,
                activePage: state.selectedPage,
            },
        });
    };

    return (
        <div className="drop_details_container">
            <BackButton onClick={onGoBackClick} displayName="Go Back" />
            <div className="details_box">
                <div className="heading">
                    <div className="img_container">
                        <img src={logo ?? XPTLogoImg} alt={projectName} />
                    </div>
                    <div className="drop_name">{currencyName}</div>
                </div>
                <Divider />
                <div className="description">{linkify(description)}</div>
                <div className="trustline">
                    <img className="trustline_xumm" alt="trustline" src="https://randomuser.me/api/portraits/men/3.jpg" />
                    <div className="heading">Scan me with XUMM</div>
                </div>
                <Divider />
                <div className="coin_info">
                    <div className="info_cards_container">
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Airdrop Date</div>
                                <div className="value">{dateFormat(date * 1000, "dd mmm yyyy hh:mm TT")}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Project Name</div>
                                <div className="value">{projectName}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Total Supply</div>
                                <div className="value">100000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Total Trustlines</div>
                                <div className="value">100000</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">No Freeze Enabled</div>
                                <div className="value">False</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Blackholed</div>
                                <div className="value">False</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDetails;
