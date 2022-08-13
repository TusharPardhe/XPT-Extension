import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Icon } from "semantic-ui-react";
import dateFormat from "dateformat";

import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import BackButton from "../../../../components/backButton/backButton";
import { ROUTES } from "../../../../constants/common.constants";
import { linkify, redirectToUrl, stringToLocale } from "../../../../utils/common.utils";

import "./dropDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { projectName, currencyName, description, date, logo, blackholed, noFreeze, maxSupply, issuer, links } = state;
    const { website, twitter, discord, linktree, others } = links;

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
                    <div className="drop_name">{currencyName ?? "-"}</div>
                </div>
                <Divider />
                <div className="description">
                    {linkify(description)}
                    <br />
                    <div className="links">
                        {twitter && <Icon name="twitter" onClick={() => redirectToUrl(twitter)} />}
                        {discord && <Icon name="discord" onClick={() => redirectToUrl(discord)} />}
                        {website && <Icon name="world" onClick={() => redirectToUrl(website)} />}
                        {linktree && <Icon name="linkify" onClick={() => redirectToUrl(linktree)} />}
                        {others && <Icon name="asterisk" onClick={() => redirectToUrl(others)} />}
                    </div>
                </div>
                <div className="trustline">
                    <img className="trustline_xumm" alt="trustline" src="https://randomuser.me/api/portraits/men/3.jpg" />
                    <div className="heading">Scan me with XUMM</div>
                </div>
                <div className="note">
                    <br></br>
                    <span>Note:</span> XPT is not associated with any token issuers. Participate at your own risk.
                </div>
                <Divider />
                <div className="coin_info">
                    <div className="info_cards_container">
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Airdrop Date</div>
                                <div className="value">{date ? dateFormat(date * 1000, "dd mmm yyyy hh:mm TT") : "-"}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Project Name</div>
                                <div className="value">{projectName ?? "-"}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Total Supply</div>
                                <div className="value">{stringToLocale(maxSupply) ?? "-"}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Issuer</div>
                                <div className="value">{issuer ?? "-"}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">No Freeze Enabled</div>
                                <div className="value">{noFreeze ? "Enabled" : "Disabled"}</div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Blackholed</div>
                                <div className="value">{blackholed ? "Enabled" : "Disabled"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDetails;
