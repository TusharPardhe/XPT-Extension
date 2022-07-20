import React from "react";
import { Divider, Image } from "semantic-ui-react";

import useMergedState from "../../utils/useMergedState";

import AnimatedLoader from "../../components/animatedLoader/animatedLoader";
import XPTLogoImg from "../../assets/svg/xpt.svg";

import "./xrpDetaills.scss";

const XRPDetails = () => {
    const [state, setState] = useMergedState({
        data: {},
        loading: false,
    });
    const { loading } = state;


    return (
        <div className="fungible_tokens_container">
            <div className="token_header">Fungible T<Image src={XPTLogoImg} className="logo_img" />kens</div>
            <Divider />
            <div className="fungible_tokens_table">
                <div className="fungible_token">
                    <div className="upper_section">
                        <div className="token_img">Img</div>
                    </div>
                    <div className="strip">
                        <div className="properties">
                            <div className="name">
                                ABC
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
            <AnimatedLoader loadingText="Fetching details..." isActive={loading} />
        </div>
    );
};

export default XRPDetails;
