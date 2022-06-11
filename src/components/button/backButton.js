import React from "react";

const BackButton = (props) => {
    const { displayName, onClick, ...otherProps } = props;
    return (
        <div className="back_btn">
            <button className="btn" onClick={onClick} {...otherProps}>
                {displayName}
            </button>
        </div>
    );
};

export default BackButton;
