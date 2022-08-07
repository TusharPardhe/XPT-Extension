import React from "react";
import dateFormat from "dateformat";
import { Popup } from "semantic-ui-react";

import "./transactionCard.scss";

const TransactionCard = ({ isTouched, setState, copyToClipBoard }) => {
    return (
        <div className={`transaction_card ${isTouched ? "active" : ""}`}>
            <div className="card_header" onClick={() => setState({ isTouched: !isTouched })}>
                <div className="property">
                    <div className="header">Transaction Type:</div>
                    <div className="value">
                        <span>Payment</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Result:</div>
                    <div className="value success">
                        <span>Success</span>
                    </div>
                </div>
            </div>
            <div className="hidden_content">
                <div className="hidden_content_heading">More details</div>
                <div className="property">
                    <div className="header">Destination: </div>
                    <div className="value">
                        <span>rawdadwadwdawdawd</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Date: </div>
                    <div className="value">
                        <span>{dateFormat(new Date(713210731 * 1000))}</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Sequence: </div>
                    <div className="value">
                        <span>{72599592}</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Fee: </div>
                    <div className="value">
                        <span>{12}</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Flags: </div>
                    <div className="value">
                        <span>{2147483648}</span>
                    </div>
                </div>
                <div className="property">
                    <div className="header">Tx Sign: </div>
                    <div
                        className="value"
                        onClick={() =>
                            copyToClipBoard(
                                "3045022100CBD85E0EC18A7EEBFC0D2F912246FBB64DBA9505AB19428480AEA8DA7913BA7002200C437BE391597CCE9368221975922A880A44EAE482DBD4B2484602BCA82AADD1"
                            )
                        }
                    >
                        <Popup
                            content="Click to copy"
                            size="mini"
                            inverted
                            trigger={
                                <span className="copy">
                                    {"3045022100CBD85E0EC18A7EEBFC0D2F912246FBB64DBA9505AB19428480AEA8DA7913BA7002200C437BE391597CCE9368221975922A880A44EAE482DBD4B2484602BCA82AADD1".slice(
                                        0,
                                        15
                                    )}
                                    ...
                                </span>
                            }
                        />
                    </div>
                </div>
                <div className="property">
                    <div className="header">Public Key: </div>
                    <div className="value" onClick={() => copyToClipBoard("03D0F8AD5451AF33C55C20FED9A9C70E887958CA9A224CEB3413FED4FF5280DE3D")}>
                        <Popup
                            content="Click to copy"
                            size="mini"
                            inverted
                            trigger={
                                <span className="copy">
                                    {"03D0F8AD5451AF33C55C20FED9A9C70E887958CA9A224CEB3413FED4FF5280DE3D".slice(0, 15)}
                                    ...
                                </span>
                            }
                        />
                    </div>
                </div>
                <div className="property">
                    <div className="header">Ledger Index: </div>
                    <div className="value">
                        <span>{781212}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
