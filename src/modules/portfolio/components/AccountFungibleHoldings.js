import React from "react";
import RenderFungibleTokenDetails from "./RenderFungibleTokenDetails";
import { Icon } from "semantic-ui-react";
import { PORTFOLIO_HEADER_KEYS } from "../../../constants/portfolio.constants";

export default function AccountFungibleHoldings({ toggleDetails, isOpen, otherCurrencies }) {
    return (
        <div className="other_holdings">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.FUNGIBLE_HOLDINGS)}>
                Fungible Token Holdings <Icon name={`caret ${isOpen.FUNGIBLE_HOLDINGS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.FUNGIBLE_HOLDINGS ? "load" : "hide"}`}>
                <div className="sub_details_header">Total tokens: {otherCurrencies.length}</div>
                {otherCurrencies.map((token, index) => (
                    <RenderFungibleTokenDetails token={token} key={index} />
                ))}
            </div>
        </div>
    );
}
