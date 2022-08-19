import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import dateFormat from "dateformat";
import { Button, Icon } from "semantic-ui-react";

import useMergedState from "../../../../utils/useMergedState";
import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import BackButton from "../../../../components/backButton/backButton";
import { ROUTES } from "../../../../constants/common.constants";
import { ApiCall } from "../../../../utils/api.util";
import { linkify, redirectToUrl, scrollToRef, stringToLocale } from "../../../../utils/common.utils";

import "./dropDetails.scss";

const DropDetails = () => {
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const trustLineRef = useRef(null);
    const [state, setState] = useMergedState({ trustLineImg: "", isBtnLoading: false });
    const { trustLineImg, isBtnLoading } = state;
    const { ticker, projectName, currencyName, description, date, logo, blackholed, noFreeze, maxSupply, issuer, links } = locationState;
    const { website, twitter, discord, linktree, others } = links;


    useEffect(() => {
        if (isBtnLoading) {
            fetchXummTrustlineQr();
        }
    }, [isBtnLoading]);

    const onGoBackClick = () => {
        navigate(ROUTES.AIRDROPS, {
            state: {
                date: locationState.selectedDate,
                activePage: locationState.selectedPage,
            },
        });
    };

    const fetchXummTrustlineQr = () => {
        const payload = {
            method: "POST",
            url: "user/xumm/transaction",
            encrypt: false,
            auth: false,
            data: {
                txJSON: {
                    "TransactionType": "TrustSet",
                    "Flags": 131072,
                    "LimitAmount": {
                        "currency": ticker,
                        "issuer": issuer,
                        "value": maxSupply,
                    },
                },
            },
        };

        ApiCall(payload).then(response => {
            if (response.data) {
                const { refs: { qr_png } } = response.data;
                setState({ trustLineImg: qr_png });
            }
        }).finally(() => {
            scrollToRef(trustLineRef);
            setState({ isBtnLoading: false })
        })
    }

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
                    {trustLineImg.length > 0 ? (
                        <>
                            <div className="trustline_xumm_heading" ref={trustLineRef}>Scan me with XUMM</div>
                            <img className="trustline_xumm" alt="trustline" src={trustLineImg} />
                        </>
                    ) : (
                            <Button className="trustline_btn" basic color="purple" onClick={() => setState({ isBtnLoading: true })} loading={isBtnLoading}>Set Trustline</Button>
                    )}
                    <div className="note">
                        <br></br>
                        <span>Note:</span> XPT is not associated with any token issuers. Participate at your own risk.
                    </div>
                </div>
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
