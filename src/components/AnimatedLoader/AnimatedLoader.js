import React from "react";

import "./AnimatedLoader.scss";

const AnimatedLoader = ({ loadingText }) => {
    return (
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
    );
};

export default AnimatedLoader;
