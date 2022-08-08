import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, Image } from 'semantic-ui-react';

import BackButton from '../../../../components/backButton/backButton';
import { ISSUER_WEBLINK_TYPE } from '../../../../constants/fungibleTokens.constants';
import { linkify, scrollToRef, stringToLocale } from '../../../../utils/common.utils';

import "./fungibleTokenDetails.scss"

const FungibleTokenDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const topRef = useRef(null);

    useEffect(() => {
        scrollToRef(topRef);
    }, [location.pathname]);

    if (!state) { return null };
    const { name, icon, meta, metrics } = state;
    const { token: { description: tokenDescription }, issuer, issuer: { description: issuerDescription } } = meta;

    return (
        <div className="fungible_token_details_container" ref={topRef}>
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
                            {linkify(tokenDescription)}
                        </p>
                    </div>
                ) : issuerDescription && (
                    <div className="token_description">
                        Issuer Description:<br />
                        <p>
                                {linkify(issuerDescription)}
                        </p>
                    </div>
                )}
                <CurrencyDetails {...metrics} />
                <Divider />
                <IssuerDetails {...issuer} />
            </div>
        </div>
    );
}

export default FungibleTokenDetails;

function CurrencyDetails({ price, trustlines, holders, supply, marketcap, volume_24h }) {

    return (
        <div className="details">
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
    const { followers, domain, kyc, weblinks } = props;
    return (
        <div className="issuer_details">
            <div className='token_details_headers'>Issuer Details</div>
            <div className="details">
                <div className="card">
                    <div className="heading">Followers</div>
                    <div className="value">{stringToLocale(followers, 0)}</div>
                </div>
                <div className="card">
                    <div className="heading">KYC</div>
                    <div className="value">{kyc ? "Yes" : "No"}</div>
                </div>
                <div className="card">
                    <div className="heading">Domain</div>
                    <div className="value">{domain ? linkify(domain) : "-"}</div>
                </div>
                {weblinks?.length > 0 && weblinks.map(({ type, url }, index) => (
                    <div className="card" key={`${index}_${type}`}>
                        <div className="heading">{ISSUER_WEBLINK_TYPE[type]}</div>
                        <div className="value">{linkify(url)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
