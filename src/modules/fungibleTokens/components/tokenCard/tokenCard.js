import React from "react";
import { Image } from "semantic-ui-react";

import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import { getTokenName } from "../../../../utils/common.utils";
import { ROUTES } from "../../../../constants/common.constants";

import "./tokenCard.scss";

const TokenCard = (props) => {
    if (!props) {
        return null;
    };

    const { navigate, ...details } = props;
    const { currency, meta: { token: { icon: tokenIcon }, issuer: { icon: issuerIcon } } } = details;
    const icon = tokenIcon || issuerIcon;
    const tokenName = getTokenName(currency);
    const imgSrc = icon ?? XPTLogoImg;

    const onTokenClick = () => {
        navigate(ROUTES.FUNGIBLE_TOKEN_DETAILS, {
            state: { ...details, icon: imgSrc, name: tokenName }
        });
    };

    return (
        <div className="fungible_token" onClick={onTokenClick}>
            <div className="upper_section">
                <div className="token_img"><Image src={imgSrc} alt="icon" /></div>
            </div>
            <div className="strip">
                <div className="properties">
                    <div className="name">
                        {tokenName}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default TokenCard;
