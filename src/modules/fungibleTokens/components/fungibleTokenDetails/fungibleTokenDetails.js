import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, Image, Table } from 'semantic-ui-react';
import BackButton from '../../../../components/backButton/backButton';

import "./fungibleTokenDetails.scss"

const FungibleTokenDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    if (!state) { return null };

    const { name, icon, meta, metrics } = state;
    const { token: { description: tokenDescription }, issuer: { issuerDescription } } = meta;
    const { trustlines, holders, supply, marketcap, price, volume_24h, volume_7d } = metrics;
    const description = tokenDescription || issuerDescription;

    const parseString = (value) => parseFloat(value).toLocaleString();

    return (
        <div className="fungible_token_details_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <div className="token_details_container">
                <div className="token_header">
                    <div className="icon">
                        <Image src={icon} alt={name} />
                    </div>
                    <div className="token_name">{name}</div>
                </div>
                <Divider />
                {description && (
                    <div className="token_description">
                        <p>
                            {description}
                        </p>
                    </div>
                )}
                <div className="token_details">
                    <div className="card">
                        <div className="heading">Market Price</div>
                        <div className="value">{parseString(price)} XRP</div>
                    </div>
                    <div className="card">
                        <div className="heading">Trustlines</div>
                        <div className="value">{parseString(trustlines)}</div>
                    </div>
                    <div className="card">
                        <div className="heading">Holders</div>
                        <div className="value">{parseString(holders)}</div>
                    </div>
                    <div className="card">
                        <div className="heading">Supply</div>
                        <div className="value">{parseString(supply)}</div>
                    </div>
                    <div className="card">
                        <div className="heading">Market Cap</div>
                        <div className="value">{parseString(marketcap)}</div>
                    </div>
                    <div className="card">
                        <div className="heading">24 Hour Volume</div>
                        <div className="value">{parseString(volume_24h)} XRP</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FungibleTokenDetails;