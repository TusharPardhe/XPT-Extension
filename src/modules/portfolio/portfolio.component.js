import React from 'react';
import { useParams } from 'react-router-dom';

import "./portfolio.component.scss"

const Portfolio = () => {
    const { id } = useParams();

    console.log(id);
    return (<div className="portfolio_container">{id}</div>);
}

export default Portfolio;