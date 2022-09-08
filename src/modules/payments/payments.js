import React, { useEffect, useState } from "react";

import { Image } from "semantic-ui-react";
import { Client } from "xrpl";

import XPTLogoImg from "../../assets/svg/xpt.svg";

import "./payments.scss";

// const chromePort = chrome.runtime.connect({ name: "xptExtension" });

const Payments = () => {
    const [bgMsg, setBgMsg] = useState(null);
    const client = new Client("wss://xrplcluster.com");

    // chromePort.onMessage.addListener(function (msg) {
    //     setBgMsg(msg);
    // });

    useEffect(() => {
        // chromePort.postMessage({ code: "SEND_TRANSACTION_DETAILS" });

        (async function () {
            await client.connect();
            console.log("Client connected");
        })();

        return async () => {
            await client.disconnect();
            console.log("Client disconnected");
        }
    }, []);

    return (
        <div className="payments_container">
            <div className="heading_component">
                <div className="heading">
                    P
                    <Image src={XPTLogoImg} className="logo_img" />
                    YMENTS
                </div>
                <div className="sub_heading">Hold your keys.</div>
            </div>
            <div>{bgMsg && JSON.stringify(bgMsg)}</div>
        </div>
    );
};

export default Payments;


