import './animatedLoader.scss';

import React, { useEffect } from 'react';

import { Dimmer } from 'semantic-ui-react';

const AnimatedLoader = ({ loadingText, isActive }) => {
    useEffect(() => {
        const element = document.querySelector('.pushable');
        const slider = document.querySelector('.slider');
        const content = document.querySelector('.content');
        if (element) element.style.overflowY = isActive ? 'hidden' : 'auto';
        if (slider) slider.style.display = isActive ? 'none' : 'block';
        if (content) {
            content.style.overflow = isActive ? 'hidden' : content.style.overflow;
            content.style.display = isActive ? 'flex' : content.style.display;
            content.style.alignItems = isActive ? 'center' : content.style.alignItems;
        }
    }, [isActive]);

    return (
        <Dimmer active={isActive} inverted style={{ maxHeight: '800px', backgroundColor: 'var(--sgray)' }}>
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
