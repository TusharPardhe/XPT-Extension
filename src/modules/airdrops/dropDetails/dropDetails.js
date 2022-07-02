import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import "./dropDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="drop_details_container">
            <div className="cards-container">
                <div className="card">
                    <div className="header">
                        <Icon name="arrow left" onClick={() => navigate(-1)} className="back_link" />
                        <div className="avatar">
                            <img className="drop_logo" src="https://randomuser.me/api/portraits/men/3.jpg" alt="Jhon Doe" />
                        </div>
                    </div>
                    <div className="drop_name">ABC Coin</div>
                    <div className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.</div>
                    <div className="trustline">
                        <div className="heading">Trustline:</div>
                        <img className="trustline_xumm" alt="trustline" src="https://randomuser.me/api/portraits/men/3.jpg" />
                    </div>
                    <div className="coin_info">
                        <div className="info_cards_container">
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
                    <div className="footer_links">
                        <a href=" ">
                            <i className="fa fa-facebook">W</i>
                        </a>
                        <a href=" ">
                            <i className="fa fa-linkedin">T</i>
                        </a>
                        <a href=" ">
                            <i className="fa fa-twitter">D</i>
                        </a>
                        <a href=" ">
                            <i className="fa fa-instagram">X</i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDetails;
