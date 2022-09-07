import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { Icon } from "semantic-ui-react";

import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import BackButton from "../../../../components/backButton/backButton";
import { ROUTES } from "../../../../constants/common.constants";
import { linkify, redirectToUrl } from "../../../../utils/common.utils";

import "./nftDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const { issuer, nftName, description, date, logo, burnable, links, transferable } = locationState;
    const { website, twitter, discord, linktree, others } = links;

    const onGoBackClick = () => {
        navigate(ROUTES.MINT_CALENDAR, {
            state: {
                date: locationState.selectedDate,
                activePage: locationState.selectedPage,
            },
        });
    };

    return (
        <div className="nft_details_container">
            <BackButton onClick={onGoBackClick} displayName="Go Back" />
            <div className="details_box">
                <div className="heading">
                    <div className="img_container">
                        <img src={logo ?? XPTLogoImg} alt="img" />
                    </div>
                    <div className="drop_name">{nftName ?? "-"}</div>
                </div>
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
                <div className="coin_info">
                    <div className="info_cards_container">
                        {date && (
                            <div className="box">
                                <div className="details">
                                    <div className="info_heading">Mint Date</div>
                                    <div className="value">{date ? dateFormat(date * 1000, "dd mmm yyyy hh:mm TT") : "-"}</div>
                                </div>
                            </div>
                        )}
                        {issuer && (
                            <div className="box">
                                <div className="details">
                                    <div className="info_heading">Issuer</div>
                                    <div className="value">{issuer ?? "-"}</div>
                                </div>
                            </div>
                        )}
                        {burnable && (
                            <div className="box">
                                <div className="details">
                                    <div className="info_heading">Burnable by issuer</div>
                                    <div className="value">{burnable}</div>
                                </div>
                            </div>
                        )}
                        <div className="box">
                            <div className="details">
                                <div className="info_heading">Transferable</div>
                                <div className="value">{transferable ?? "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDetails;
