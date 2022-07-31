import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, Image } from 'semantic-ui-react';
import parse from 'html-react-parser';

import BackButton from '../../../../components/backButton/backButton';
import { linkify, stringToLocale } from '../../../../utils/common.utils';

import "./fungibleTokenDetails.scss"

const FungibleTokenDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    if (!state) { return null };

    const { name, icon, meta, metrics, issuer } = state;
    const { token: { description: tokenDescription }, issuer: { description: issuerDescription } } = meta;

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
                {tokenDescription ? (
                    <div className="token_description">
                        <p>
                            {parse(linkify(tokenDescription))}
                        </p>
                    </div>
                ) : issuerDescription && (
                    <div className="token_description">
                        Issuer Description:<br />
                        <p>
                            {parse(linkify(issuerDescription))}
                        </p>
                    </div>
                )}
                <CurrencyDetails {...metrics} />
                <IssuerDetails {...issuer} />
            </div>
        </div>
    );
}

export default FungibleTokenDetails;

function CurrencyDetails({ price, trustlines, holders, supply, marketcap, volume_24h }) {

    return (
        <div className="token_details">
            <div className="card">
                <div className="heading">Market Price</div>
                <div className="value">{stringToLocale(price, 6)} XRP</div>
            </div>
            <div className="card">
                <div className="heading">Trustlines</div>
                <div className="value">{stringToLocale(trustlines, 0)}</div>
            </div>
            <div className="card">
                <div className="heading">Holders</div>
                <div className="value">{stringToLocale(holders, 0)}</div>
            </div>
            <div className="card">
                <div className="heading">Supply</div>
                <div className="value">{stringToLocale(supply, 0)}</div>
            </div>
            <div className="card">
                <div className="heading">Market Cap</div>
                <div className="value">{stringToLocale(marketcap, 0)}</div>
            </div>
            <div className="card">
                <div className="heading">24 Hour Volume</div>
                <div className="value">{stringToLocale(volume_24h)} XRP</div>
            </div>
        </div>
    );
}

function IssuerDetails(props) {

    return (
        <div className="issuer_details">
            <div className='token_details_headers'>Issuer Details</div>
        </div>
    )
}
