import React from "react";
import { Image } from "semantic-ui-react";

import NotFoundImg from "../../assets/png/not_found.png";

import "./noResultCard.scss";

const NoResultCard = ({ title }) => {
    return (
        <div className="no_result_card">
            <Image src={NotFoundImg} />
            {title && <div className="title">{title}</div>}
        </div>
    );
};

export default NoResultCard;
