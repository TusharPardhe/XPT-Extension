import React from 'react';
import { URLS } from '../../constants/common.constants';

import "./underConstruction.scss";

const UnderConstruction = () => {
    return (
        <div className="under_construction">
            <h2 className="header">Under Construction</h2>
            <img
                src={URLS.CONSTRUCTION_GIF}
                className="img"
                alt="construction"
            />
        </div >
    );
}

export default UnderConstruction;