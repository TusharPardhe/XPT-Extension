import React from "react";
import { Icon } from "semantic-ui-react";
import { PORTFOLIO_HEADER_KEYS } from "../../../constants/portfolio.constants";

export default function OtherDetails({ toggleDetails, isOpen }) {
    return (
        <div className="transactions_link">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.OTHER_DETAILS)}>
                Other Details <Icon name={`caret ${isOpen.OTHER_DETAILS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.OTHER_DETAILS ? "load" : "hide"}`}>
                <div className="sub_details_header">
                    View Recent Transactions <Icon name="caret right" />
                </div>
            </div>
        </div>
    );
}
