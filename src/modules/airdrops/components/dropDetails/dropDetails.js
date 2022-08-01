import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Icon } from "semantic-ui-react";
import BackButton from "../../../../components/backButton/backButton";

import "./dropDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { projectName, currencyName, description } = state;

    return (
        <div className="drop_details_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <div className="details_box">
                <div className="heading">
                    <div className="img_container">
                        <img className="logo" src="https://randomuser.me/api/portraits/men/3.jpg" alt="Jhon Doe" />
                    </div>
                    <div className="drop_name">{currencyName}</div>
                </div>
                <Divider />
                <div className="description">
                    {"Add linkify"}
                    Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The
                    writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to
                    complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon
                    it. A second option is to use the random paragraph somewhere in a short story they create.{" "}
                </div>
                <div className="trustline">
                    <img className="trustline_xumm" alt="trustline" src="https://randomuser.me/api/portraits/men/3.jpg" />
                    <div className="heading">Scan me with XUMM</div>
                </div>
                <Divider />
                <div className="coin_info">
                    <div className="info_cards_container">
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
