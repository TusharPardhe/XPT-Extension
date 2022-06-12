import React from "react";

import "./simpleAnimationButton.scss";

const SimpleAnimationButton = ({ onClick, firstText, secondText, color, ...otherProps }) => {
    return (
        <div className="simple_animation_component">
            <div className="anim_button" onClick={onClick} {...otherProps}>
                <div className="container">
                    <div className={`btn effect04 ${color}`} data-sm-link-text={secondText}>
                        <span>{firstText}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleAnimationButton;
