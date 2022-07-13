import React from "react";
import { Button, Icon } from "semantic-ui-react";

import FungibleHoldings from "../fungibleHoldings/fungibleHoldings";
import { PORTFOLIO_HEADER_KEYS } from "../../../../constants/portfolio.constants";
import { URLS } from "../../../../constants/common.constants";

const AccountTrustlines = ({ id, toggleDetails, isOpen, otherCurrencies }) => {
    if (otherCurrencies.length === 0) { return null; };

    const onXrpscanBtnClick = () => {
        window.open(`${URLS.XRPSCAN}account/${id}`, "_blank");
    };

    return (
        <div className="other_holdings">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.FUNGIBLE_HOLDINGS)}>
                Trustline(s) <Icon name={`caret ${isOpen.FUNGIBLE_HOLDINGS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.FUNGIBLE_HOLDINGS ? "load" : "hide"}`}>
                {otherCurrencies.slice(0, 20).map((token, index) => (
                    <FungibleHoldings token={token} key={index} />
                ))}
                {otherCurrencies.length > 20 && (
                    <div className="links">
                        <Button onClick={onXrpscanBtnClick}>View more on xrpscan</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountTrustlines;
