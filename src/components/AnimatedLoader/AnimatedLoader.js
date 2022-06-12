import React, { useEffect } from "react";
import { Dimmer } from "semantic-ui-react";

import "./AnimatedLoader.scss";

const AnimatedLoader = ({ loadingText, isActive }) => {
    useEffect(() => {
        const element = document.querySelector(".pushable");
        element.style.overflowY = isActive ? "hidden" : "auto";
    }, [isActive]);

    return (
        <Dimmer active={isActive} inverted style={{ maxHeight: "500px" }}>
            <div className="loader_component">
                <div className="loading_icons">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="text">{loadingText}</div>
            </div>
        </Dimmer>
    );
};

export default AnimatedLoader;
