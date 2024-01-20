import './home.scss';

import { Button, Image } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { encryptJSON, numberWithCommas } from '../../utils/common.utils';
import { useLocation, useNavigate } from 'react-router-dom';

import AnimatedLoader from '../../components/animatedLoader/animatedLoader';
import { ApiCall } from '../../utils/api.util';
import { ROUTES } from '../../constants/common.constants';
import SUIT_COIN_IMG from '../../assets/svg/suitcoin.svg';

const Home = () => {
    const location = useLocation();
    const address = localStorage.getItem('address') || location.state?.address;

    const [accountsData, setAccountsData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!address) {
            return;
        }
        setIsLoading(true);
        fetchAccountDetails();
    }, [address]);

    const fetchAccountDetails = async () => {
        try {
            const newAccountsData = {};
            const payload = {
                method: 'GET',
                url: 'user/account/details',
                params: { address },
            };

            const response = await ApiCall(payload);
            localStorage.setItem(
                'approver',
                encryptJSON({ approver: response.data.isApprover }, process.env.ENCRYPTION_KEY)
            );

            if (response.data) {
                newAccountsData[address] = response.data;
            }

            setAccountsData(newAccountsData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home_component">
            <div className="heading">REVO</div>
            <div className="sub_heading">Account Details</div>
            <AnimatedLoader loadingText="Loading..." isActive={isLoading} />
            <div className="user_details_container">
                {Object.entries(accountsData).map(([account, data]) => (
                    <AccountDetails {...{ account, data }} />
                ))}
            </div>
        </div>
    );
};

export default Home;

const AccountDetails = ({ account, data }) => {
    const navigate = useNavigate();

    return (
        <React.Fragment key={account}>
            <div className="account">{account}</div>
            <div className="card suit_coin">
                <Image src={SUIT_COIN_IMG} className="suit_img" alt="SuitCoin" />
                <div className="right_section">
                    <div className="card_value">{numberWithCommas(data.suitCoinBalance)}</div>
                    <div className="card_heading">SuitCoin</div>
                </div>
            </div>
            <div className="card xrp">
                <div className="right_section">
                    <div className="card_value">{numberWithCommas(data.xrpBalance)}</div>
                    <div className="card_heading">XRP</div>
                </div>
            </div>
            <div className="timer_card">
                <div className="timer_heading">Total Outstanding Escrows</div>
                <div className="timer_value">{numberWithCommas(data.totalNumberOfEscrows)}</div>
                {data.isApprover && (
                    <Button basic inverted className="timer_btn" onClick={() => navigate(ROUTES.ADD_ESCROW)}>
                        Add Escrow
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
};
