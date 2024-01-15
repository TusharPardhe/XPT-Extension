import './NoResultCard.scss';

import { Image } from 'semantic-ui-react';
import NotFoundImg from '../../assets/png/not_found.png';
import React from 'react';

const NoResultCard = ({ title, img }) => {
    return (
        <div className="no_result_card">
            <Image src={img ?? NotFoundImg} />
            {title && <div className="title">{title}</div>}
        </div>
    );
};

export default NoResultCard;
