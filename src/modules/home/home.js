import './home.scss';

import React, { useEffect, useState } from 'react';

import { AccountDetails } from './components/AccountDetails';
import AnimatedLoader from '../../components/animatedLoader/animatedLoader';
import { ApiCall } from '../../utils/api.util';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { encryptJSON } from '../../utils/common.utils';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const address = localStorage.getItem('address') || location.state?.address;

    const [accountsData, setAccountsData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (address) {
            setIsLoading(true);
            fetchAccountDetails();
        }
    }, [address]);

    if (!address) {
        return <NoResultCard message="No account found" />;
    }

    async function fetchAccountDetails() {
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
    }

    return (
        <div className="home_component">
            <AnimatedLoader loadingText="Loading..." isActive={isLoading} />
            {Object.entries(accountsData).map(([account, data]) => (
                <AccountDetails {...{ account, data, isLoading, setIsLoading, fetchAccountDetails }} />
            ))}
        </div>
    );
};

export default Home;
