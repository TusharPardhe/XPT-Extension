import React, { useEffect } from "react";
import queryString from "query-string";

import useBrowserMessageEvents from "../../utils/useBrowserMessageEvents";
import { sendMessageToBgScript } from "../../utils/common.utils";
import { Wallet } from "xrpl";

const parsedParams = queryString.parse(window.location.search);

const Paymment = () => {
    const { transactionId } = parsedParams;
    const messageFromBg = useBrowserMessageEvents();

    if (messageFromBg) {
        const {
            transaction: { txJSON },
        } = messageFromBg;
        if (txJSON) {
            const wallet = Wallet.fromSeed("shvWumUb8UTamNZapyYTxQhJajEAH");
            const signed = wallet.sign(txJSON);
            sendMessageToBgScript({ id: "SIGNED_TRANSACTION", signed, key: "ABCD" });
        }
    }

    useEffect(() => {
        if (transactionId) {
            sendMessageToBgScript({ id: "POPUP_LOADED", transactionId, key: "ABCD" });
        }
    }, []);

    if (!transactionId) {
        return null;
    }

    return (
        <div className="payment_container">
            <div className="payment_header">Transaction Details</div>
        </div>
    );
};

export default Paymment;
