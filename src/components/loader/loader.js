import React from "react";

import "./loader.scss";

const Loader = ({ loadingText }) => {
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

export default Loader;
