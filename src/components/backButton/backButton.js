import './backButton.scss';

import React from 'react';

const BackButton = (props) => {
    const { displayName, onClick, ...otherProps } = props;
    return (
        <div className="back_btn">
            <button className="btn" onClick={onClick} {...otherProps}>
                <span className="arrow">&larr;</span>
                <div className="display_name">{displayName}</div>
            </button>
        </div>
    );
};

export default BackButton;
